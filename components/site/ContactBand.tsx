import fs from 'fs';
import path from 'path';
import { SAME_AS } from '@/lib/site';
import { Split } from '@/components/home/Split';

const resumeHref = fs.existsSync(path.join(process.cwd(), 'public', 'resume.pdf')) ? '/resume.pdf' : SAME_AS[0];

export function ContactBand() {
  return (
    <section className="slide cta dark" id="contact">
      <div className="wrap">
        <p className="eyebrow">Contact</p>
        <Split className="" parts={['Have a product worth ', { mark: 'building' }, '?']} lightMark />
        <div className="row">
          <a className="btn" href="mailto:joytdh@gmail.com">
            Email me
          </a>
          <a className="btn" href={SAME_AS[0]} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="btn" href={SAME_AS[1]} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="btn" href="https://x.com/joytdh" target="_blank" rel="noopener noreferrer">
            X
          </a>
          <a className="btn" href={resumeHref}>
            Resume
          </a>
        </div>
        <div className="foot">
          <span>&copy; {new Date().getFullYear()} Joydeep Sarkar</span>
          <span>Bengaluru, India</span>
        </div>
      </div>
    </section>
  );
}
