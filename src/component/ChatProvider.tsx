"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ChatContextType {
  chatbotName: string;
  userName: string;
  setChatbotName: (name: string) => void;
  setUserName: (name: string) => void;
}

const ChatContext = createContext<ChatContextType>({
  chatbotName: "",
  setChatbotName: () => {},
  userName: "",
  setUserName: () => {},
});

/**
 * Provider for the chat context. Includes context values for chatbot name and the function to set the chatbot name.
 * @param children - The children components to be rendered.
 * @returns The chat provider.
 */
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatbotName, setChatbotName] = useState("AI");
  const [userName, setUserName] = useState("You");
  return (
    <ChatContext.Provider value={{ chatbotName, setChatbotName, userName, setUserName }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
