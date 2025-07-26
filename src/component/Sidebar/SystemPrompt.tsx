"use client";

import { useEffect } from "react";
import { getCustomPrompt, useChatContext } from "../ChatProvider";

export default function SystemPrompt() {
  const { systemPrompt, setSystemPrompt } = useChatContext();

  useEffect(() => {
    const savedCustomPrompt = localStorage.getItem("customPrompt");
    if (savedCustomPrompt) {
      setSystemPrompt(savedCustomPrompt);
    }
  }, [setSystemPrompt]);

  useEffect(() => {
    localStorage.setItem("customPrompt", systemPrompt);
  }, [systemPrompt]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-white text-sm">System Prompt</span>
      <textarea
        className="text-white text-sm bg-gray-800/20 border-1 border-gray-600/50 rounded-md p-2"
        rows={8}
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
      />
      <button
        className="hover:cursor-pointer px-4 py-2 border-1 bg-gray-800/60 hover:bg-gray-800/80 active:bg-gray-800/20 text-white active:text-gray-200/80 font-medium border-gray-600/50 text-sm rounded-md transition-all duration-100"
        onClick={() => setSystemPrompt(getCustomPrompt())}
      >
        Reset to Default
      </button>
    </div>
  );
}
