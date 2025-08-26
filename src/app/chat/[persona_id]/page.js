"use client";
import { personas } from "@/lib/personas";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";
import PersonaHeader from "@/components/ui/PersonaHeader";
import PersonaIntro from "@/components/ui/PersonaIntro";
import SuggestedQuestions from "@/components/ui/SuggestedQuestions";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";

export default function ChatPage() {
  const { persona_id } = useParams();
  const persona = personas.find((persona) => persona.id === persona_id);

  const [inputMsg, setInputMsg] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(persona_id);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming, fetching]);

  useEffect(() => {
    localStorage.setItem(persona_id, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    fetch("/api/usage")
      .then((res) => res.json())
      .then((data) => setUsageCount(data.usage[persona_id] || 0));
  }, [persona_id]);

  const handleStreamChat = async () => {
    setStreaming(true);
    setFetching(true);

    const newMessages = [
      ...messages,
      {
        role: "user",
        content: inputMsg,
      },
    ];

    setMessages(newMessages);
    setInputMsg("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, persona_id }),
      });

      const count = res.headers.get("X-Persona-Count");
      setUsageCount(count);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      setFetching(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6));
            setFetching(false);
            setMessages((prev) => {
              const msgs = [...prev];
              msgs[msgs.length - 1] = {
                ...msgs[msgs.length - 1],
                content: msgs[msgs.length - 1].content + data.content,
              };
              return msgs;
            });
          }
        }
      }
    } catch (error) {
      setMessages((prev) => {
        const msgs = [...prev];
        msgs[msgs.length - 1] = {
          ...msgs[msgs.length - 1],
          content: "Error: " + error.message,
        };
        return msgs;
      });
    }

    setStreaming(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <PersonaHeader persona={persona} messages={messages} />
      {/* Chat area */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-4 max-w-7xl w-full m-auto
    [&::-webkit-scrollbar]:hidden
    [-ms-overflow-style:none]
    [scrollbar-width:none]"
      >
        {messages.length === 0 ? (
          <div className="divide-y divide-dashed divide-gray-200">
            <PersonaIntro persona={persona} />
            <SuggestedQuestions persona={persona} setInputMsg={setInputMsg} />
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex w-full ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl shadow ${
                    msg.role === "user"
                      ? "bg-[#F76B15] text-white rounded-br-none max-w-[70%] "
                      : "bg-gray-100 text-gray-900 rounded-bl-none max-w-full sm:max-w-[70%] "
                  }`}
                >
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    <Response>{msg.content}</Response>
                  )}
                </div>
              </div>
            ))}
            {fetching && (
              <Loader size={20} className="animate-spin text-gray-500" />
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      {messages.length > 0 && (
        <div className="max-w-7xl w-full mx-auto px-4">
          <button
            onClick={() => setShowSuggestions((prev) => !prev)}
            className="text-sm text-gray-500 my-2 hover:text-gray-700 flex items-center gap-1"
          >
            {showSuggestions ? "▼" : "▶"}
            {showSuggestions ? "Hide suggestions" : "Show suggestions"}
          </button>
          {showSuggestions && (
            <Suggestions className="sm:w-full flex flex-wrap text-neutral-500">
              {persona.suggestedQuestions.map((suggestion) => (
                <Suggestion
                  key={suggestion}
                  onClick={() => setInputMsg(suggestion)}
                  suggestion={suggestion}
                />
              ))}
            </Suggestions>
          )}
        </div>
      )}
      {/* Input */}
      <div className="p-4 bg-white max-w-7xl w-full mx-auto">
        <form
          className="flex items-center border rounded-full px-4 py-2 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            handleStreamChat();
          }}
        >
          <input
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            name="message"
            type="text"
            placeholder={`Ask ${persona.name} a question`}
            className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400"
          />
          <button
            disabled={streaming || inputMsg === "" || usageCount >= 10}
            type="submit"
            className={`${
              streaming || inputMsg === "" || usageCount >= 10
                ? "opacity-50"
                : "hover:bg-gray-200"
            } ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100`}
          >
            ➤
          </button>
        </form>
      </div>
      <p className="pb-4 text-sm text-center text-gray-600/80 font-[400]">
        {10 - usageCount} messages remaining
      </p>
    </div>
  );
}
