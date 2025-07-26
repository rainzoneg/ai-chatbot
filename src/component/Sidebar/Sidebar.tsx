import { useChatContext } from "../ChatProvider";
import SystemPrompt from "./SystemPrompt";

/**
 * Sidebar component for the chat interface.
 * @param isOpen - Whether the sidebar is open or not.
 * @returns The sidebar component.
 */
export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const { chatbotName, userName, setChatbotName, setUserName, systemPrompt, setSystemPrompt } = useChatContext();
  return (
    <aside
      className={`fixed top-0 right-0 h-full w-[23%] bg-gray-800/50 backdrop-blur-sm transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col gap-8 px-5">
        <div className="text-white text-xl font-bold mt-5">Chat Settings</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-white text-sm">Chatbot Name</span>
            <input
              type="text"
              className="text-white text-sm bg-gray-800/20 border-1 border-gray-600/50 rounded-md p-2"
              value={chatbotName}
              onChange={(e) => setChatbotName(e.target.value)}
              placeholder="AI"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white text-sm">Your Name</span>
            <input
              type="text"
              className="text-white text-sm bg-gray-800/20 border-1 border-gray-600/50 rounded-md p-2"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="You"
            />
          </div>
          <div className="flex flex-col gap-2">
            <SystemPrompt />
          </div>
        </div>
      </div>
    </aside>
  );
}
