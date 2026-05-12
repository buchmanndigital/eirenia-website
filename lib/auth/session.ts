import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/db/users";
import type { AdminUser, UserRole } from "@/lib/db/types";
import { COACH_LOGIN } from "@/lib/coach-public-paths";

const sessionCookie = "eirenia_session";

type SessionPayload = {
  sub: string;
  role: UserRole;
};

function getSecret() {
  const secret =
    process.env.SESSION_SECRET ||
    (process.env.NODE_ENV === "production" ? "" : "dev-eirenia-session-secret");

  if (!secret) {
    throw new Error("SESSION_SECRET ist nicht gesetzt.");
  }

  return new TextEncoder().encode(secret);
}

export async function createSession(user: Pick<AdminUser, "id" | "role">) {
  const token = await new SignJWT({ role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(sessionCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookie);
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie)?.value;

  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, getSecret());
    const payload = verified.payload as unknown as SessionPayload;
    if (!payload.sub) {
      return null;
    }

    const user = await getUserById(payload.sub);
    if (!user || user.status !== "active") {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export async function requireSession() {
  const user = await getSessionUser();
  if (!user) {
    redirect(COACH_LOGIN);
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireSession();
  if (user.role !== "admin") {
    redirect("/admin");
  }
  return user;
}
