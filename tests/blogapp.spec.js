import { test, expect } from "@playwright/test";

import jwt from "jsonwebtoken";
let accessTokenUser1;

let blogpostId;
let accessTokenUser2;
test.describe.serial("TESTING BLOGAPP", () => {
  test.describe.serial("Register and Login", () => {
    test("Test:Register user 1", async ({ request }) => {
      const response = await request.post(
        "http://localhost:4000/auth/register",
        {
          data: {
            email: "demo1@gmail.com",
            password: "1234",
            name: "demo",
          },
        }
      );
      // console.log(response.body);
      // expect(response.body.code).toBe("AUTHR");
      expect(response.status()).toBe(201);
    });
    test("Test:Register user 2", async ({ request }) => {
      const response = await request.post(
        "http://localhost:4000/auth/register",
        {
          data: {
            email: "demo2@gmail.com",
            password: "1234",
            name: "demo",
          },
        }
      );
      // expect(response.body.code).toBe("AUTHR");
      expect(response.status()).toBe(201);
    });

    test("Test: Already Register User", async ({ request }) => {
      const response = await request.post(
        "http://localhost:4000/auth/register",
        {
          data: {
            email: "demo1@gmail.com",
            password: "1234",
            name: "Pravin",
          },
        }
      );
      // expect(response.body.code).toBe("UAE");
      expect(response.status()).toBe(403);
    });

    test("Test: Login with correct email and password for user 1", async ({
      request,
    }) => {
      const response = await request.post("http://localhost:4000/auth/login", {
        data: {
          email: "demo1@gmail.com",
          password: "1234",
        },
      });
      const data = JSON.parse(await response.body());
      console.log(data.data.accessToken);
      jwt.verify(data.data.accessToken, "RESTFULAPIs", (err, user) => {});
      expect(response.status()).toBe(200);
      accessTokenUser1 = data.data.accessToken;
    });
    test("Test: Login with correct email and password for user 2", async ({
      request,
    }) => {
      const response = await request.post("http://localhost:4000/auth/login", {
        data: {
          email: "demo2@gmail.com",
          password: "1234",
        },
      });
      const data = JSON.parse(await response.body());
      console.log(data.data.accessToken);
      jwt.verify(data.data.accessToken, "RESTFULAPIs", (err, user) => {});
      expect(response.status()).toBe(200);
      accessTokenUser2 = data.data.accessToken;
    });
    test("Test: Login with incorrect email and password", async ({
      request,
    }) => {
      const response = await request.post("http://localhost:4000/auth/login", {
        data: {
          email: "demo1@gmail.com",
          password: "12342",
        },
      });

      expect(response.status()).toBe(403);
    });
  });
  // test.describe.serial("CRUD", () => {
  //   test("Test: Create Post", async ({ request }) => {
  //     const blogpost = {
  //       title: "Java Advance & C++ ",
  //       author: "Pravin Nichal",
  //       content:
  //         "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sedexercitationem placeat consectetur nulla deserunt vel. Iusto corruptidicta.",
  //       tags: ["Marketing", "Programming"],
  //     };
  //     const response = await request
  //       .post("http://localhost:4000/blogposts")
  //       .set("Authorization", `Bearer ${accessTokenUser1}`)
  //       .send(blogpost);
  //     blogpostId = response.body.data._id;
  //     blogpostUser1 = response.body.data.user;
  //     expect(response.status()).toBe(201);
  //   });
  //   test("Test :Get All Posts", async ({ request }) => {
  //     const response = await request
  //       .get("http://localhost:4000/blogposts")
  //       .set("Authorization", `Bearer ${accessTokenUser1}`);
  //     console.log(response.body);
  //     expect(response.status()).toBe(200);
  //   });

  //   test("Test: Get By Id", async ({ request }) => {
  //     const response = await request
  //       .get("http://localhost:4000/blogposts/" + blogpostId)
  //       .set("Authorization", `Bearer ${accessTokenUser1}`);

  //     expect(response.status()).toBe(200);
  //   });

  //   test("Test: Update post", async ({ request }) => {
  //     const blogpost = {
  //       title: "Nodejs ",

  //       content: "HERE IS ",
  //       tags: ["Marketing", "Programming"],
  //       user: blogpostUser1,
  //     };
  //     const response = await request
  //       .patch("http://localhost:4000/blogposts/" + blogpostId)
  //       .set("Authorization", `Bearer ${accessTokenUser1}`)
  //       .send(blogpost);
  //     console.log(response.body);
  //     expect(response.status()).toBe(201);
  //   });

  //   test("Test: Update post with different user", async ({ request }) => {
  //     const blogpost = {
  //       title: "Nodejs ",

  //       content:
  //         "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sedexercitationem placeat consectetur nulla deserunt vel. Iusto corruptidicta.",
  //       tags: ["Marketing", "Programming"],
  //     };
  //     const response = await request
  //       .patch("http://localhost:4000/blogposts/" + blogpostId)
  //       .set("Authorization", `Bearer ${accessTokenUser2}`)
  //       .send(blogpost);
  //     console.log(response.body);
  //     expect(response.status()).toBe(401);
  //     expect(response.body.code).toBe("UAU");
  //   });

  //   test("Test: Delete Post", async ({ request }) => {
  //     const id = "65a54c00a7d42ade191300a7";

  //     const response = await request
  //       .delete("http://localhost:4000/blogposts/" + blogpostId)
  //       .set("Authorization", `Bearer ${accessTokenUser1}`);

  //     console.log(response.body);
  //     expect(response.status()).toBe(201);
  //   });
  // });

  // test.describe("Validations", () => {
  //   test("Test: Save post without data", async ({ request }) => {
  //     let blogpost = {};
  //     const response = await request
  //       .post("http://localhost:4000/blogposts")
  //       .set("Authorization", `Bearer ${accessTokenUser1}`)
  //       .send(blogpost);
  //     console.log(response.body);
  //     expect(response.status()).toBe(403);
  //   });
  //   test("Test: Save post without title", async ({ request }) => {
  //     let blogpost = {
  //       author: "Pravin Nichal",
  //       content:
  //         "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sedexercitationem placeat consectetur nulla deserunt vel. Iusto corruptidicta.",
  //       tags: ["Marketing", "Programming"],
  //     };
  //     const response = await request
  //       .post("http://localhost:4000/blogposts")
  //       .set("Authorization", `Bearer ${accessTokenUser1}`)
  //       .send(blogpost);
  //     console.log(JSON.stringify(response.body));
  //     expect(response.status()).toBe(403);
  //   });
  // });

  test.describe.serial("DELETE ALL TEST USERS", () => {
    let blogpostUser1 = "";
    let blogpostUser2 = "";
    test("Test: Login with correct email and password for user 1", async ({
      request,
    }) => {
      const response = await request.post("http://localhost:4000/auth/login", {
        data: {
          email: "demo1@gmail.com",
          password: "1234",
        },
      });
      const data = JSON.parse(await response.body());
      console.log(data.data.accessToken);
      jwt.verify(data.data.accessToken, "RESTFULAPIs", (err, user) => {
        blogpostUser1 = user._id;
        console.log(blogpostUser2);
      });
      expect(response.status()).toBe(200);
      accessTokenUser1 = data.data.accessToken;
    });
    test("Test: Login with correct email and password for user 2", async ({
      request,
    }) => {
      const response = await request.post("http://localhost:4000/auth/login", {
        data: {
          email: "demo2@gmail.com",
          password: "1234",
        },
      });
      const data = JSON.parse(await response.body());
      console.log(data.data.accessToken);
      jwt.verify(data.data.accessToken, "RESTFULAPIs", (err, user) => {
        blogpostUser2 = user._id;
        console.log(user._id);
        console.log(blogpostUser2);
      });
      expect(response.status()).toBe(200);
      accessTokenUser2 = data.data.accessToken;
    });
    test("Delete test user 1", async ({ request }) => {
      console.log(blogpostUser1);
      const response = await request.delete(
        "http://localhost:4000/auth/delete/" + blogpostUser1,
        {
          headers: {
            Authorization: `Bearer ${accessTokenUser1}`,
          },
        }
      );
      console.log(response.body);
      expect(response.status()).toBe(201);
    });
    test("Delete test user 2", async ({ request }) => {
      console.log(blogpostUser2);
      const response = await request.delete(
        "http://localhost:4000/auth/delete/" + blogpostUser2,
        {
          headers: {
            Authorization: `Bearer ${accessTokenUser2}`,
          },
        }
      );

      console.log(response.body);
      expect(response.status()).toBe(201);
    });
  });
});
//TEST REGISTER AND LOGIN
