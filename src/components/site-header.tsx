"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Globe } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/courses", label: "コース" },
  // 追加予定: { href: "/characters", label: "キャラクター" },
  // 追加予定: { href: "/about", label: "このサイトについて" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          <Link href="/" className="font-bold tracking-tight">
            MKWorld Wiki
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions: theme toggle and mobile menu button */}
        <div className="flex items-center gap-1">
          <ModeToggle />
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="メニュー"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden border-t bg-background transition-[max-height] duration-300 overflow-hidden",
          open ? "max-h-64" : "max-h-0"
        )}
      >
        <nav className="container mx-auto flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
