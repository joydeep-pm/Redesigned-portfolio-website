const tones = ['text-accent-primary', 'text-accent-secondary', 'text-accent-amber', 'text-text-primary'];

export function MetricCard({ number, label, index = 0 }: { number: string; label: string; index?: number }) {
  return (
    <div className="rounded-lg bg-white p-6 text-center transition-all duration-200 hover:scale-[1.02]">
      <div className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-2 ${tones[index % tones.length]}`}>
        {number}
      </div>
      <div className="text-xs text-text-muted uppercase tracking-wider font-semibold">{label}</div>
    </div>
  );
}
