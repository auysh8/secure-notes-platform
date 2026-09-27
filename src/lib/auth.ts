import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getUserIdFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT as string) as {
      id: string;
    };
    return decoded.id;
  } catch {
    return null;
  }
}
