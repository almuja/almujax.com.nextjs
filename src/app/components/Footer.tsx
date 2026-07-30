"use client";

import Image from "next/image";
import { Code2, LinkIcon, Mail, ExternalLink, Heart, Send } from "lucide-react";
import { Button } from "./ui/Button";
import { useState } from "react";
import { submitContactForm } from "../actions/contact";

interface FooterProps {
  locale: string;
  footer: {
    connect: string;
    connectDescription: string;
    getInTouch: string;
    quickMessage: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    sendMessage: string;
    sending: string;
    copyright: string;
    builtWith: string;
    and: string;
    openSource: string;
    tagline: string;
    errorMessage: string;
  };
  authorBio: string;
  authorName: string;
}

export default function Footer({ footer: t, authorBio, authorName }: FooterProps) {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setMsg(null);
    setPending(true);
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setMsg({ ok: true, text: result.message });
        const form = document.querySelector("form") as HTMLFormElement;
        if (form) form.reset();
      } else {
        setMsg({ ok: false, text: result.message });
      }
    } catch {
      setMsg({ ok: false, text: t.errorMessage });
    } finally {
      setPending(false);
    }
  }

  return (
    <footer className="relative overflow-hidden backdrop-blur-2xl bg-background/30 border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="md:order-1 order-2 text-center md:text-left">
            <h3 className="font-bold text-foreground mb-6 text-lg tracking-wide">{t.connect}</h3>
            <p className="text-muted-foreground mb-6 text-base leading-relaxed">{t.connectDescription}</p>
            <Button variant="outline" size="lg" asChild className="w-full md:w-auto border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 px-8 py-6 mx-auto md:mx-0 h-auto">
              <a href="mailto:hello@itsmawja.com" className="inline-flex items-center gap-3 text-base font-medium">
                {t.getInTouch}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>

          <div className="md:order-2 order-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 shadow-lg mb-4">
                <Image src="/img/profile.png" alt={authorName} width={80} height={80} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="mb-4">
                <span className="text-2xl font-bold text-foreground block">{authorName}</span>
                <p className="text-sm text-muted-foreground mt-1">{authorBio}</p>
              </div>
              <p className="text-muted-foreground max-w-sm text-base leading-relaxed mb-6">{t.tagline}</p>
              <div className="flex gap-4 justify-center">
                {[
                  { name: "GitHub", icon: Code2, url: "https://github.com/itsmawja" },
                  { name: "LinkedIn", icon: LinkIcon, url: "https://linkedin.com/in/itsmawja" },
                  { name: "Email", icon: Mail, url: "mailto:hello@itsmawja.com" },
                ].map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="p-3 text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-white/10 rounded-xl backdrop-blur-sm" aria-label={social.name}>
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:order-3 order-3">
            <h3 className="font-bold text-foreground mb-6 text-lg tracking-wide text-center md:text-left">{t.quickMessage}</h3>
            {msg && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${msg.ok ? "bg-green-500/10 border border-green-500/20 text-green-600" : "bg-red-500/10 border border-red-500/20 text-red-600"}`}>
                {msg.text}
              </div>
            )}
            <form action={handleSubmit} className="space-y-4">
              <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div><input type="text" name="name" placeholder={t.namePlaceholder} required className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all duration-300 backdrop-blur-sm text-center placeholder:text-center" /></div>
              <div><input type="email" name="email" placeholder={t.emailPlaceholder} required className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all duration-300 backdrop-blur-sm text-center placeholder:text-center" /></div>
              <div><input type="text" name="subject_line" placeholder={t.subjectPlaceholder} required className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all duration-300 backdrop-blur-sm text-center placeholder:text-center" /></div>
              <div><textarea name="message" placeholder={t.messagePlaceholder} rows={3} required className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-all duration-300 backdrop-blur-sm resize-none text-center placeholder:text-center" /></div>
              <Button type="submit" variant="default" size="lg" disabled={pending} className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group py-8 border border-white/10 hover:opacity-95 hover:scale-[1.02]">
                {pending ? (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.sending}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-3">
                    <Send className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span>{t.sendMessage}</span>
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center">
            <div className="text-base text-muted-foreground order-2 md:order-1">
              &copy; {new Date().getFullYear()} {authorName}. {t.copyright}
            </div>
            <div className="flex items-center gap-3 text-base text-muted-foreground order-1 md:order-2">
              <span>{t.builtWith}</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>{t.and}</span>
              <span className="text-primary font-medium">{t.openSource}</span>
            </div>
            <div className="flex gap-2 order-3">
              {["Linux", "Rust", "AI/ML", "DevSecOps"].map((tech) => (
                <span key={tech} className="px-3 py-2 bg-white/5 text-muted-foreground text-sm rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
