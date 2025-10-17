import { useState } from "react";
import { events, Event } from "../data/eventsData";
import { MessageSquare } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages([...messages, { sender: "user", text: userMessage }]);
    setInput("");

    // Simple bot response based on keywords
    const lower = userMessage.toLowerCase();
    let botResponse = "Sorry, I couldn't find an answer. Try asking about an event or its schedule.";

    events.forEach((event: Event) => {
      if (
        lower.includes(event.name.toLowerCase()) ||
        lower.includes(event.code.toLowerCase()) ||
        lower.includes(event.day.toLowerCase())
      ) {
        botResponse = `${event.name} (${event.code})\nTime: ${event.time}\nVenue: ${event.venue}${
          event.description ? `\nDescription: ${event.description}` : ""
        }${event.entryFee ? `\nEntry Fee: ${event.entryFee}` : ""}`;
      }
    });

    setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300"
        aria-label="Open Chatbot"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-50 w-80 max-h-[500px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg flex flex-col">
          <div className="p-2 bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] text-white font-bold rounded-t-lg">
            Martinovation ChatBot
          </div>
          <div className="flex-1 p-2 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "self-end bg-blue-500 text-white"
                    : "self-start bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                }`}
              >
                {msg.text.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-300 dark:border-gray-700 flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:text-white"
              placeholder="Ask about events..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] text-white rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
