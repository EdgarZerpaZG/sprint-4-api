import { jokeStatus } from "../src/jokeTest";

describe("jokeStatus()", () => {
  it("should return 200", async () => {
    const status = await jokeStatus();
    expect(status).toBe(200);
  });
});
