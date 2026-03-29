'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, LayoutDashboard, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function NightSky() {
  const [stars, setStars] = useState<
    { id: number; top: string; left: string; size: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    // Generate random stars on the client to prevent SSR hydration mismatches.
    // Delayed to avoid the synchronous setState effect warning.
    const timeoutId = setTimeout(() => {
      const generated = Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      }));
      setStars(generated);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="absolute inset-0 z-[-45] h-full w-full overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Milky Way Flow Effect with Vivid Framer Motion */}
      <motion.div
        className="pointer-events-none absolute top-[10%] left-[-20%] h-[50%] w-[140%] rounded-full bg-blue-400/50 mix-blend-screen blur-[60px] will-change-transform"
        initial={{ rotate: -15, x: '-10%', y: '-5%' }}
        animate={{ x: ['-10%', '10%', '-10%'], y: ['-5%', '5%', '-5%'], rotate: -15 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute top-[20%] left-[-10%] h-[40%] w-[120%] rounded-full bg-purple-500/50 mix-blend-screen blur-[80px] will-change-transform"
        initial={{ rotate: -15, x: '-5%', y: '5%' }}
        animate={{ x: ['-5%', '15%', '-5%'], y: ['5%', '-5%', '5%'], rotate: -15 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="pointer-events-none absolute top-[30%] left-[-10%] h-[20%] w-[120%] rounded-full bg-indigo-500/50 mix-blend-screen blur-[70px] will-change-transform"
        initial={{ rotate: -15, x: '0%', y: '0%' }}
        animate={{ x: ['0%', '-20%', '0%'], y: ['0%', '10%', '0%'], rotate: -15 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  );
}

export default function IntroPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const shadowMoonRef = useRef<SVGCircleElement>(null);
  const mountainBackRef = useRef<SVGSVGElement>(null);
  const mountainMidRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    // We animate the elements inside the sticky hero while the page naturally scrolls.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: '+=100%', // Animate over the first 100vh of scroll
        scrub: 1,
      },
    });

    // The moon moves slightly up and fades a tiny bit
    tl.to(moonRef.current, { y: -150, opacity: 0.8, ease: 'none' }, 0);
    // The mask slides left over the moon, eclipsing it into a crescent
    tl.to(shadowMoonRef.current, { attr: { cx: 65 }, ease: 'none' }, 0);
    // The main title moves up fast
    tl.to(titleRef.current, { y: -300, scale: 1.1, opacity: 0, ease: 'none' }, 0);
    // Back mountains move down slightly (simulating immense distance)
    tl.to(mountainBackRef.current, { y: 150, ease: 'none' }, 0);
    // Mid mountains move down but slower than back
    tl.to(mountainMidRef.current, { y: 80, ease: 'none' }, 0);

    // Animate the actual content fading in as it enters
    gsap.from('.content-fade', {
      scrollTrigger: {
        trigger: '#content',
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1,
      },
      y: 100,
      opacity: 0,
      stagger: 0.2,
      ease: 'power2.out',
    });
  }, []);

  return (
    <main className="relative min-h-[200vh] w-full overflow-x-hidden bg-transparent text-slate-50">
      {/* 
        HERO SECTION (FIXED / STICKY)
        This stays in the background while the content below scrolls over it.
      */}
      <div ref={heroRef} className="fixed top-0 left-0 -z-10 h-screen w-full overflow-hidden">
        {/* Sky Background */}
        <div className="absolute inset-0 -z-50 bg-linear-to-b from-[#020617] via-[#0B1221] to-[#1e1b4b]" />

        {/* Animated Stars & Milky Way */}
        <NightSky />

        {/* Moon Glow */}
        <div className="absolute top-[20%] left-1/2 -z-40 h-[50vmin] w-[50vmin] -translate-x-1/2 rounded-full bg-blue-400/20 blur-[120px]" />

        {/* The Moon & Eclipse Mask */}
        <div
          ref={moonRef}
          className="absolute top-[15%] left-1/2 -z-30 h-[25vmin] w-[25vmin] -translate-x-1/2 rounded-full shadow-[0_0_80px_rgba(200,220,255,0.8)]"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <mask id="moon-mask">
                <rect x="0" y="0" width="100" height="100" fill="white" />
                <circle ref={shadowMoonRef} cx="150" cy="40" r="50" fill="black" />
              </mask>
            </defs>
            <circle cx="50" cy="50" r="50" fill="#f1f5f9" mask="url(#moon-mask)" />
          </svg>
        </div>

        {/* Back Mountains Layer */}
        <svg
          ref={mountainBackRef}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-0 -z-20 h-[50vh] w-full fill-[#1e1b4b]"
        >
          <path d="M0,160L80,138.7C160,117,320,75,480,90.7C640,107,800,181,960,186.7C1120,192,1280,128,1360,96L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>

        {/* Parallax Title (Between Mountains) */}
        <h1
          ref={titleRef}
          className="absolute top-[40%] z-10 w-full text-center text-[12vw] font-black tracking-tighter text-white drop-shadow-2xl select-none sm:text-[10vw]"
        >
          INTERACTIVE
        </h1>

        {/* Mid Mountains Layer */}
        <svg
          ref={mountainMidRef}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-0 z-20 h-[35vh] w-full fill-[#0f172a]"
        >
          <path d="M0,224L60,202.7C120,181,240,139,360,149.3C480,160,600,224,720,240C840,256,960,224,1080,176C1200,128,1320,64,1380,32L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>
      </div>

      {/* 
        CONTENT SECTION (SCROLLABLE)
        Starts 100vh down, naturally scrolls over the sticky hero.
      */}
      <div
        id="content"
        className="relative z-30 mt-[100vh] min-h-screen w-full bg-[#020617] pt-[20vh] pb-32"
      >
        {/* Front Foreground Mask (Seamlessly blends into the content bg) */}
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute -top-[20vw] left-0 h-[20vw] w-full scale-105 fill-[#020617]"
        >
          <path d="M0,32L80,69.3C160,107,320,181,480,197.3C640,213,800,171,960,138.7C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>

        <div className="relative z-40 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <div className="content-fade mb-10 flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-6 py-2 text-sm font-medium backdrop-blur-md">
            <Sparkles className="size-4 text-blue-400" />
            <span className="text-slate-300">경험의 한계를 넘는 데이터 시각화</span>
          </div>

          <h2 className="content-fade mb-8 text-4xl font-extrabold tracking-tight sm:text-6xl">
            모든 기기에서 <br />
            <span className="bg-linear-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
              최적화된 퍼포먼스
            </span>
          </h2>

          <p className="content-fade mb-14 max-w-2xl text-xl leading-relaxed text-slate-400">
            단순한 도구를 넘어, 하나의 살아숨쉬는 인터랙티브 예술 작품. 극대화된 사용자 경험(UX)과
            부드러운 애니메이션 엔진을 기반으로, 당신의 데이터를 가장 아름답게 표현할 준비가
            되었습니다.
          </p>

          <Button
            asChild
            size="lg"
            className="content-fade group h-14 rounded-full bg-white px-10 text-lg font-bold text-slate-950 hover:bg-slate-200"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="size-5" />
              대시보드 접속하기
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
