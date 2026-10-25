const stages = [
  {
    stage: 'Underwriting',
    proof: 'Real-time engine on 20+ parameters, approvals up 45%',
    where: 'Finvolv',
  },
  {
    stage: 'Co-lending',
    proof: 'Multi-lender orchestration, $50M+ volume across 5 enterprise accounts',
    where: 'M2P Fintech',
  },
  {
    stage: 'Disbursal',
    proof: '5 lending partners integrated, ₹1500Cr+ monthly disbursal capital',
    where: 'Paytm',
  },
  {
    stage: 'Servicing',
    proof: 'UPI Autopay cut churn 10%, 500K+ active borrowers served',
    where: 'Paytm',
  },
  {
    stage: 'Collections',
    proof: 'LMS, collections and rules engine live at 12+ institutions',
    where: 'Finvolv',
  },
];

export function LifecycleStrip() {
  return (
    <ol className="grid gap-4 md:grid-cols-5">
      {stages.map((s, i) => (
        <li key={s.stage} className="relative rounded-lg bg-bg-muted p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-primary">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="text-xl font-extrabold tracking-tight text-text-primary mt-1 mb-2">{s.stage}</h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">{s.proof}</p>
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">{s.where}</span>
          {i < stages.length - 1 && (
            <span
              aria-hidden
              className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-accent-primary font-extrabold z-10"
            >
              &rarr;
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
