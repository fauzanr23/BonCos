const request = require("supertest");
const app = require("../app");
const { signToken, verifyToken } = require("../helpers/jwt");
const { User, Cuisine, Category } = require("../models");

let staffToken;
let adminToken;

beforeAll(async () => {
    const newUserAdmin = {
        username: "admin-test",
        email: "admin-test@email.com",
        password: "admin123",
        role: "Admin",
        phoneNumber: "08764246864",
        address: "Jalan test"
    };
    const userAdmin = await User.create(newUserAdmin);
    adminToken = signToken({
        id: userAdmin.id,
        username: userAdmin.username,
        email: userAdmin.email,
        role: userAdmin.role,
    });
    const newUserStaff = {
        username: "staff-test",
        email: "staff-test@gmail.com",
        password: "staff123",
        phoneNumber: "08754628312",
        address: "Jalan test"
    };
    const userStaff = await User.create(newUserStaff);
    staffToken = signToken({
        id: userStaff.id,
        username: userStaff.username,
        email: userStaff.email,
        role: userStaff.role,
    });
    //seeding data

    await Category.bulkCreate([
        {
            "name": "Drinks",
        },
        {
            "name": "Snacks",
        },
    ])

    await Cuisine.bulkCreate([
        {
            "name": "Kopi Hitam",
            "description": "Kopi hitam pekat dengan aroma khas",
            "price": 8000,
            "imgUrl": "https://i.imgur.com/2.jpg",
            "CategoryId": 1,
            "AuthorId": 1,
        },
        {
            "name": "Kentang Goreng",
            "description": "Kentang goreng renyah dengan saus sambal",
            "price": 12000,
            "imgUrl": "https://i.imgur.com/3.jpg",
            "CategoryId": 2,
            "AuthorId": 2,
        },
    ])

});

afterAll(async () => {
    await Cuisine.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });
    await Category.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    });
});

//Create test

describe("POST /cuisines", () => {
    //Test Create (POST)
    test("POST /cuisines: positive test case - should return status 201 and inputted data", async () => {
        const newBody = {
            "name": "Roti Bakar Coklat",
            "description": "Roti bakar dengan isian coklat lumer",
            "price": 10000,
            "imgUrl": "https://i.imgur.com/4.jpg",
            "CategoryId": 2,
        }
        const response = await request(app)
            .post("/cuisines")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        //typeof
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("name", expect.any(String))
        expect(response.body).toHaveProperty("description", expect.any(String))
        expect(response.body).toHaveProperty("price", expect.any(Number))
        expect(response.body).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body).toHaveProperty("CategoryId", expect.any(Number))
        expect(response.body).toHaveProperty("AuthorId", expect.any(Number))
        expect(response.body).toHaveProperty(
            "updatedAt",
            expect.stringContaining(response.body.updatedAt),
        );
        expect(response.body).toHaveProperty(
            "createdAt",
            expect.stringContaining(response.body.createdAt),
        );
        //isi
        expect(response.body).toHaveProperty("name", newBody.name)
        expect(response.body).toHaveProperty("description", newBody.description)
        expect(response.body).toHaveProperty("price", newBody.price)
        expect(response.body).toHaveProperty("imgUrl", newBody.imgUrl)
        expect(response.body).toHaveProperty("CategoryId", newBody.CategoryId)
        expect(response.body).toHaveProperty("AuthorId", verifyToken(adminToken).id)
    })
    test("POST /cuisines: negative test case (did not login) - Invalid Token", async () => {
        const newBody = {
            "name": "Roti Bakar Coklat",
            "description": "Roti bakar dengan isian coklat lumer",
            "price": 10000,
            "imgUrl": "https://i.imgur.com/4.jpg",
            "CategoryId": 2,
        }
        const response = await request(app)
            .post("/cuisines")
            .send(newBody)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("POST /cuisines: negative test case (wrong token) - Invalid Token", async () => {
        const newBody = {
            "name": "Roti Bakar Coklat",
            "description": "Roti bakar dengan isian coklat lumer",
            "price": 10000,
            "imgUrl": "https://i.imgur.com/4.jpg",
            "CategoryId": 2,
        }
        const response = await request(app)
            .post("/cuisines")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}asdk`);

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("POST /cuisines: negative test case (invalid input) - Name required!", async () => {
        const newBody = {
            "name": "",
            "description": "Roti bakar dengan isian coklat lumer",
            "price": 10000,
            "imgUrl": "https://i.imgur.com/4.jpg",
            "CategoryId": 2,
        }
        const response = await request(app)
            .post("/cuisines")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Name required!")
    })
    test("POST /cuisines: negative test case (invalid input) - Description required!", async () => {
        const newBody = {
            "name": "Roti Bakar Coklat",
            "description": "",
            "price": 10000,
            "imgUrl": "https://i.imgur.com/4.jpg",
            "CategoryId": 2,
        }
        const response = await request(app)
            .post("/cuisines")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Description required!")
    })
    test("POST /cuisines: negative test case (invalid input) - Minimum price must be 5000!", async () => {
        const newBody = {
            "name": "Roti Bakar Coklat",
            "description": "Roti bakar dengan isian coklat lumer",
            "price": 1000,
            "imgUrl": "https://i.imgur.com/4.jpg",
            "CategoryId": 2,
        }
        const response = await request(app)
            .post("/cuisines")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Minimum price must be 5000!")
    })
    test("POST /cuisines: negative test case (invalid input) - Price required!", async () => {
        const newBody = {
            "name": "Roti Bakar Coklat",
            "description": "Roti bakar dengan isian coklat lumer",
            "price": null,
            "imgUrl": "https://i.imgur.com/4.jpg",
            "CategoryId": 2,
        }
        const response = await request(app)
            .post("/cuisines")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Price required!")
    })
    test("POST /cuisines: negative test case (invalid input) - Image required!", async () => {
        const newBody = {
            "name": "Roti Bakar Coklat",
            "description": "Roti bakar dengan isian coklat lumer",
            "price": 10000,
            "imgUrl": "",
            "CategoryId": 2,
        }
        const response = await request(app)
            .post("/cuisines")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Image required!")
    })
    test("POST /cuisines: negative test case (invalid input) - URL needed!", async () => {
        const newBody = {
            "name": "Roti Bakar Coklat",
            "description": "Roti bakar dengan isian coklat lumer",
            "price": 10000,
            "imgUrl": "abc",
            "CategoryId": 2,
        }
        const response = await request(app)
            .post("/cuisines")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "URL needed!")
    })
    test("POST /cuisines: negative test case (invalid input) - Category id required!", async () => {
        const newBody = {
            "name": "Roti Bakar Coklat",
            "description": "Roti bakar dengan isian coklat lumer",
            "price": 10000,
            "imgUrl": "https://i.imgur.com/4.jpg",
            "CategoryId": null,
        }
        const response = await request(app)
            .post("/cuisines")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Category id required!")
    })
})


//PUT
describe("PUT /cuisines/:id:", () => {
    test("PUT /cuisines/id: positive test case - should return status 200 and inputted data", async () => {
        const newBody = {
            "name": "Roti Bakar Susu",
            "description": "Roti bakar dengan isian susu lumer",
            "price": 12000,
            "imgUrl": "https://i.imgur.com/5.jpg",
            "CategoryId": 1,
        }
        const response = await request(app)
            .put("/cuisines/1")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        //typeof
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("name", expect.any(String))
        expect(response.body).toHaveProperty("description", expect.any(String))
        expect(response.body).toHaveProperty("price", expect.any(Number))
        expect(response.body).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body).toHaveProperty("CategoryId", expect.any(Number))
        expect(response.body).toHaveProperty("AuthorId", expect.any(Number))
        expect(response.body).toHaveProperty(
            "updatedAt",
            expect.stringContaining(response.body.updatedAt),
        );
        expect(response.body).toHaveProperty(
            "createdAt",
            expect.stringContaining(response.body.createdAt),
        );
        //isi
        expect(response.body).toHaveProperty("name", newBody.name)
        expect(response.body).toHaveProperty("description", newBody.description)
        expect(response.body).toHaveProperty("price", newBody.price)
        expect(response.body).toHaveProperty("imgUrl", newBody.imgUrl)
        expect(response.body).toHaveProperty("CategoryId", newBody.CategoryId)
        expect(response.body).toHaveProperty("AuthorId", 1)
    })
    test("PUT /cuisines/:id: negative test case (did not login) - Invalid Token", async () => {
        const newBody = {
            "name": "Roti Bakar Susu",
            "description": "Roti bakar dengan isian susu lumer",
            "price": 12000,
            "imgUrl": "https://i.imgur.com/5.jpg",
            "CategoryId": 1,
        }
        const response = await request(app)
            .put("/cuisines/1")
            .send(newBody)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", response.body.message)
    })
    test("PUT /cuisines/:id: negative test case (wrong input) - Invalid Token", async () => {
        const newBody = {
            "name": "Roti Bakar Susu",
            "description": "Roti bakar dengan isian susu lumer",
            "price": 12000,
            "imgUrl": "https://i.imgur.com/5.jpg",
            "CategoryId": 1,
        }
        const response = await request(app)
            .put("/cuisines/1")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}asd`);

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", response.body.message)
    })
    test("PUT /cuisines/:id: negative test case (invalid input) - Cuisine Not Found", async () => {
        const newBody = {
            "name": "Roti Bakar Susu",
            "description": "Roti bakar dengan isian susu lumer",
            "price": 12000,
            "imgUrl": "https://i.imgur.com/5.jpg",
            "CategoryId": 1,
        }
        const response = await request(app)
            .put("/cuisines/10")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", response.body.message)
    })
    test("PUT /cuisines/:id: negative test case (invalid input) - You're not authorized", async () => {
        const newBody = {
            "name": "Roti Bakar Susu",
            "description": "Roti bakar dengan isian susu lumer",
            "price": 12000,
            "imgUrl": "https://i.imgur.com/5.jpg",
            "CategoryId": 1,
        }
        const response = await request(app)
            .put("/cuisines/1")
            .send(newBody)
            .set("Authorization", `Bearer ${staffToken}`);

        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", response.body.message)
    })
    test("PUT /cuisines/:id: negative test case (invalid input) - Name required!", async () => {
        const newBody = {
            "name": "",
            "description": "Roti bakar dengan isian susu lumer",
            "price": 12000,
            "imgUrl": "https://i.imgur.com/5.jpg",
            "CategoryId": 1,
        }
        const response = await request(app)
            .put("/cuisines/1")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Name required!")
    })
    test("PUT /cuisines/:id: negative test case (invalid input) - Description required!", async () => {
        const newBody = {
            "name": "Roti Bakar Susu",
            "description": "",
            "price": 12000,
            "imgUrl": "https://i.imgur.com/5.jpg",
            "CategoryId": 1,
        }
        const response = await request(app)
            .put("/cuisines/1")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Description required!")
    })
    test("PUT /cuisines/:id: negative test case (invalid input) - Minimum price must be 5000!", async () => {
        const newBody = {
            "name": "Roti Bakar Susu",
            "description": "Roti bakar dengan isian susu lumer",
            "price": 1000,
            "imgUrl": "https://i.imgur.com/5.jpg",
            "CategoryId": 1,
        }
        const response = await request(app)
            .put("/cuisines/1")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Minimum price must be 5000!")
    })
    test("PUT /cuisines/:id: negative test case (invalid input) - Price required!", async () => {
        const newBody = {
            "name": "Roti Bakar Susu",
            "description": "Roti bakar dengan isian susu lumer",
            "price": null,
            "imgUrl": "https://i.imgur.com/4.jpg",
            "CategoryId": 2,
        }
        const response = await request(app)
            .put("/cuisines/1")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Price required!")
    })
    test("PUT /cuisines/:id: negative test case (invalid input) - Image required!", async () => {
        const newBody = {
            "name": "Roti Bakar Susu",
            "description": "Roti bakar dengan isian Susu lumer",
            "price": 12000,
            "imgUrl": "",
            "CategoryId": 1,
        }
        const response = await request(app)
            .put("/cuisines/1")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Image required!")
    })
    test("PUT /cuisines/:id: negative test case (invalid input) - URL needed!", async () => {
        const newBody = {
            "name": "Roti Bakar Susu",
            "description": "Roti bakar dengan isian Susu lumer",
            "price": 12000,
            "imgUrl": "abc",
            "CategoryId": 1,
        }
        const response = await request(app)
            .put("/cuisines/1")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "URL needed!")
    })
    test("PUT /cuisines/:id: negative test case (invalid input) - Category id required!", async () => {
        const newBody = {
            "name": "Roti Bakar Susu",
            "description": "Roti bakar dengan isian Susu lumer",
            "price": 12000,
            "imgUrl": "https://i.imgur.com/5.jpg",
            "CategoryId": null,
        }
        const response = await request(app)
            .put("/cuisines/1")
            .send(newBody)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Category id required!")
    })
})

describe("DELETE /cuisines/:id", () => {
    test("DELETE /cuisines/:id: positive test case - Should return message {Cuisine name} success to delete", async () => {
        const response = await request(app)
            .delete("/cuisines/2")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", response.body.message)
    })
    test("DELETE /cuisines/:id: negative test case (did not login) - Invalid Token", async () => {
        const response = await request(app)
            .delete("/cuisines/2")

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("DELETE /cuisines/:id: negative test case (wrong input) - Invalid Token", async () => {
        const response = await request(app)
            .delete("/cuisines/2")
            .set("Authorization", `Bearer ${adminToken}asd`);

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
    test("DELETE /cuisines/:id: negative test case (data not found) - Cuisine Not Found", async () => {
        const response = await request(app)
            .delete("/cuisines/10")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", response.body.message)
    })
    test("DELETE /cuisines/:id: negative test case (Author id !== Login id) - You're not Authorized", async () => {
        const response = await request(app)
            .delete("/cuisines/1")
            .set("Authorization", `Bearer ${staffToken}`);

        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", response.body.message)
    })
})