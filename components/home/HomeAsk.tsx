'use client';

const prompts = [
  'What did he ship in co-lending?',
  'Which teardown should I read first?',
  'Which projects show hands-on AI work?',
];

export function HomeAsk() {
  return (
    <div className="ask">
      <p>Ask my portfolio</p>
      <div>
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('portfolio-chat:ask', { detail: prompt }))}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
