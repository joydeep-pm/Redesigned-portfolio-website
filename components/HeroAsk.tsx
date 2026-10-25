'use client';

import { MessageCircle } from 'lucide-react';

const prompts = [
  'What did he ship in co-lending?',
  'Which teardown should I read first?',
  'Which projects show hands-on AI work?',
];

export function HeroAsk() {
  return (
    <div className="mt-8">
      <p className="eyebrow mb-3 inline-flex items-center gap-2">
        <MessageCircle size={14} strokeWidth={2.5} /> Ask my portfolio
      </p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('portfolio-chat:ask', { detail: prompt }))}
            className="rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-medium text-left transition-colors duration-150 hover:bg-sun"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
