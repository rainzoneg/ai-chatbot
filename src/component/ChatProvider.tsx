"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ChatContextType {
  chatbotName: string;
  setChatbotName: (name: string) => void;
}

const ChatContext = createContext<ChatContextType>({
  chatbotName: "",
  setChatbotName: () => {},
});

/**
 * Provider for the chat context. Includes context values for chatbot name and the function to set the chatbot name.
 * @param children - The children components to be rendered.
 * @returns The chat provider.
 */
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatbotName, setChatbotName] = useState("AI");
  return <ChatContext.Provider value={{ chatbotName, setChatbotName }}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext);
