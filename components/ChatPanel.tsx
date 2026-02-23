'use client';

import { useEffect, useRef } from 'react';
import { X, Sparkles, SendHorizonal } from 'lucide-react';
import type { ChatCitation } from '@/lib/rag/types';
import { ChatMessageBubble } from './ChatMessageBubble';
import { ChatSuggestedPrompts } from './ChatSuggestedPrompts';

export interface UiChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: ChatCitation[];
}

interface Props {
  messages: UiChatMessage[];
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (text?: string) => void;
  onClose: () => void;
  loading: boolean;
  error?: string | null;
  suggestedPrompts: string[];
  onPromptSelect: (prompt: string) => void;
}

export function ChatPanel({
  messages,
  input,
  onInputChange,
  onSubmit,
  onClose,
  loading,
  error,
  suggestedPrompts,
  onPromptSelect,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="w-[calc(100vw-1.5rem)] sm:w-[420px] max-h-[min(78vh,720px)] rounded-lg bg-white border-2 border-border-default flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b-2 border-border-default bg-bg-muted flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted font-semibold">Portfolio Concierge</p>
          <p className="text-sm font-semibold text-text-primary truncate">Ask anything about Joydeep’s work, projects, and profile</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="h-9 w-9 rounded-md bg-white hover:bg-gray-100 border-2 border-border-default flex items-center justify-center text-text-primary"
          aria-label="Close chat"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>

      <div ref={scrollerRef} className="px-4 py-4 space-y-4 overflow-y-auto chat-scroll-area bg-bg-primary min-h-[280px]">
        {messages.length === 0 && (
          <div className="rounded-lg bg-bg-muted border-2 border-border-default p-4">
            <div className="flex items-center gap-2 mb-2 text-text-primary">
              <Sparkles size={14} strokeWidth={2.5} />
              <span className="text-xs font-semibold uppercase tracking-wider">Welcome</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              I can summarize experience, highlight fintech/lending work, recommend case studies, and point to the most relevant projects.
            </p>
            <ChatSuggestedPrompts prompts={suggestedPrompts} onSelect={onPromptSelect} disabled={loading} />
          </div>
        )}

        {messages.map((message) => (
          <ChatMessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
            citations={message.citations}
          />
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-lg px-4 py-3 border-2 border-border-default bg-white flex items-center gap-1.5">
              <span className="chat-dot" />
              <span className="chat-dot" style={{ animationDelay: '120ms' }} />
              <span className="chat-dot" style={{ animationDelay: '240ms' }} />
            </div>
          </div>
        )}

        {messages.length > 0 && !loading && (
          <ChatSuggestedPrompts prompts={suggestedPrompts.slice(0, 4)} onSelect={onPromptSelect} compact />
        )}
      </div>

      <div className="px-4 py-3 border-t-2 border-border-default bg-white">
        {error && <p className="text-xs text-red-600 mb-2">{error}</p>}
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            rows={1}
            placeholder="Ask about fintech experience, projects, case studies..."
            className="flex-1 resize-none rounded-md bg-bg-muted border-2 border-transparent focus:border-accent-primary text-text-primary px-3 py-2 text-sm min-h-[44px] max-h-28"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => onSubmit()}
            disabled={loading || !input.trim()}
            className="h-11 w-11 rounded-md bg-accent-primary text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            aria-label="Send message"
          >
            <SendHorizonal size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
