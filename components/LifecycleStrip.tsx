const stages = [
  {
    stage: 'Underwriting',
    proof: 'Real-time engine on 20+ parameters, approvals up 45%',
    where: 'Finvolv',
    tone: 'bg-pink',
  },
  {
    stage: 'Co-lending',
    proof: 'Multi-lender orchestration, $50M+ volume across 5 enterprise accounts',
    where: 'M2P Fintech',
    tone: 'bg-sun',
  },
  {
    stage: 'Disbursal',
    proof: '5 lending partners integrated, ₹1500Cr+ monthly disbursal capital',
    where: 'Paytm',
    tone: 'bg-mint',
  },
  {
    stage: 'Servicing',
    proof: 'UPI Autopay cut churn 10%, 500K+ active borrowers served',
    where: 'Paytm',
    tone: 'bg-sky',
  },
  {
    stage: 'Collections',
    proof: 'LMS, collections and rules engine live at 12+ institutions',
    where: 'Finvolv',
    tone: 'bg-lilac',
  },
];

export function LifecycleStrip() {
  return (
    <ol className="grid gap-4 md:grid-cols-5">
      {stages.map((s, i) => (
        <li key={s.stage} className={`relative rounded-lg border-[3px] border-ink p-5 shadow-pop ${s.tone}`}>
          <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="font-display text-xl font-extrabold tracking-tight mt-1 mb-2">{s.stage}</h3>
          <p className="text-sm leading-relaxed mb-3">{s.proof}</p>
          <span className="text-xs font-bold opacity-70">{s.where}</span>
        </li>
      ))}
    </ol>
  );
}
