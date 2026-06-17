import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "24h" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

export function getTokenFromHeaders(headers) {
  const auth = headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

export function authenticateRequest(request) {
  const token = getTokenFromHeaders(request.headers);
  if (!token) return null;
  return verifyToken(token);
}
