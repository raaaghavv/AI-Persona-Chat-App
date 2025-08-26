import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const usageCookie = cookieStore.get("persona-usage");
  const usage = usageCookie ? JSON.parse(usageCookie.value) : {};
  return Response.json({ usage });
}
