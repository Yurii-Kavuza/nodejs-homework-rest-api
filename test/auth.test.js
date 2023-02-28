require("dotenv").config();

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { User } = require("../models/user");
const { DB_HOST_TEST } = process.env;

describe("register", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });

  it("should register a new user", async () => {
    const response = await supertest(app).post("/api/users/register").send({
      email: "user1@gmail.com",
      password: "123456",
    });

    expect(response.status).toEqual(201);
    expect(response.body.data.user.email).toEqual("user1@gmail.com");
    expect(response.body.data.user.subscription).toEqual("starter");
    expect(typeof response.body.data.user.avatarURL).toBe("string");

    // Other variant
    //
    // expect(response.body).toEqual({
    //   status: "success",
    //   code: 201,
    //   data: {
    //     user: {
    //       email: "user1@gmail.com",
    //       subscription: "starter",
    //       avatarURL: expect.any(String),
    //     },
    //   },
    // });
  });

  it("should not register a new user twice", async () => {
    await supertest(app).post("/api/users/register").send({
      email: "user1@gmail.com",
      password: "123456",
    });

    const response = await supertest(app).post("/api/users/register").send({
      email: "user1@gmail.com",
      password: "123456",
    });

    expect(response.status).toEqual(409);
  });

  it("Should login", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "user1@gmail.com",
      password: "123456",
    });

    expect(response.status).toEqual(200);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.user.email).toBe("user1@gmail.com");
    expect(response.body.data.user.subscription).toBeDefined();
    expect(typeof response.body.data.user.subscription).toBe("string");
  });
});
