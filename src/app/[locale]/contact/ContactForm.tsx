"use client";

import { useState } from "react";
import { Mail, Send, Code2, ExternalLink, Camera, LinkIcon } from "lucide-react";
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
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" dir={dir}>
          <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-4">{t.heading}</h1>
          <p className="text-xl text-[var(--color-foreground)]/60 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12" dir={dir}>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">{t.startConversation}</h2>
            <p className="text-[var(--color-foreground)]/60 mb-8">{t.startConversationDesc}</p>
            <div className="space-y-6">
              {[
                { icon: Mail, color: "primary", title: "Email", desc: t.emailResponseTime, link: "hello@itsmawja.com", href: "mailto:hello@itsmawja.com" },
                { icon: Code2, color: "secondary", title: "GitHub", desc: t.githubDesc, link: "github.com/itsmawja", href: "https://github.com/itsmawja" },
                { icon: LinkIcon, color: "primary", title: "LinkedIn", desc: t.linkedinDesc, link: "@itsmawja", href: "https://linkedin.com/in/itsmawja" },
                { icon: Camera, color: "accent", title: "Instagram", desc: t.instagramDesc, link: "@itsmawja", href: "https://instagram.com/itsmawja" },
                { icon: ExternalLink, color: "accent", title: "Website", desc: t.websiteDesc, link: "itsmawja.com", href: "https://itsmawja.com" },
              ].map((item) => (
                <div key={item.title} className="flex items-center backdrop-blur-sm bg-glass border border-glass-border rounded-2xl p-4 hover:scale-105 transition-all duration-300">
                  <div className={`p-3 bg-[var(--color-${item.color})]/20 rounded-lg mr-4`}>
                    <item.icon className={`w-6 h-6 text-[var(--color-${item.color})]`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-foreground)]">{item.title}</h3>
                    <p className="text-[var(--color-foreground)]/60">{item.desc}</p>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-primary)] font-medium">{item.link}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="backdrop-blur-sm bg-glass border border-glass-border rounded-2xl p-8">
            {msg && <div className={`mb-6 p-4 rounded-lg ${msg.ok ? "bg-green-500/10 border border-green-500/20 text-green-600" : "bg-red-500/10 border border-red-500/20 text-red-600"}`}>{msg.text}</div>}
            <form action={handleSubmit} className="space-y-6">
              <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid md:grid-cols-2 gap-6">
                <div><label htmlFor="name" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">{t.formName}</label><input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-[var(--color-glass-border)] rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm bg-[var(--color-glass)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40" placeholder={t.formNamePlaceholder} /></div>
                <div><label htmlFor="email" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">{t.formEmail}</label><input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-[var(--color-glass-border)] rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm bg-[var(--color-glass)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40" placeholder={t.formEmailPlaceholder} /></div>
              </div>
              <div><label htmlFor="subject_line" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">{t.formSubject}</label><input type="text" id="subject_line" name="subject_line" required className="w-full px-4 py-3 border border-[var(--color-glass-border)] rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm bg-[var(--color-glass)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40" placeholder={t.formSubjectPlaceholder} /></div>
              <div><label htmlFor="message" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">{t.formMessage}</label><textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 border border-[var(--color-glass-border)] rounded-2xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent backdrop-blur-sm bg-[var(--color-glass)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)]/40" placeholder={t.formMessagePlaceholder} /></div>
              <button type="submit" disabled={pending} className="w-full flex flex-col items-center justify-center px-8 py-8 backdrop-blur-sm bg-glass border border-glass-border text-white rounded-2xl font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group">
                {pending ? <div className="flex flex-col items-center space-y-3"><div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" /><span>{t.sending}</span></div>
                : <div className="flex flex-col items-center space-y-3"><Send className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 text-[var(--color-primary)]" /><span>{t.sendMessage}</span></div>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
