import { sql } from "@vercel/postgres";

export const hasDatabase = Boolean(
  process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING,
);

export { sql };
