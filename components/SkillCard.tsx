import { ReactNode } from 'react';

interface Props {
  title: string;
  description: ReactNode;
  icon: ReactNode;
}

export function SkillCard({ title, description, icon }: Props) {
  return (
    <div className="group cursor-pointer rounded-lg bg-white p-8 transition-all duration-200 hover:scale-[1.02]">
      <div className="h-14 w-14 rounded-full bg-bg-muted text-accent-primary group-hover:scale-110 transition-transform duration-200 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-extrabold tracking-tight text-text-primary mb-3">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}
