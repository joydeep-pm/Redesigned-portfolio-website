import { MessageCircle } from 'lucide-react';

interface Props {
  onOpen: () => void;
  shouldPulse?: boolean;
}

export function ChatLauncher({ onOpen, shouldPulse = false }: Props) {
  return (
    <div className="relative">
      {shouldPulse && <span className="absolute inset-0 rounded-full bg-accent-primary/30 animate-ping" />}
      <button
        type="button"
        onClick={onOpen}
        className="relative h-16 w-16 rounded-full bg-accent-primary text-white border-4 border-white hover:bg-blue-600 transition-all duration-200 hover:scale-105 flex items-center justify-center"
        aria-label="Open portfolio concierge chat"
      >
        <MessageCircle size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
}
