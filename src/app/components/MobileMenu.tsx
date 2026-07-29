"use client";

import Link from "next/link";
import { Button } from "./ui/Button";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: Array<{ href: string; label: string }>;
  locale: string;
  menuLabel: string;
  authorName: string;
  authorBio: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navigationItems,
  locale,
  menuLabel,
  authorName,
  authorBio,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const dir = locale === "ar" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    menuRef.current.querySelector<HTMLElement>("button, [href]")?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, mounted]);

  if (!mounted) return null;

  // RTL-aware positioning
  const drawerPosition = isRTL
    ? "fixed top-0 left-0 h-screen w-80 max-w-full z-50 md:hidden transform transition-all duration-300 ease-out"
    : "fixed top-0 right-0 h-screen w-80 max-w-full z-50 md:hidden transform transition-all duration-300 ease-out";

  const drawerTranslate = isOpen
    ? "translate-x-0"
    : isRTL ? "-translate-x-full" : "translate-x-full";

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden animate-in fade-in duration-300" onClick={() => onClose()} aria-hidden="true" />
      )}
      <div ref={menuRef} className={`${drawerPosition} ${drawerTranslate}`} role="dialog" aria-modal="true" aria-label={menuLabel}>
        <div className="flex flex-col h-full bg-background/80 backdrop-blur-3xl border-l border-white/20 shadow-2xl shadow-black/30">
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{menuLabel}</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2 hover:bg-white/10 transition-all duration-200 rounded-xl border border-white/10 hover:border-white/20" aria-label="Close menu">
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="flex-1 p-6">
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Button variant="ghost" size="md" asChild className="w-full justify-center text-base font-semibold py-4 px-4 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 rounded-xl border border-transparent hover:border-white/10 hover:shadow-lg group" onClick={onClose}>
                    <Link href={item.href} className="group-hover:text-primary transition-colors duration-300">{item.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-6 border-t border-white/10 bg-white/5">
            <div className="text-sm text-foreground/60 text-center">
              <p>{authorName}</p>
              <p className="text-xs mt-1">{authorBio}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
