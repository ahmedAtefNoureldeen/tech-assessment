"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50" ref={chatRef}>
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Chat messages will go here */}
            <div className="text-center text-muted-foreground">
              Chat functionality coming soon...
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-md"
                disabled
              />
              <Button disabled>Send</Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          size="icon"
          className="rounded-full h-12 w-12 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
} 