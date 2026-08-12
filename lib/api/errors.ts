import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class SetupRequiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SetupRequiredError";
  }
}

export function apiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: "Invalid request.", issues: error.flatten() }, { status: 400 });
  }

  if (error instanceof SetupRequiredError) {
    return NextResponse.json({ error: error.message, setupRequired: true }, { status: 503 });
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
}
