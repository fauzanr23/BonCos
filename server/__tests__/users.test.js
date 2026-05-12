const request = require("supertest");
const app = require("../app");
const { User } = require("../models");


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
});

afterAll(async () => {
  await User.destroy({
    truncate: true, 
    restartIdentity: true, 
    cascade: true, 
  });
});

//test login

describe("POST /login", () => {
    test("POST /login: positive test case - should send access token", async () => {
        const testUser = {
            email: "admin-test@email.com",
            password: "admin123",
        };
        const response = await request(app)
            .post("/login")
            .send(testUser);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("access_token", expect.any(String));
    })
    test("POST /login: input validation (email not given) - Email is required", async () => {
        const testUser = {
            email: "",
            password: "admin123",
        };
        const response = await request(app)
            .post("/login")
            .send(testUser);
        
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Email is required");
    })
    test("POST /login: input validation (password not given) - Password is required", async () => {
        const testUser = {
            email: "admin-test@email.com",
            password: "",
        };
        const response = await request(app)
            .post("/login")
            .send(testUser);
        
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Password is required");
    })
    test("POST /login: input validation (invalid email) - Invalid Email/Password", async () => {
        const testUser = {
            email: "admin-tes@email.com",
            password: "admin123",
        };
        const response = await request(app)
            .post("/login")
            .send(testUser);
        
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Email/Password");
    })
    test("POST /login: input validation (invalid password) - Invalid Email/Password", async () => {
        const testUser = {
            email: "admin-test@email.com",
            password: "admin",
        };
        const response = await request(app)
            .post("/login")
            .send(testUser);
        
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Email/Password");
    })
})