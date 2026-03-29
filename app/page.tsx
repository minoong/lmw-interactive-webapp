'use client';

import { motion } from 'framer-motion';
import { Activity, TrendingUp, Zap } from 'lucide-react';

import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const stats = [
  {
    title: 'Active Users',
    value: '128',
    description: '지난 30일 대비',
    change: '+14.2%',
    icon: Activity,
  },
  {
    title: 'Total Events',
    value: '2.4K',
    description: '이번 달 누적',
    change: '+20.1%',
    icon: TrendingUp,
  },
  {
    title: 'Uptime',
    value: '99.9%',
    description: '최근 90일 기준',
    change: 'Stable',
    icon: Zap,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <motion.main
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col gap-4 p-4 pt-0"
        >
          {/* Header Section */}
          <div className="flex flex-col gap-1 py-4">
            <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
            <p className="text-muted-foreground text-sm">시스템 현황 및 활동 요약</p>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {stats.map((stat) => (
              <motion.div key={stat.title} variants={item}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardDescription className="text-xs font-medium tracking-wider uppercase">
                      {stat.title}
                    </CardDescription>
                    <stat.icon className="text-muted-foreground size-4" aria-hidden="true" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="sr-only">상태: {stat.change}</p>
                      <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-semibold">
                        {stat.change}
                      </Badge>
                      <span className="text-muted-foreground text-xs">{stat.description}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Separator className="my-2" />

          {/* Content area */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">시스템 알림</CardTitle>
                <CardDescription>최근 업데이트 및 공지사항</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      레이아웃이 깔끔한 스타일로 변경되었습니다. 사이드바와 헤더가 유기적으로
                      작동하며, 모든 기기에서 최적화된 화면을 제공합니다. 다크 모드와 라이트 모드가
                      시스템 설정에 맞춰 자동으로 전환됩니다.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">반응형</Badge>
                      <Badge variant="outline">다크모드 지원</Badge>
                      <Badge variant="outline">Next.js 16</Badge>
                    </div>
                  </div>
                  <div className="bg-muted/50 flex aspect-video items-center justify-center rounded-lg border border-dashed text-xs">
                    <span className="text-muted-foreground">데이터 시각화 영역</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.main>
      </SidebarInset>
    </SidebarProvider>
  );
}
