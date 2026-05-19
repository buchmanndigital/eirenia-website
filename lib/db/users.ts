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
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  bio: string | null;
  photo_url: string | null;
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

export async function getCoachAccounts() {
  if (!hasDatabase) {
    return [];
  }
  await ensureDatabaseReady();
  const result = await sql<UserRow>`
    SELECT * FROM admin_users
    WHERE role = 'coach'
    ORDER BY created_at DESC
  `;
  return result.rows.map((row) => mapUser(rowWithoutPassword(row)));
}

export async function getCoachAccount(id: string) {
  if (!hasDatabase) {
    return null;
  }
  await ensureDatabaseReady();
  const result = await sql<UserRow>`
    SELECT * FROM admin_users
    WHERE id = ${id} AND role = 'coach'
    LIMIT 1
  `;
  return result.rows[0] ? mapUser(rowWithoutPassword(result.rows[0])) : null;
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
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    role: row.role,
    status: row.status,
    phone: row.phone,
    bio: row.bio,
    photoUrl: row.photo_url,
    createdAt: row.created_at,
  };
}
