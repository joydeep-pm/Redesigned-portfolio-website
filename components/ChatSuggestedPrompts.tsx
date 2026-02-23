interface Props {
  prompts: string[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
  compact?: boolean;
}

export function ChatSuggestedPrompts({ prompts, onSelect, disabled, compact = false }: Props) {
  if (!prompts.length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${compact ? '' : 'mt-3'}`}>
      {prompts.map((prompt, i) => (
        <button
          key={`${prompt}-${i}`}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className="rounded-full px-3 py-2 bg-bg-muted hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-left"
        >
          <span className="text-xs text-text-primary font-medium">{prompt}</span>
        </button>
      ))}
    </div>
  );
}
