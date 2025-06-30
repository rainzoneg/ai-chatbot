import ChatInterface from "@/component/ChatInterface/ChatInterface";
import { ChatProvider } from "../component/ChatProvider";

export default function Home() {
  return (
    <div className="bg-stone-950 flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="w-full flex items-center justify-center">
        <ChatProvider>
          <ChatInterface />
        </ChatProvider>
      </div>
    </div>
  );
}
