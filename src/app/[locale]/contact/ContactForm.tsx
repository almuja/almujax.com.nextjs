"use client";

import { useState } from "react";
import { Mail, Send, Code2, Link2, Camera, Globe } from "lucide-react";
import { submitContactForm } from "../../actions/contact";

interface ContactFormProps {
  locale: string;
  t: {
    heading: string; subtitle: string; startConversation: string; startConversationDesc: string;
    emailResponseTime: string; githubDesc: string; linkedinDesc: string; instagramDesc: string;
    tiktokDesc: string; websiteDesc: string;
    formName: string; formEmail: string; formSubject: string; formMessage: string;
    formNamePlaceholder: string; formEmailPlaceholder: string; formSubjectPlaceholder: string; formMessagePlaceholder: string;
    sending: string; sendMessage: string; networkError: string;
    badge: string; links: readonly { label: string; desc: string }[];
  };
}

export default function ContactForm({ locale, t }: ContactFormProps) {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const dir = locale === "ar" ? "rtl" : "ltr";

  async function handleSubmit(formData: FormData) {
    setMsg(null); setPending(true);
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setMsg({ ok: true, text: result.message });
        const form = document.querySelector("form") as HTMLFormElement;
        if (form) form.reset();
      } else setMsg({ ok: false, text: result.message });
    } catch { setMsg({ ok: false, text: t.networkError }); }
    finally { setPending(false); }
  }

  return (
    <div className="min-h-screen" dir={dir}>
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full bg-[var(--color-wave-1)] opacity-[0.04] blur-[140px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-[5%] w-[350px] h-[250px] rounded-full bg-[var(--color-wave-3)] opacity-[0.03] blur-[100px] animate-pulse-slow animation-delay-2000" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="hero-enter inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/60 mb-8">
            <Mail className="w-3 h-3" /> {t.badge}
          </div>
          <h1 className="hero-enter text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            <span className="wave-gradient-text">{t.heading}</span>
          </h1>
          <p className="hero-enter text-sm sm:text-base text-foreground/35 font-light leading-relaxed max-w-lg mx-auto">
            {t.subtitle}
          </p>
          <div className="hero-enter mt-10 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — Info + Links */}
          <div>
            <p className="text-sm text-foreground/40 mb-10 leading-relaxed">{t.startConversationDesc}</p>

            {(() => {
              const contactItems = [
                { icon: Code2, href: "https://github.com/itsmawja", value: "github.com/itsmawja" },
                { icon: Link2, href: "https://x.com/itsmawja", value: "@itsmawja" },
                { icon: Link2, href: "https://linkedin.com/in/itsmawja", value: "@itsmawja" },
                { icon: Camera, href: "https://instagram.com/itsmawja", value: "@itsmawja" },
                { icon: Globe, href: "https://youtube.com/@itsmawja", value: "@itsmawja" },
                { icon: Globe, href: "https://open.spotify.com/user/itsmawja", value: "itsmawja" },
                { icon: Globe, href: "https://music.apple.com/profile/itsmawja", value: "itsmawja" },
                { icon: Mail, href: "mailto:hello@itsmawja.com", value: "hello@itsmawja.com", isEmail: true },
              ];
              return t.links.map((link, i) => {
                const c = contactItems[i];
                const isEmail = "isEmail" in c;
                return (
                  <a
                    key={link.label}
                    href={c.href}
                    target={!isEmail ? "_blank" : undefined}
                    rel={!isEmail ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/30 hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-300 mb-3 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary/50 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
                      <c.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{link.label}</p>
                      <p className="text-xs text-foreground/30">{link.desc}</p>
                    </div>
                    <span className="ml-auto text-[11px] text-foreground/20 font-mono hidden sm:inline">{c.value}</span>
                  </a>
                );
              });
            })()}
          </div>

          {/* Right — Form */}
          <div className="rounded-2xl border border-border/40 bg-card/30 p-6 sm:p-8">
            {msg && (
              <div className={`mb-8 p-4 rounded-xl text-sm font-medium ${msg.ok ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600" : "bg-red-500/10 border border-red-500/20 text-red-600"}`}>
                {msg.text}
              </div>
            )}
            <form action={handleSubmit} className="space-y-5">
              <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground/30 mb-2">{t.formName}</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-foreground/15 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/5 transition-all" placeholder={t.formNamePlaceholder} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground/30 mb-2">{t.formEmail}</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-foreground/15 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/5 transition-all" placeholder={t.formEmailPlaceholder} />
                </div>
              </div>

              <div>
                <label htmlFor="subject_line" className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground/30 mb-2">{t.formSubject}</label>
                <input type="text" id="subject_line" name="subject_line" required className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-foreground/15 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/5 transition-all" placeholder={t.formSubjectPlaceholder} />
              </div>

              <div>
                <label htmlFor="message" className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground/30 mb-2">{t.formMessage}</label>
                <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-foreground/15 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/5 transition-all resize-none" placeholder={t.formMessagePlaceholder} />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-foreground text-background rounded-xl text-sm font-semibold hover:opacity-90 hover:scale-[1.01] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {pending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    {t.sending}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t.sendMessage}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
