"use client";

import { useState, useRef, useEffect } from "react";
import { Message, generateAIResponse } from "@/services/openaiService";
import { Icon } from "@iconify-icon/react";
import { initializeAudio, playSound } from "@/services/audioService";
import AudioToggle from "../AudioToggle";
import Sidebar from "../Sidebar/Sidebar";
import { useChatContext } from "../ChatProvider";
import MessageBubble from "./MessageBubble";

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatbotName } = useChatContext();

  // Initialize audio on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeAudio();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const userMsg = message.trim();
    setMessages([...messages, { message: userMsg, sender: "user", timestamp: new Date().toISOString() }]);
    setMessage("");
    playSound("messageSent", isAudioEnabled);
    try {
      setIsLoading(true);

      const updatedMessages = [
        ...messages,
        {
          message: userMsg,
          sender: "user",
          timestamp: new Date().toISOString(),
        },
      ];
      const response = await generateAIResponse(userMsg, updatedMessages, chatbotName);

      if (response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: response,
            sender: chatbotName || "AI",
            timestamp: new Date().toISOString(),
          },
        ]);
        playSound("messageReceived", isAudioEnabled);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: "Sorry, I couldn't generate a response at this time.",
            sender: chatbotName || "AI",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: "Sorry, an error occurred while processing your request.",
          sender: chatbotName || "AI",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-4/5 md:w-3/5 lg:w-2/5">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-row gap-4 items-center jusitfy-center ml-auto">
        <AudioToggle isAudioEnabled={isAudioEnabled} toggleAudio={setIsAudioEnabled} />
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white hover:cursor-pointer items-center justify-center flex"
        >
          <Icon icon="mdi:menu" className="text-white" />
        </div>
      </div>
      <div className="flex flex-col h-[65vh] overflow-y-auto w-full bg-blue-950/30 rounded-lg px-6 pt-6 pb-1 border-1 border-white">
        <div className="flex flex-col flex-grow">
          {messages.length >= 1 ? (
            <div className="flex flex-col gap-5">
              {messages.map((message, index) => {
                return (
                  <div key={index}>
                    <MessageBubble
                      message={message.message}
                      sender={message.sender}
                      chatbotName={chatbotName}
                      timestamp={message.timestamp}
                    />
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <p className="text-center my-auto text-white">Type your message to begin!</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div className="relative">
            <input
              className="flex flex-col h-[8vh] w-full bg-white text-black px-6 rounded-lg"
              type="text"
              placeholder="Type your message here..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              disabled={isLoading}
            />
            {message.length > 0 && (
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-6 h-6 bg-gray-300 text-white transition-colors duration-200 hover:bg-red-400 hover:cursor-pointer"
                onClick={() => setMessage("")}
                aria-label="Clear message"
              >
                <Icon icon="mdi:close" className="w-4 h-4" />
              </div>
            )}
          </div>

          <button
            className="bg-blue-200 w-full py-4 rounded-lg text-black transition-colors duration-150 hover:bg-red-200 hover:text-white hover:cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            <p>{isLoading ? "Generating response..." : "Send"}</p>
          </button>
        </div>
      </form>
    </div>
  );
}
