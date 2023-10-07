import "reflect-metadata";
import { AppUseCase } from "../src/app.usecase";

describe("AppUseCase", () => {
  it("returns Hello Expresso TS!", () => {
    const appUseCase = new AppUseCase();
    const result = appUseCase.execute();

    expect(result).toBe("Hello from ExpressoTS!");
  });

  it("returns json object hello world", () => {
    const appUseCase = new AppUseCase();

    const getTest = appUseCase.getTest();

    expect(getTest).toMatchObject({ "hello": "world" });
  });
});
