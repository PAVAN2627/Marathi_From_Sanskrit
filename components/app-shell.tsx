'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GitBranch,
  Clock,
  ScrollText,
  Database,
  Languages,
  BarChart3,
  GitCompare,
  Info,
  Cpu,
  Settings,
  Search,
  FileText,
  FlaskConical,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Reconstruction', href: '/reconstruction', icon: GitBranch },
  { label: 'Historical Explorer', href: '/historical-explorer', icon: Clock },
  { label: 'Transformation Rules', href: '/transformation-rules', icon: ScrollText },
  { label: 'Lexical Dataset', href: '/lexical-dataset', icon: Database },
  { label: 'Semantic Drift', href: '/semantic-drift', icon: Languages },
  { label: 'Research Analytics', href: '/research-analytics', icon: BarChart3 },
  { label: 'Model Comparison', href: '/model-comparison', icon: GitCompare },
  { label: 'About Research', href: '/about', icon: Info },
  { label: 'Architecture', href: '/architecture', icon: Cpu },
];

function NavLogo() {
  return (
    <div className="flex items-center gap-2.5 px-3 py-1">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
        <FlaskConical className="h-5 w-5 text-primary-foreground" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-bold tracking-tight text-foreground">MAR-EVO-XAI</span>
        <span className="text-[10px] text-muted-foreground">Marathi Evolution · Explainable AI</span>
      </div>
    </div>
  );
}

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card/50 backdrop-blur-sm fixed inset-y-0 left-0 z-40">
      <div className="py-5 px-2 border-b border-border">
        <NavLogo />
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border px-4 py-4 space-y-3">
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-semibold text-amber-800">Prototype Mode</span>
          </div>
          <p className="text-[10px] text-amber-700 mt-1">Using Mock Research Data</p>
        </div>
        <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}

function TopBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const breadcrumb = navItems.find((n) => n.href === pathname)?.label ?? 'MAR-EVO-XAI';

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">MAR-EVO-XAI</span>
            <span className="text-muted-foreground/40">/</span>
            <span className="font-medium text-foreground">{breadcrumb}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 w-56">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="Search lexicon, rules..."
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground/60"
            />
            <kbd className="text-[10px] text-muted-foreground border border-border rounded px-1">⌘K</kbd>
          </div>
          <button className="hidden sm:flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <FileText className="h-3.5 w-3.5" />
            Docs
          </button>
          <span className="prototype-badge hidden sm:inline-flex">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Prototype
          </span>
        </div>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-y-0 left-0 w-72 bg-card border-r border-border p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <NavLogo />
              <button onClick={() => setMobileOpen(false)} className="p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-semibold text-amber-800">Prototype Mode</span>
              </div>
              <p className="text-[10px] text-amber-700 mt-1">Using Mock Research Data</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MobileBottomNav() {
  const pathname = usePathname();
  const items = navItems.slice(0, 5);
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 flex items-center justify-around border-t border-border bg-background/95 backdrop-blur-md px-2 py-1.5">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors',
              active ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="truncate max-w-[60px]">{item.label.split(' ')[0]}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <TopBar />
        <main className="px-4 lg:px-8 py-6 pb-20 lg:pb-8 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
