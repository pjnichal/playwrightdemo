import { test, expect } from "@playwright/test";
test.describe.parallel("SERVER STATUS", () => {
  test("API PING TEST", async ({ request }) => {
    const response = await request.get("http://localhost:5000/");
    expect(response.status()).toBe(200);
  });
});

test.describe.serial("OPERATION TESTING", () => {
  test("Add Domain ", async ({ request }) => {
    const response = await request.post("http://localhost:5000/api/dns1", {
      data: { domain: "facebook.com", ip: "142.250.192.78" },
    });
    expect(response.status()).toBe(201);
  });
  test("Trying to add domain that already exists", async ({ request }) => {
    const response = await request.post("http://localhost:5000/api/dns1", {
      data: { domain: "facebook.com", ip: "142.250.192.78" },
    });
    expect(response.status()).toBe(403);
  });
  test("Get ip by domain name", async ({ request }) => {
    const response = await request.get(
      "http://localhost:5000/api/dns1/google.com"
    );
    expect(response.status()).toBe(200);
  });

  test("Update domain record", async ({ request }) => {
    const response = await request.patch("http://localhost:5000/api/dns1", {
      data: { domain: "facebook.com", ip: "127.0.0.1" },
    });
    expect(response.status()).toBe(201);
  });
  test("Delete domain record", async ({ request }) => {
    const response = await request.delete(
      "http://localhost:5000/api/dns1/facebook.com"
    );
    expect(response.status()).toBe(201);
  });
  test("Try getting domain record that is not present", async ({ request }) => {
    const response = await request.get(
      "http://localhost:5000/api/dns1/facebook.com"
    );
    expect(response.status()).toBe(404);
  });
});
