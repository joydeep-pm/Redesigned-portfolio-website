'use client';

import { useEffect, useRef } from 'react';

export function HomeEffects() {
  const barRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.oh');
    const bar = barRef.current;
    const cur = curRef.current;
    if (!root || !bar || !cur) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: Array<() => void> = [];
    root.classList.add('ready');
    cleanups.push(() => root.classList.remove('ready'));

    const count = (el: HTMLElement, prefix: string, value: number, suffix: string) => {
      let t0: number | null = null;
      const step = (t: number) => {
        if (t0 === null) t0 = t;
        const k = Math.min((t - t0) / 1200, 1);
        const e = 1 - Math.pow(1 - k, 3);
        el.innerHTML = `${prefix}${Math.round(value * e)}<em>${suffix}</em>`;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const t = entry.target as HTMLElement;
          t.classList.add('on');
          const n = t.querySelector<HTMLElement>('.n');
          if (n && !reduce) count(n, n.dataset.p ?? '', Number(n.dataset.v), n.dataset.s ?? '');
          t.querySelector('.vz')?.classList.add('go');
          if (t.querySelector('.tlbar')) {
            const bars = t.querySelector('.tlbar');
            setTimeout(() => bars?.classList.add('go'), 200);
          }
          io.unobserve(t);
        });
      },
      { threshold: 0.3 }
    );
    root.querySelectorAll('.in').forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    const sio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
            sio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    root.querySelectorAll('.split').forEach((el) => sio.observe(el));
    cleanups.push(() => sio.disconnect());

    const hs = document.getElementById('teardowns');
    const trk = document.getElementById('track');
    const hsSize = () => {
      if (!hs || !trk) return;
      if (window.innerWidth <= 900) {
        hs.style.removeProperty('--h');
        trk.style.transform = '';
        return;
      }
      const dist = trk.scrollWidth - window.innerWidth;
      hs.style.setProperty('--h', `${dist + window.innerHeight}px`);
      hs.dataset.dist = String(dist);
    };
    const hsMove = () => {
      if (!hs || !trk || window.innerWidth <= 900) return;
      const r = hs.getBoundingClientRect();
      const total = hs.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
      trk.style.transform = `translateX(${-p * Number(hs.dataset.dist || 0)}px)`;
    };
    const onResize = () => {
      hsSize();
      hsMove();
    };
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
      hsMove();
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onResize);
    document.fonts?.ready.then(onResize);
    hsSize();
    onScroll();
    cleanups.push(() => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('load', onResize);
      if (hs) hs.style.removeProperty('--h');
      if (trk) trk.style.transform = '';
    });

    if (window.matchMedia('(pointer:fine)').matches && !reduce) {
      root.classList.add('cur');
      let x = 0;
      let y = 0;
      let tx = 0;
      let ty = 0;
      let raf = 0;
      const onMove = (e: MouseEvent) => {
        tx = e.clientX;
        ty = e.clientY;
        cur.classList.add('on');
      };
      const loop = () => {
        x += (tx - x) * 0.2;
        y += (ty - y) * 0.2;
        cur.style.transform = `translate(${x}px,${y}px)`;
        raf = requestAnimationFrame(loop);
      };
      const onOver = (e: MouseEvent) => {
        const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]');
        if (t) {
          cur.textContent = t.dataset.cursor ?? '';
          cur.classList.add('big');
        } else {
          cur.textContent = '';
          cur.classList.remove('big');
        }
      };
      window.addEventListener('mousemove', onMove);
      document.addEventListener('mouseover', onOver);
      raf = requestAnimationFrame(loop);

      const magnets: Array<() => void> = [];
      root.querySelectorAll<HTMLElement>('.btn').forEach((b) => {
        const move = (e: MouseEvent) => {
          const r = b.getBoundingClientRect();
          b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
        };
        const leave = () => {
          b.style.transform = '';
        };
        b.addEventListener('mousemove', move);
        b.addEventListener('mouseleave', leave);
        magnets.push(() => {
          b.removeEventListener('mousemove', move);
          b.removeEventListener('mouseleave', leave);
          b.style.transform = '';
        });
      });

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseover', onOver);
        magnets.forEach((fn) => fn());
        root.classList.remove('cur');
        cur.classList.remove('on', 'big');
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div className="bar" ref={barRef} />
      <div className="cursor" ref={curRef} />
    </>
  );
}
