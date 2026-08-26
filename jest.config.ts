import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",

  testEnvironment: "node",

  roots: ["<rootDir>/tests"],

  testMatch: ["**/*.test.ts"],

  extensionsToTreatAsEsm: [".ts"],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
        useESM: true,
      },
    ],
  },

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],

  clearMocks: true,

  collectCoverageFrom: ["src/**/*.ts", "!src/server.ts", "!src/app.ts"],

  coverageDirectory: "coverage",

  coverageReporters: ["text", "lcov"],
};

export default config;
