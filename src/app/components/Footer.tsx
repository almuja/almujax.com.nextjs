"use client";

import Image from "next/image";
import { ExternalLink, Heart, Send } from "lucide-react";
import { Button } from "./ui/Button";
import { useState } from "react";
import { submitContactForm } from "../actions/contact";

interface FooterProps {
  locale: string;
  footer: {
    connect: string; connectDescription: string; getInTouch: string; quickMessage: string;
    namePlaceholder: string; emailPlaceholder: string; subjectPlaceholder: string; messagePlaceholder: string;
    sendMessage: string; sending: string; copyright: string; builtWith: string; and: string; openSource: string;
    tagline: string; errorMessage: string;
  };
  authorBio: string;
  authorName: string;
}

export default function Footer({ footer: t, authorBio, authorName }: FooterProps) {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setMsg(null); setPending(true);
    try {
      const result = await submitContactForm(formData);
      if (result.success) { setMsg({ ok: true, text: result.message }); const f = document.querySelector("form") as HTMLFormElement; if (f) f.reset(); }
      else setMsg({ ok: false, text: result.message });
    } catch { setMsg({ ok: false, text: t.errorMessage }); }
    finally { setPending(false); }
  }

  return (
    <footer className="relative overflow-hidden border-t border-border/30 bg-card/20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left — Connect */}
          <div className="md:order-1 order-2 text-center md:text-left">
            <h3 className="font-bold text-foreground mb-6 text-lg tracking-wide">{t.connect}</h3>
            <p className="text-foreground/40 mb-6 text-sm leading-relaxed">{t.connectDescription}</p>
            <Button variant="outline" size="lg" asChild className="w-full md:w-auto border-border/50 hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-300 px-8 py-6 mx-auto md:mx-0 h-auto rounded-2xl">
              <a href="mailto:hello@itsmawja.com" className="inline-flex items-center gap-3 text-sm font-semibold">
                {t.getInTouch}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Center — Brand */}
          <div className="md:order-2 order-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg mb-4">
                <Image src="/img/profile.png" alt={authorName} width={80} height={80} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="mb-4">
                <span className="text-xl font-bold text-foreground block">{authorName}</span>
                <p className="text-xs text-foreground/40 mt-1">{authorBio}</p>
              </div>
              <p className="text-foreground/35 max-w-sm text-sm leading-relaxed mb-6">{t.tagline}</p>
              <div className="flex gap-4 justify-center">
                {[
                  { name: "GitHub", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>, url: "https://github.com/itsmawja" },
                  { name: "LinkedIn", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, url: "https://linkedin.com/in/itsmawja" },
                  { name: "Email", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>, url: "mailto:hello@itsmawja.com" },
                ].map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="p-3 text-foreground/30 hover:text-primary transition-all duration-300 hover:bg-primary/[0.05] rounded-xl" aria-label={social.name}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Quick Message */}
          <div className="md:order-3 order-3">
            <h3 className="font-bold text-foreground mb-6 text-lg tracking-wide text-center md:text-left">{t.quickMessage}</h3>
            {msg && (
              <div className={`mb-4 p-3 rounded-xl text-xs ${msg.ok ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600" : "bg-red-500/10 border border-red-500/20 text-red-600"}`}>
                {msg.text}
              </div>
            )}
            <form action={handleSubmit} className="space-y-3">
              <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <input type="text" name="name" placeholder={t.namePlaceholder} required className="w-full px-4 py-2.5 bg-background border border-border text-foreground placeholder:text-foreground/15 rounded-xl text-sm focus:outline-none focus:border-primary/30 transition-all text-center placeholder:text-center" />
              <input type="email" name="email" placeholder={t.emailPlaceholder} required className="w-full px-4 py-2.5 bg-background border border-border text-foreground placeholder:text-foreground/15 rounded-xl text-sm focus:outline-none focus:border-primary/30 transition-all text-center placeholder:text-center" />
              <input type="text" name="subject_line" placeholder={t.subjectPlaceholder} required className="w-full px-4 py-2.5 bg-background border border-border text-foreground placeholder:text-foreground/15 rounded-xl text-sm focus:outline-none focus:border-primary/30 transition-all text-center placeholder:text-center" />
              <textarea name="message" placeholder={t.messagePlaceholder} rows={3} required className="w-full px-4 py-2.5 bg-background border border-border text-foreground placeholder:text-foreground/15 rounded-xl text-sm focus:outline-none focus:border-primary/30 transition-all resize-none text-center placeholder:text-center" />
              <Button type="submit" variant="default" size="lg" disabled={pending} className="w-full bg-foreground text-background shadow-lg hover:shadow-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group py-8 rounded-2xl hover:scale-[1.01]">
                {pending ? (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-6 h-6 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    <span>{t.sending}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-3">
                    <Send className="w-5 h-5" />
                    <span>{t.sendMessage}</span>
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <div className="text-xs text-foreground/25 order-2 md:order-1">
              &copy; {new Date().getFullYear()} {authorName}. {t.copyright}
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground/25 order-1 md:order-2">
              <span>{t.builtWith}</span>
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              <span>{t.and}</span>
              <span className="text-foreground/40 font-medium">{t.openSource}</span>
            </div>
            <div className="flex gap-2 order-3">
              {["Linux", "Rust", "AI/ML", "DevSecOps"].map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-muted/30 text-foreground/25 text-xs rounded-lg border border-border/30 hover:border-primary/20 hover:text-primary/60 transition-all duration-300">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
