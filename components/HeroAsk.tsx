'use client';

import { MessageCircle } from 'lucide-react';

const prompts = [
  'What did he ship in co-lending?',
  'Which case study should I read first?',
  'Which projects show hands-on AI work?',
];

export function HeroAsk() {
  return (
    <div className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-3 inline-flex items-center gap-2">
        <MessageCircle size={14} strokeWidth={2.5} /> Ask my portfolio
      </p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('portfolio-chat:ask', { detail: prompt }))}
            className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-sm font-medium transition-colors duration-200 text-left"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
