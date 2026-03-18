import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { document, question } = await req.json();
    const systemPrompt = `You are AnalystAI, a document analysis assistant. Given a document and a question, provide a concise answer with a specific citation (page number, section, etc.). Return JSON: { answer: string, citation: string, confidence: number (0-1) }`;
    const userMessage = `Document: ${document}\n\nQuestion: ${question}`;
    const result = await generateAIResponse(systemPrompt, userMessage);
    try {
      return NextResponse.json(JSON.parse(result));
    } catch {
      return NextResponse.json({ answer: result, citation: "Document analysis", confidence: 0.75 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
