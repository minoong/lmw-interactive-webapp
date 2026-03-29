'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { ArrowRight, LayoutDashboard, Sparkles, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function IntroPage() {
  return (
    <main className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-primary/10 h-[400px] w-[400px] rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="z-10 flex max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-muted/50 mb-8 flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
        >
          <Sparkles className="text-primary size-4" />
          <span>LMW Interactive Webapp v1.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl"
        >
          현대적인 <span className="text-primary italic">데이터</span> 시각화의 새로운 표준
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground mt-6 text-lg leading-relaxed"
        >
          반응형 디자인과 부드러운 애니메이션이 결합된 강력한 인터랙티브 웹 앱입니다. 모든 기기에서
          최적화된 대시보드를 지금 경험해 보세요.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
            <Link href="/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="size-5" />
              대시보드 시작하기
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base font-semibold">
            문서 보기
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <Zap className="size-5" />
            </div>
            <span className="text-sm font-medium">부드러운 성능</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <LayoutDashboard className="size-5" />
            </div>
            <span className="text-sm font-medium">직관적인 레이아웃</span>
          </div>
          <div className="col-span-2 flex flex-col items-center gap-2 md:col-span-1">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <Sparkles className="size-5" />
            </div>
            <span className="text-sm font-medium">세련된 디자인</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
