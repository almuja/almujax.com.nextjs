"use client";

import { useEffect } from "react";

interface DirManagerProps {
  locale: string;
}

export default function DirManager({ locale }: DirManagerProps) {
  useEffect(() => {
    const lang = locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en";
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [locale]);

  return null;
}
