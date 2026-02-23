'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChatLauncher } from './ChatLauncher';
import { ChatPanel, type UiChatMessage } from './ChatPanel';
import type { ChatResponseBody } from '@/lib/rag/types';

const SESSION_PULSE_KEY = 'portfolio-chat-pulsed-v1';

const defaultPrompts = [
  'What kind of product leadership roles is Joydeep best suited for?',
  'Summarize Joydeep\'s fintech and lending experience.',
  'What RBI / lending infrastructure work has he done?',
  'Which projects show hands-on AI/automation experience?',
  'What are the strongest case studies to review first?',
  'How does Joydeep approach scaling lending products?',
];

function newMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function PortfolioChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);
  const [messages, setMessages] = useState<UiChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(defaultPrompts);

  useEffect(() => {
    const pulsed = window.sessionStorage.getItem(SESSION_PULSE_KEY) === '1';
    if (!pulsed) {
      setShouldPulse(true);
      window.sessionStorage.setItem(SESSION_PULSE_KEY, '1');
      const pulseTimer = window.setTimeout(() => setShouldPulse(false), 2200);
      return () => window.clearTimeout(pulseTimer);
    }
  }, []);

  const sendMessage = useCallback(
    async (text?: string) => {
      const messageText = (text ?? input).trim();
      if (!messageText || loading) return;

      const nextUserMessage: UiChatMessage = {
        id: newMessageId(),
        role: 'user',
        content: messageText,
      };

      const nextMessages = [...messages, nextUserMessage];
      setMessages(nextMessages);
      setInput('');
      setLoading(true);
      setError(null);
      setOpen(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: messageText,
            routeContext: pathname,
            history: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        const data = (await response.json()) as ChatResponseBody & { error?: string };
        if (!response.ok) {
          throw new Error(data.error || 'Chat request failed');
        }

        setMessages((prev) => [
          ...prev,
          {
            id: newMessageId(),
            role: 'assistant',
            content: data.answer,
            citations: data.citations,
          },
        ]);

        if (data.suggestedQuestions?.length) {
          setSuggestedPrompts(data.suggestedQuestions);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unable to reach the portfolio concierge.');
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, pathname]
  );

  const promptList = useMemo(() => suggestedPrompts.slice(0, 6), [suggestedPrompts]);

  return (
    <div className="fixed bottom-4 right-4 z-[120] flex flex-col items-end gap-3 chat-widget-root">
      {open && (
        <ChatPanel
          messages={messages}
          input={input}
          onInputChange={setInput}
          onSubmit={sendMessage}
          onClose={() => setOpen(false)}
          loading={loading}
          error={error}
          suggestedPrompts={promptList}
          onPromptSelect={(prompt) => void sendMessage(prompt)}
        />
      )}

      {!open && (
        <div className="flex flex-col items-end gap-2">
          <div className="rounded-full bg-white border-2 border-border-default px-3 py-1.5 hidden sm:block">
            <p className="text-xs font-medium text-text-secondary">Ask about Joydeep’s work, projects, and experience</p>
          </div>
          <ChatLauncher onOpen={() => setOpen(true)} shouldPulse={shouldPulse} />
        </div>
      )}
    </div>
  );
}
