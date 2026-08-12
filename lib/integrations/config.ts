import "server-only";
import { SetupRequiredError } from "@/lib/api/errors";

export function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new SetupRequiredError(`${name} is not configured on the server.`);
  }
  return value;
}
