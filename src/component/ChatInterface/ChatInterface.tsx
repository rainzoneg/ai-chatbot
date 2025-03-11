"use client";

import { useState } from "react";

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <div className="flex flex-col gap-5 w-2/5">
      <div className="flex flex-col h-[60vh] overflow-y-scroll w-full items-center justify-center bg-blue-950/20 px-48 border-1 border-white rounded-lg">
        {messages.length >= 1 ? (
          <>
            {messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col mt-4 bg-rose-50 text-black px-4 py-2 rounded-lg my-1"
                >
                  <p>{message}</p>
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
