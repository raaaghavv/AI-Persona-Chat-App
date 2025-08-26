import OpenAI from "openai";
import { cookies } from "next/headers"; // <-- Next.js helper
import { personas } from "@/lib/personas";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(request) {
  try {
    const { messages, persona_id } = await request.json();
    const { prompt } = personas.find((persona) => persona.id === persona_id);

    // ---- Step 1: Get cookies ----
    const cookieStore = await cookies();
    const usageCookie = cookieStore.get("persona-usage");
    let usage = usageCookie ? JSON.parse(usageCookie.value) : {};

    const count = usage[persona_id] || 0;

    // ---- Step 2: Check limit ----
    if (count >= 10) {
      return new Response(
        JSON.stringify({ error: "Limit reached for this persona" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // ---- Step 3: Call LLM ----
    const stream = await openai.chat.completions.create({
      model: "gemini-2.5-flash-lite",
      messages: [
        { role: "system", content: prompt },
        // { role: "user", content: "hello sir" }
        ...messages,
      ],
      stream: true,
    });

    // ---- Step 4: Update usage ----
    usage[persona_id] = count + 1;

    // ---- Step 5: Create streaming response ----
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
            );
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        // Save updated cookie
        "Set-Cookie": `persona-usage=${JSON.stringify(
          usage
        )}; Path=/; HttpOnly; Secure; Max-Age=${60 * 60 * 24 * 7}`,
        "X-Persona-Count": usage[persona_id],
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to process request at the moment" },
      { status: 500 }
    );
  }
}
