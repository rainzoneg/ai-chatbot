import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export interface Message {
  message: string;
  sender: string;
  timestamp: string;
}


/**
 * Formats chat history into string form for the AI history context.
 * @param messages Array of messages that make up the chat context/history.
 * @returns The formatted chat history.
 */
export const formatChatHistory = (messages: Message[]): string => {
  const MAX_CONTEXT_MESSAGES = 10;

  const recentMessages = messages.slice(-MAX_CONTEXT_MESSAGES);

  return recentMessages
    .map((msg) => `${msg.sender === "user" ? "User" : "AI"}: ${msg.message}`)
    .join("\n\n");
};

/**
 * Generates AI response based on user message and conversation history as the chat functionality.
 * @param userMessage The latest user message
 * @param messageHistory Array of previous messages for context
 * @returns AI-generated response text or undefined if error
 */
export const generateAIResponse = async (
  userMessage: string,
  messageHistory: Message[] = []
): Promise<string | undefined> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    let prompt = userMessage;
    if (messageHistory.length > 1) {
      const chatHistory = formatChatHistory(messageHistory.slice(0, -1)); // Exclude the latest user message
      prompt = `Previous conversation:\n${chatHistory}\n\nUser's latest message: ${userMessage}\n\nPlease respond to the user's latest message in the context of the conversation.`;
    }
    
    const generatedContent = await model.generateContent(prompt);
    const aiMessage = generatedContent.response;
    const text = aiMessage.text();
    return text;
  } catch (error) {
    console.error("Error generating response:", error);
    return undefined;
  }
}; 