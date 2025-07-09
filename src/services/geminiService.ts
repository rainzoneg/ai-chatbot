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
 * @param chatbotName The name of the chatbot (defaults to "Friend")
 * @returns The formatted chat history.
 */
export const formatChatHistory = (messages: Message[], chatbotName: string = "Friend"): string => {
  const MAX_CONTEXT_MESSAGES = 10;

  const recentMessages = messages.slice(-MAX_CONTEXT_MESSAGES);

  return recentMessages.map((msg) => `${msg.sender === "user" ? "User" : chatbotName}: ${msg.message}`).join("\n\n");
};

/**
 * Generates AI response based on user message and conversation history as the chat functionality.
 * @param userMessage The latest user message
 * @param messageHistory Array of previous messages for context
 * @param chatbotName The name of the chatbot (defaults to "Friend")
 * @param userName The name of the user (defaults to "User")
 * @param systemPrompt The system prompt (defaults to "")
 * @returns AI-generated response text or undefined if error
 */
export const generateAIResponse = async (
  userMessage: string,
  messageHistory: Message[] = [],
  chatbotName: string = "Friend",
  userName: string = "User",
  systemPrompt: string = ""
): Promise<string | undefined> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create a personalized instruction with the bot's name
    const personalizedInstructions =
      systemPrompt +
      `\n\nYour name is ${chatbotName}. When users address you by this name, respond accordingly. The user's name is ${userName}.`;

    let prompt = `${personalizedInstructions}\n\n${userName}: ${userMessage}`;

    if (messageHistory.length > 1) {
      const chatHistory = formatChatHistory(messageHistory.slice(0, -1), chatbotName); // Exclude the latest user message
      prompt = `${personalizedInstructions}\n\nPrevious conversation:\n${chatHistory}\n\n${userName}'s latest message: ${userMessage}\n\nRespond as ${chatbotName}, continuing the conversation naturally.`;
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
