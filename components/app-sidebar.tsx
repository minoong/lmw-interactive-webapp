'use client';

import * as React from 'react';

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'Minwoo Lee',
    email: 'minwoo@example.com',
    avatar: '',
  },
  teams: [
    {
      name: 'LMW Interactive',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Personal',
      logo: AudioWaveform,
      plan: 'Free',
    },
    {
      name: 'Side Project',
      logo: Command,
      plan: 'Startup',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: SquareTerminal,
      items: [
        { title: 'Overview', url: '/dashboard' },
        { title: 'Analytics', url: '/dashboard/analytics' },
        { title: 'Reports', url: '/dashboard/reports' },
      ],
    },
    {
      title: 'Ai Models',
      url: '/dashboard/models',
      icon: Bot,
      items: [
        { title: 'Gpt-4', url: '/dashboard/models/gpt-4' },
        { title: 'Claude', url: '/dashboard/models/claude' },
        { title: 'Gemini', url: '/dashboard/models/gemini' },
      ],
    },
    {
      title: 'Documentation',
      url: '/dashboard/docs',
      icon: BookOpen,
      items: [
        { title: 'Introduction', url: '/dashboard/docs/intro' },
        { title: 'Get Started', url: '/dashboard/docs/start' },
        { title: 'Api Reference', url: '/dashboard/docs/api' },
        { title: 'Changelog', url: '/dashboard/docs/changelog' },
      ],
    },
    {
      title: 'Settings',
      url: '/dashboard/settings',
      icon: Settings2,
      items: [
        { title: 'General', url: '/dashboard/settings/general' },
        { title: 'Team', url: '/dashboard/settings/team' },
        { title: 'Billing', url: '/dashboard/settings/billing' },
        { title: 'Notifications', url: '/dashboard/settings/notifications' },
      ],
    },
  ],
  projects: [
    { name: 'Interactive Webapp', url: '/dashboard/projects/webapp', icon: Frame },
    { name: 'Analytics Dashboard', url: '/dashboard/projects/analytics', icon: PieChart },
    { name: 'Roadmap', url: '/dashboard/projects/roadmap', icon: Map },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
