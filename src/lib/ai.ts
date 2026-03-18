import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export async function generateAIResponse(systemPrompt: string, userMessage: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userMessage }],
    temperature: 0.3, max_tokens: 2048,
  });
  return completion.choices[0]?.message?.content || "";
}
export { openai };
