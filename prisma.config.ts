import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL") || process.env.DATABASE_URL || "",
    directUrl: env("DIRECT_URL") || process.env.DIRECT_URL || "",
  },
});
