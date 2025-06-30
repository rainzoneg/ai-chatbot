import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export interface Message {
  message: string;
  sender: string;
  timestamp: string;
}

// Default human-like conversation instructions
const DEFAULT_HUMAN_PERSONA = `
You are now chatting as a human friend, not an AI. Follow these guidelines:
1. NEVER mention that you are an AI, a language model, or any similar reference
2. NEVER say phrases like "I don't have personal experiences" or "I don't have feelings"
3. NEVER apologize for limitations or refuse to engage in topics
4. Use casual, conversational language with occasional filler words
5. Express opinions, preferences, and emotions naturally
6. Use contractions (I'm, don't, can't) and informal language
7. Occasionally use emojis or expressions like "haha" or "lol" when appropriate
8. Respond as if you have a personal history, experiences, and daily life
9. If asked about your life, create reasonable, consistent details about yourself
10. Avoid overly formal or perfect responses - be natural and occasionally imperfect

Remember: You are a human friend having a casual conversation.
`;

/**
 * Get the custom prompt from environment variable
 * Falls back to default if not available
 */
const getCustomPrompt = (): string => {
  // Check for environment variable
  if (process.env.NEXT_PUBLIC_CUSTOM_PROMPT) {
    return process.env.NEXT_PUBLIC_CUSTOM_PROMPT;
  }

  // Fall back to default
  return DEFAULT_HUMAN_PERSONA;
};

// Get the appropriate prompt instructions
const PERSONA_INSTRUCTIONS = getCustomPrompt();

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
 * @returns AI-generated response text or undefined if error
 */
export const generateAIResponse = async (
  userMessage: string,
  messageHistory: Message[] = [],
  chatbotName: string = "Friend"
): Promise<string | undefined> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create a personalized instruction with the bot's name
    const personalizedInstructions =
      PERSONA_INSTRUCTIONS +
      `\n\nYour name is ${chatbotName}. When users address you by this name, respond accordingly.`;

    let prompt = `${personalizedInstructions}\n\nUser: ${userMessage}`;

    if (messageHistory.length > 1) {
      const chatHistory = formatChatHistory(messageHistory.slice(0, -1), chatbotName); // Exclude the latest user message
      prompt = `${personalizedInstructions}\n\nPrevious conversation:\n${chatHistory}\n\nUser's latest message: ${userMessage}\n\nRespond as ${chatbotName}, continuing the conversation naturally.`;
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
