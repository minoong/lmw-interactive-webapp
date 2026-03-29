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
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: 'Overview', url: '#' },
        { title: 'Analytics', url: '#' },
        { title: 'Reports', url: '#' },
      ],
    },
    {
      title: 'AI Models',
      url: '#',
      icon: Bot,
      items: [
        { title: 'GPT-4', url: '#' },
        { title: 'Claude', url: '#' },
        { title: 'Gemini', url: '#' },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        { title: 'Introduction', url: '#' },
        { title: 'Get Started', url: '#' },
        { title: 'API Reference', url: '#' },
        { title: 'Changelog', url: '#' },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        { title: 'General', url: '#' },
        { title: 'Team', url: '#' },
        { title: 'Billing', url: '#' },
        { title: 'Notifications', url: '#' },
      ],
    },
  ],
  projects: [
    { name: 'Interactive Webapp', url: '#', icon: Frame },
    { name: 'Analytics Dashboard', url: '#', icon: PieChart },
    { name: 'Roadmap', url: '#', icon: Map },
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
