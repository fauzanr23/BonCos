const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
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

describe("GET /pub/cuisines", () => {
    test("GET /pub/cuisines: positive test case - should return all cuisines successfully", async () => {
        const response = await request(app).get("/pub/cuisines")
        const cuisines = response.body.data
        const cuisine = cuisines[0]

        //cek tipe data
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(cuisines).toBeInstanceOf(Array)
        expect(cuisines).toHaveLength(10)
        expect(cuisine).toBeInstanceOf(Object)

        //cek isi response body
        expect(response.body).toHaveProperty("page", expect.any(Number));
        expect(response.body).toHaveProperty("totalData", expect.any(Number));
        expect(response.body).toHaveProperty("totalPage", expect.any(Number));
        expect(response.body).toHaveProperty("dataPerPage", expect.any(Number));

        // cek isi data cuisine
        expect(cuisine).toHaveProperty("id", expect.any(Number))
        expect(cuisine).toHaveProperty("name", expect.any(String))
        expect(cuisine).toHaveProperty("description", expect.any(String))
        expect(cuisine).toHaveProperty("price", expect.any(Number))
        expect(cuisine).toHaveProperty("imgUrl", expect.any(String))
        expect(cuisine).toHaveProperty("CategoryId", expect.any(Number))
        expect(cuisine).toHaveProperty(
            "updatedAt",
            expect.stringContaining(cuisine.updatedAt),
        );
        expect(cuisine).toHaveProperty(
            "createdAt",
            expect.stringContaining(cuisine.createdAt),
        );
        expect(cuisine).toHaveProperty("name", cuisine.name)
        expect(cuisine).toHaveProperty("description", cuisine.description)
        expect(cuisine).toHaveProperty("price", cuisine.price)
        expect(cuisine).toHaveProperty("imgUrl", cuisine.imgUrl)
        expect(cuisine).toHaveProperty("CategoryId", cuisine.CategoryId)
    })
    test("GET /pub/cuisines positive test case - should get cuisine with given query filter (filter by name)", async () => {
        const response = await request(app)
            .get("/pub/cuisines")
            .query(filterName = "Roti") //filter
        const cuisines = response.body.data
        const cuisine = cuisines[0]

        //cek tipe data
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(cuisines).toBeInstanceOf(Array)
        expect(cuisines).toHaveLength(10)
        expect(cuisine).toBeInstanceOf(Object)

        //cek isi response body
        expect(response.body).toHaveProperty("page", expect.any(Number));
        expect(response.body).toHaveProperty("totalData", expect.any(Number));
        expect(response.body).toHaveProperty("totalPage", expect.any(Number));
        expect(response.body).toHaveProperty("dataPerPage", expect.any(Number));

        // cek isi data cuisine
        expect(cuisine).toHaveProperty("id", expect.any(Number))
        expect(cuisine).toHaveProperty("name", expect.any(String))
        expect(cuisine).toHaveProperty("description", expect.any(String))
        expect(cuisine).toHaveProperty("price", expect.any(Number))
        expect(cuisine).toHaveProperty("imgUrl", expect.any(String))
        expect(cuisine).toHaveProperty("CategoryId", expect.any(Number))
        expect(cuisine).toHaveProperty(
            "updatedAt",
            expect.stringContaining(cuisine.updatedAt),
        );
        expect(cuisine).toHaveProperty(
            "createdAt",
            expect.stringContaining(cuisine.createdAt),
        );
        expect(cuisine).toHaveProperty("name", cuisine.name)
        expect(cuisine).toHaveProperty("description", cuisine.description)
        expect(cuisine).toHaveProperty("price", cuisine.price)
        expect(cuisine).toHaveProperty("imgUrl", cuisine.imgUrl)
        expect(cuisine).toHaveProperty("CategoryId", cuisine.CategoryId)
    })
    test("GET /pub/cuisines positive test case - should get cuisine with given query filter (filter by category id)", async () => {
        const response = await request(app)
            .get("/pub/cuisines")
            .query(catId = 2) //filter
        const cuisines = response.body.data
        const cuisine = cuisines[0]

        //cek tipe data
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(cuisines).toBeInstanceOf(Array)
        expect(cuisines).toHaveLength(10)
        expect(cuisine).toBeInstanceOf(Object)

        //cek isi response body
        expect(response.body).toHaveProperty("page", expect.any(Number));
        expect(response.body).toHaveProperty("totalData", expect.any(Number));
        expect(response.body).toHaveProperty("totalPage", expect.any(Number));
        expect(response.body).toHaveProperty("dataPerPage", expect.any(Number));

        // cek isi data cuisine
        expect(cuisine).toHaveProperty("id", expect.any(Number))
        expect(cuisine).toHaveProperty("name", expect.any(String))
        expect(cuisine).toHaveProperty("description", expect.any(String))
        expect(cuisine).toHaveProperty("price", expect.any(Number))
        expect(cuisine).toHaveProperty("imgUrl", expect.any(String))
        expect(cuisine).toHaveProperty("CategoryId", expect.any(Number))
        expect(cuisine).toHaveProperty(
            "updatedAt",
            expect.stringContaining(cuisine.updatedAt),
        );
        expect(cuisine).toHaveProperty(
            "createdAt",
            expect.stringContaining(cuisine.createdAt),
        );
        expect(cuisine).toHaveProperty("name", cuisine.name)
        expect(cuisine).toHaveProperty("description", cuisine.description)
        expect(cuisine).toHaveProperty("price", cuisine.price)
        expect(cuisine).toHaveProperty("imgUrl", cuisine.imgUrl)
        expect(cuisine).toHaveProperty("CategoryId", cuisine.CategoryId)
    })
    test("GET /pub/cuisines positive test case - should get cuisine with given query filter (sort descending by createdAt)", async () => {
        const response = await request(app)
            .get("/pub/cuisines")
            .query(sort = -"createdAt") //filter
        const cuisines = response.body.data
        const cuisine = cuisines[0]

        //cek tipe data
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(cuisines).toBeInstanceOf(Array)
        expect(cuisines).toHaveLength(10)
        expect(cuisine).toBeInstanceOf(Object)

        //cek isi response body
        expect(response.body).toHaveProperty("page", expect.any(Number));
        expect(response.body).toHaveProperty("totalData", expect.any(Number));
        expect(response.body).toHaveProperty("totalPage", expect.any(Number));
        expect(response.body).toHaveProperty("dataPerPage", expect.any(Number));

        // cek isi data cuisine
        expect(cuisine).toHaveProperty("id", expect.any(Number))
        expect(cuisine).toHaveProperty("name", expect.any(String))
        expect(cuisine).toHaveProperty("description", expect.any(String))
        expect(cuisine).toHaveProperty("price", expect.any(Number))
        expect(cuisine).toHaveProperty("imgUrl", expect.any(String))
        expect(cuisine).toHaveProperty("CategoryId", expect.any(Number))
        expect(cuisine).toHaveProperty(
            "updatedAt",
            expect.stringContaining(cuisine.updatedAt),
        );
        expect(cuisine).toHaveProperty(
            "createdAt",
            expect.stringContaining(cuisine.createdAt),
        );
        expect(cuisine).toHaveProperty("name", cuisine.name)
        expect(cuisine).toHaveProperty("description", cuisine.description)
        expect(cuisine).toHaveProperty("price", cuisine.price)
        expect(cuisine).toHaveProperty("imgUrl", cuisine.imgUrl)
        expect(cuisine).toHaveProperty("CategoryId", cuisine.CategoryId)
    })
    test("GET /pub/cuisines positive test case - should get cuisine with given query page === 2", async () => {
        const response = await request(app)
            .get("/pub/cuisines")
            .query(page = 2) //filter
        const cuisines = response.body.data
        const cuisine = cuisines[0]

        //cek tipe data
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(cuisines).toBeInstanceOf(Array)
        expect(cuisines).toHaveLength(10)
        expect(cuisine).toBeInstanceOf(Object)

        //cek isi response body
        expect(response.body).toHaveProperty("page", expect.any(Number));
        expect(response.body).toHaveProperty("totalData", expect.any(Number));
        expect(response.body).toHaveProperty("totalPage", expect.any(Number));
        expect(response.body).toHaveProperty("dataPerPage", expect.any(Number));

        // cek isi data cuisine
        expect(cuisine).toHaveProperty("id", expect.any(Number))
        expect(cuisine).toHaveProperty("name", expect.any(String))
        expect(cuisine).toHaveProperty("description", expect.any(String))
        expect(cuisine).toHaveProperty("price", expect.any(Number))
        expect(cuisine).toHaveProperty("imgUrl", expect.any(String))
        expect(cuisine).toHaveProperty("CategoryId", expect.any(Number))
        expect(cuisine).toHaveProperty(
            "updatedAt",
            expect.stringContaining(cuisine.updatedAt),
        );
        expect(cuisine).toHaveProperty(
            "createdAt",
            expect.stringContaining(cuisine.createdAt),
        );
        expect(cuisine).toHaveProperty("name", cuisine.name)
        expect(cuisine).toHaveProperty("description", cuisine.description)
        expect(cuisine).toHaveProperty("price", cuisine.price)
        expect(cuisine).toHaveProperty("imgUrl", cuisine.imgUrl)
        expect(cuisine).toHaveProperty("CategoryId", cuisine.CategoryId)
    })
})

describe("GET /pub/cuisines/:id", () => {
    test("GET /pub/cuisines/:id: postive test case - should get cuisine based on params id given", async () => {
        const response = await request(app).get("/pub/cuisines/1")

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

        // cek isi data cuisine
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("name", expect.any(String))
        expect(response.body).toHaveProperty("description", expect.any(String))
        expect(response.body).toHaveProperty("price", expect.any(Number))
        expect(response.body).toHaveProperty("imgUrl", expect.any(String))
        expect(response.body).toHaveProperty("CategoryId", expect.any(Number))
        expect(response.body).toHaveProperty(
            "updatedAt",
            expect.stringContaining(response.body.updatedAt),
        );
        expect(response.body).toHaveProperty(
            "createdAt",
            expect.stringContaining(response.body.createdAt),
        );
        expect(response.body).toHaveProperty("name", response.body.name)
        expect(response.body).toHaveProperty("description", response.body.description)
        expect(response.body).toHaveProperty("price", response.body.price)
        expect(response.body).toHaveProperty("imgUrl", response.body.imgUrl)
        expect(response.body).toHaveProperty("CategoryId", response.body.CategoryId)
    })
    test("GET /pub/cuisines/:id: negative test case - Cuisine Not Found", async () => {
        const response = await request(app).get("/pub/cuisines/99")

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", response.body.message)
    })
})