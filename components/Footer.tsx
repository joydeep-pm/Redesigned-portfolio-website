import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

const links = [
  { href: 'mailto:joytdh@gmail.com', label: 'Email', icon: Mail },
  { href: 'https://www.linkedin.com/in/joydeepsarkar1987/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/joydeep-pm', label: 'GitHub', icon: Github },
  { href: 'https://x.com/joytdh', label: 'X', icon: Twitter },
];

export function Footer() {
  return (
    <footer id="contact" className="mt-20 border-t-[3px] border-ink bg-lilac">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="eyebrow mb-3">Contact</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.02] mb-4">
              Let&apos;s talk lending products.
            </h2>
            <p className="text-lg max-w-md">Open to advisory work and select leadership conversations in fintech and lending.</p>
          </div>

          <div className="flex flex-wrap gap-3 md:justify-end">
            {links.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="pop-btn"
              >
                <Icon size={16} strokeWidth={2.5} /> {label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t-[3px] border-ink">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between text-sm font-medium">
          <span>© {new Date().getFullYear()} Joydeep Sarkar</span>
          <span>Bengaluru, India</span>
        </div>
      </div>
    </footer>
  );
}
