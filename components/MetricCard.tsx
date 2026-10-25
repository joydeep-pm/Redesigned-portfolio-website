const tones = ['bg-pink -rotate-1', 'bg-mint rotate-1', 'bg-sky -rotate-1', 'bg-sun rotate-1'];

export function MetricCard({
  number,
  label,
  context,
  index = 0,
}: {
  number: string;
  label: string;
  context?: string;
  index?: number;
}) {
  return (
    <div
      className={`rounded-lg border-[3px] border-ink p-5 shadow-pop transition-transform duration-150 hover:-translate-y-1 ${tones[index % tones.length]}`}
    >
      <div className="font-display text-4xl md:text-5xl font-extrabold leading-none tracking-tight">{number}</div>
      <div className="mt-2 text-sm font-medium">{label}</div>
      <div className="mt-1 min-h-[1.25rem] text-xs font-bold opacity-70">{context}</div>
    </div>
  );
}
