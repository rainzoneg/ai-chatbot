"use client";

import { useChatContext } from "../ChatProvider";

export default function SystemPrompt() {
  const { systemPrompt, setSystemPrompt } = useChatContext();
  return (
    <div className="flex flex-col gap-2">
      <span className="text-white text-sm">System Prompt</span>
      <textarea
        className="text-white text-sm bg-gray-800/20 border-1 border-gray-600/50 rounded-md p-2"
        rows={8}
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
      />
    </div>
  );
}
