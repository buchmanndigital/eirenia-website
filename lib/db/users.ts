import { ensureDatabaseReady } from "./schema";
import { hasDatabase, sql } from "./connection";
import type { AdminUser, UserRole, UserStatus } from "./types";

type UserRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  status: UserStatus;
  phone: string | null;
  bio: string | null;
  created_at: string;
};

export async function getUserByEmail(email: string) {
  if (!hasDatabase) {
    return null;
  }
  await ensureDatabaseReady();
  const result = await sql<UserRow>`
    SELECT * FROM admin_users WHERE lower(email) = lower(${email}) LIMIT 1
  `;
  return result.rows[0] || null;
}

export async function getUserById(id: string) {
  if (!hasDatabase) {
    return null;
  }
  await ensureDatabaseReady();
  const result = await sql<UserRow>`
    SELECT * FROM admin_users WHERE id = ${id} LIMIT 1
  `;
  return result.rows[0] ? mapUser(rowWithoutPassword(result.rows[0])) : null;
}

export async function getAllCoaches() {
  if (!hasDatabase) {
    return [];
  }
  await ensureDatabaseReady();
  const result = await sql<UserRow>`
    SELECT * FROM admin_users ORDER BY created_at DESC
  `;
  return result.rows.map((row) => mapUser(rowWithoutPassword(row)));
}

export function rowWithoutPassword(row: UserRow) {
  const { password_hash: _passwordHash, ...safeRow } = row;
  void _passwordHash;
  return safeRow;
}

export function mapUser(row: Omit<UserRow, "password_hash">): AdminUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    status: row.status,
    phone: row.phone,
    bio: row.bio,
    createdAt: row.created_at,
  };
}
