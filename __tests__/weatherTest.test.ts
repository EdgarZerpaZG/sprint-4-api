import { getWeatherData } from "../src/ts/weatherTest";

describe("getWeatherData()", () => {
  it("should return an object with latitude and longitude", async () => {
    const data = await getWeatherData();

    expect(data).toHaveProperty("latitude");
    expect(data).toHaveProperty("longitude");

    expect(typeof data.latitude).toBe("number");
    expect(typeof data.longitude).toBe("number");
  });
});