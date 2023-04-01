import request from "supertest";
import app from "../src/server";

const token = process.env.TESTING_API_TOKEN;

describe("GET /api/v1/books", () => {
  it("should return all books", async () => {
    const res = await request(app)
      .get("/api/v1/books")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});


// describe("Post Endpoints", () => {
//   it("should create a new post", async () => {
//     const res = await request(app).post("/api/v1/books").send({
//       userId: 1,
//       title: "test is cool",
//     });
//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty("post");
//   });
// });

// describe("GET /api/products/:id", () => {
//     it("should return a product", async () => {
//       const res = await request(app).get(
//         "/api/products/6331abc9e9ececcc2d449e44"
//       );
//       expect(res.statusCode).toBe(200);
//       expect(res.body.name).toBe("Product 1");
//     });
//   });

//   describe("POST /api/products", () => {
//     it("should create a product", async () => {
//       const res = await request(app).post("/api/products").send({
//         name: "Product 2",
//         price: 1009,
//         description: "Description 2",
//       });
//       expect(res.statusCode).toBe(201);
//       expect(res.body.name).toBe("Product 2");
//     });
//   });

//   describe("PUT /api/products/:id", () => {
//     it("should update a product", async () => {
//       const res = await request(app)
//         .patch("/api/products/6331abc9e9ececcc2d449e44")
//         .send({
//           name: "Product 4",
//           price: 104,
//           description: "Description 4",
//         });
//       expect(res.statusCode).toBe(200);
//       expect(res.body.price).toBe(104);
//     });
//   });

//   describe("DELETE /api/products/:id", () => {
//     it("should delete a product", async () => {
//       const res = await request(app).delete(
//         "/api/products/6331abc9e9ececcc2d449e44"
//       );
//       expect(res.statusCode).toBe(200);
//     });
//   });
