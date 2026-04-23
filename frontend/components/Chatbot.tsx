"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { createChatSession, sendChatMessage } from "@/lib/api";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hi! I'm the FindAHome assistant. How can I help you today? (e.g., 'Search for a 2 bedroom in Kilimani')", 
      sender: "bot" 
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);

  const getOrCreateSession = async () => {
    if (sessionId) return sessionId;
    const session = await createChatSession();
    setSessionId(session.id);
    return session.id;
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;

    const draft = inputValue.trim();

    const userMsg: Message = { id: Date.now(), text: draft, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    try {
      setIsSending(true);
      const activeSessionId = await getOrCreateSession();
      const response = await sendChatMessage(activeSessionId, draft);

      const botMsg: Message = {
        id: response.id,
        text: response.text,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const isAuthIssue = err instanceof Error && err.message === "AUTH_REQUIRED";
      const botMsg: Message = {
        id: Date.now() + 1,
        text: isAuthIssue
          ? "Please sign in first so I can access your chat session and personalized assistance."
          : "I could not reach the chat API right now. Please confirm the backend server is running and try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
            <h3 className="font-semibold">FindAHome Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-blue-200 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-80 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white self-end rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-800 self-start rounded-bl-none shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isSending}
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none rounded-full px-4 py-2 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={isSending}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-500 transition-transform transform hover:scale-105 flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
