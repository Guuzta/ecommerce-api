/// <reference types="jest" />

import { prisma } from "../src/lib/prisma";

beforeAll(async () => {
  await prisma.$connect();
});

afterEach(async () => {});

afterAll(async () => {
  await prisma.$disconnect();
});
