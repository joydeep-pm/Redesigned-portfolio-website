import type { CSSProperties, ReactNode } from 'react';

type Part = string | { mark: string };

export function Split({
  as: Tag = 'h2',
  className = 'h2',
  style,
  parts,
  lightMark = false,
}: {
  as?: 'h1' | 'h2';
  className?: string;
  style?: CSSProperties;
  parts: Part[];
  lightMark?: boolean;
}) {
  let d = 0;
  const out: ReactNode[] = [];

  parts.forEach((part, pi) => {
    if (typeof part === 'string') {
      part.split(/(\s+)/).forEach((token, ti) => {
        if (!token) return;
        if (/^\s+$/.test(token)) {
          out.push(' ');
          return;
        }
        out.push(
          <span className="w" key={`${pi}-${ti}`}>
            <span style={{ transitionDelay: `${d++ * 70}ms` }}>{token}</span>
          </span>
        );
      });
      return;
    }
    out.push(
      <span className="w" key={`${pi}-m`}>
        <span style={{ transitionDelay: `${d++ * 70}ms` }}>
          <mark className={lightMark ? 'lt' : undefined}>{part.mark}</mark>
        </span>
      </span>
    );
  });

  return (
    <Tag className={`${className} split`} style={style}>
      {out}
    </Tag>
  );
}
