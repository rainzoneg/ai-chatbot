"use client";

import { useState } from "react";

interface Message {
  message: string;
  sender: string;
  timestamp: string;
}

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

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
      <div className="flex flex-col h-[65vh] overflow-y-scroll w-full items-center justify-center bg-blue-950/20 px-48 border-1 border-white rounded-lg">
        {messages.length >= 1 ? (
          <>
            {messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col mt-4 bg-rose-50 text-black px-4 py-2 rounded-lg my-1"
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
                  <p>{message.message}</p>
                  <p className="text-xs mt-2 text-gray-500">
                    {message.timestamp}
                  </p>
                </div>
              );
            })}
          </>
        ) : (
          <p>Type your message to begin!</p>
        )}
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
