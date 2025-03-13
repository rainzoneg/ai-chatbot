import ChatInterface from "@/component/ChatInterface/ChatInterface";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-stone-950 flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="w-full flex items-center justify-center">
        <ChatInterface />
      </div>
    </div>
  );
}
