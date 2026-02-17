'use client';

import { useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const HeroThreeScene = dynamic(
  () => import('./HeroThreeScene').then((mod) => mod.HeroThreeScene),
  { ssr: false }
);

export function HeroPortrait() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const imageOffsetX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 170,
    damping: 22,
  });
  const imageOffsetY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), {
    stiffness: 170,
    damping: 22,
  });

  const frameOffsetX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 170,
    damping: 22,
  });
  const frameOffsetY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-3, 3]), {
    stiffness: 170,
    damping: 22,
  });

  useGSAP(
    () => {
      if (sweepRef.current) {
        gsap.fromTo(
          sweepRef.current,
          { xPercent: -140 },
          { xPercent: 230, duration: 6.8, ease: 'none', repeat: -1, repeatDelay: 2.8 }
        );
      }

      gsap.to('.hero-panel', {
        y: -2,
        duration: 3.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: scopeRef }
  );

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={scopeRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative max-w-md lg:ml-auto"
    >
      <div className="absolute -inset-12 -z-10 opacity-45 pointer-events-none">
        <HeroThreeScene />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="hero-panel relative rounded-lg bg-white/95 p-3 border-2 border-white"
      >
        <motion.div style={{ x: frameOffsetX, y: frameOffsetY }} className="relative overflow-hidden rounded-md aspect-[4/5] bg-[#d1d5db]">
          <motion.div style={{ x: imageOffsetX, y: imageOffsetY }} className="absolute inset-0">
            <Image
              src="/images/joydeep.png"
              alt="Joydeep Sarkar"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#111827d9] via-transparent to-transparent" />
          <div className="absolute inset-0 border-2 border-white/45 rounded-md pointer-events-none" />
          <div ref={sweepRef} className="absolute inset-y-0 w-12 bg-white/20 pointer-events-none" />

          <div className="absolute left-4 right-4 bottom-4 text-white">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/80 mb-1">Director of Product</p>
            <p className="text-lg font-semibold tracking-tight">Joydeep Sarkar</p>
            <p className="text-xs text-white/80">Lending Infrastructure • Fintech Strategy</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
