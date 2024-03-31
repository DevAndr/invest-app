export async function GET(request: Request) {
    const response = await fetch(request);
    return Response.json({check: true});
}