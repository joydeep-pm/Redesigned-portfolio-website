import type { ChatCitation } from '@/lib/rag/types';
import { ChatCitations } from './ChatCitations';

interface Props {
  role: 'user' | 'assistant';
  content: string;
  citations?: ChatCitation[];
}

export function ChatMessageBubble({ role, content, citations = [] }: Props) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[90%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={[
            'rounded-lg px-4 py-3 border-2',
            isUser
              ? 'bg-accent-primary text-white border-accent-primary'
              : 'bg-white text-text-primary border-border-default',
          ].join(' ')}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        {!isUser && citations.length > 0 && <div className="w-full"><ChatCitations citations={citations} /></div>}
      </div>
    </div>
  );
}
