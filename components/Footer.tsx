import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

const links = [
  { href: 'mailto:joytdh@gmail.com', label: 'Email', icon: Mail },
  { href: 'https://www.linkedin.com/in/joydeepsarkar1987/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/joydeep-pm', label: 'GitHub', icon: Github },
  { href: 'https://x.com/joytdh', label: 'Twitter', icon: Twitter },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-3">Contact</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Let&apos;s build lending products that scale.
            </h2>
            <p className="text-white/80 max-w-xl">
              Open to product leadership roles, advisory engagements, and fintech operating discussions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:justify-self-end">
            {links.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="h-14 px-4 rounded-md bg-white text-bg-dark hover:bg-accent-amber hover:text-bg-dark transition-all duration-200 hover:scale-105 inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wider text-xs"
              >
                <Icon size={16} strokeWidth={2.5} /> {label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t-2 border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-xs uppercase tracking-wider text-white/70">
          <span>© {new Date().getFullYear()} Joydeep Sarkar</span>
          <span>Bengaluru, India</span>
        </div>
      </div>
    </footer>
  );
}
