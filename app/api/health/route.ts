export function GET() {
  return Response.json({
    ok: true,
    service: "tmc-tech-solutions",
    time: new Date().toISOString()
  });
}
