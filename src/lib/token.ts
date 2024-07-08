import * as jose from "jose";

export const signToken = async (data: { username: string; role: string }) => {
  return await new jose.SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(process.env.JWT_KEY));
};

export const verifyToken = async (token: string) => {
  return await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_KEY));
};
