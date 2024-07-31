import * as jose from "jose";
import { cookies } from "next/headers";

export const signToken = async (data: { username: string; role: string }) => {
  // Sign token
  const token = await new jose.SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(process.env.JWT_KEY));
  // Set cookie
  cookies().set("token", token, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};

export const verifyToken = async () => {
  const token = cookies().get("token")?.value as string;
  return await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_KEY));
};

export const deleteToken = () => {
  cookies().delete("token");
};
