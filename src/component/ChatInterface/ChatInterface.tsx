"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  message: string;
  sender: string;
  timestamp: string;
}

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;
    setMessages([
      ...messages,
      { message, sender: "user", timestamp: new Date().toISOString() },
    ]);
    setMessage("");
  };

  return (
    <div className="flex flex-col gap-5 w-2/5">
      <div className="flex flex-col h-[65vh] overflow-y-auto w-full bg-blue-950/15 rounded-lg p-6 border-1 border-white">
        <div className="flex flex-col flex-grow">
          {messages.length >= 1 ? (
            <>
              {messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col mt-4 bg-amber-50 text-black px-4 py-2 rounded-lg my-1 break-words"
                  >
                    <p
                      className={
                        message.sender === "user"
                          ? "text-cyan-700 font-semibold"
                          : "text-rose-700 font-semibold"
                      }
                    >
                      {message.sender === "user" ? "You" : "AI"}
                    </p>
                    <p className="whitespace-pre-wrap">{message.message}</p>
                    <p className="text-xs mt-2 text-gray-500">
                      {message.timestamp}
                    </p>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <p className="text-center my-auto">Type your message to begin!</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <input
            className="flex flex-col h-[8vh] w-full bg-white text-black px-6 rounded-lg"
            type="text"
            placeholder="Type your message here..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />

          <button
            className="bg-blue-200 w-full py-4 rounded-lg text-black hover:bg-red-200 hover:text-white"
            type="submit"
          >
            <div>Send</div>
          </button>
        </div>
      </form>
    </div>
  );
}
