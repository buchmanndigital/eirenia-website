/** Nur Umgebungsvariablen – importiert **nicht** `@vercel/postgres` (sonst kann lokales Dev beim Modul-Load an Neon hängen). */
export const hasDatabase = Boolean(
  process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING,
);
