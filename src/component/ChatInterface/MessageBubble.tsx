import dayjs from "dayjs";

interface Props {
  message: string;
  sender: string;
  chatbotName: string;
  timestamp: string;
}

export default function MessageBubble({ message, sender, chatbotName, timestamp }: Props) {
  return (
    <div
      className={`flex flex-col max-w-fit bg-amber-50 text-black px-4 py-2 rounded-lg break-words ${
        sender === "user" && "ml-auto bg-blue-100"
      }`}
    >
      <p className={sender === "user" ? "text-cyan-700 font-semibold" : "text-rose-700 font-semibold"}>
        {sender === "user" ? "You" : chatbotName || "AI"}
      </p>
      <p className="whitespace-pre-wrap">{message}</p>
      <p className="text-xs mt-2 text-gray-500">{dayjs(timestamp).format("D MMMM YYYY, h:mm A")}</p>
    </div>
  );
}
