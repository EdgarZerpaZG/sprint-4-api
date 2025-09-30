import { jokeStatus } from "../src/jokeTest";

describe("jokeStatus()", () => {
  it("should return 'Chuck'", async () => {
    const value = await jokeStatus();
    expect(value).toMatch(/Chuck/);
  });
});