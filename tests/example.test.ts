/// <reference types="jest" />

import { env } from "../src/config/env";

console.log(env.DATABASE_URL);

describe("Example", () => {
  it("should return true", () => {
    expect(true).toBe(true);
  });
});
