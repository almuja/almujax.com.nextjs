"use client";

import { ExternalLink, Music2, Play, Disc3 } from "lucide-react";
import { Button } from "../../components/ui/Button";

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-2-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const YouTubeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.67 8.12c-.24-.84-.94-1.5-1.83-1.73C16.04 6 12 6 12 6s-4.04 0-5.84.39c-.89.23-1.59.89-1.83 1.73C4 9.91 4 12 4 12s0 2.09.33 3.88c.24.84.94 1.5 1.83 1.73C7.96 18 12 18 12 18s4.04 0 5.84-.39c.89-.23 1.59-.89 1.83-1.73C20 14.09 20 12 20 12s0-2.09-.33-3.88zm-9.35 6.15V9.73l4.47 2.27-4.47 2.27z"/>
  </svg>
);
const SoundCloudIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M11.56 8.87V17h8.76c.7 0 1.27-.56 1.27-1.26 0-.69-.57-1.25-1.27-1.25h-.08c.05-.23.08-.47.08-.71a2.92 2.92 0 0 0-2.9-2.91c-.49 0-.94.13-1.34.35-.25-2.92-2.73-5.2-5.71-5.2-2.14 0-3.97 1.24-4.84 3.02-.63-.26-1.33-.41-2.07-.41C2.5 8.87 1 10.36 1 12.13c0 1.78 1.5 3.26 3.32 3.26h7.24z"/>
  </svg>
);
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M21.65 2.24a1 1 0 0 0-.8-.2l-13 2A1 1 0 0 0 7 5v10.35A3.45 3.45 0 0 0 5.5 15 3.5 3.5 0 1 0 9 18.5v-7.64l11-1.69v4.18a3.45 3.45 0 0 0-1.5-.35 3.5 3.5 0 1 0 3.5 3.5V3a1 1 0 0 0-.35-.76z"/>
  </svg>
);

interface MusicContentProps {
  locale: string;
  t: {
    heading: string; subtitle: string; noPlaylists: string; loading: string;
    listenOn: string; tracks: string; openInApp: string;
    artistName: string; artistDescription: string; artistStory: string;
  };
}

const platforms = [
  { name: "Spotify", icon: SpotifyIcon, url: "https://open.spotify.com/user/bymuja", color: "hover:bg-green-600" },
  { name: "SoundCloud", icon: SoundCloudIcon, url: "https://soundcloud.com/bymuja", color: "hover:bg-orange-500" },
  { name: "YouTube", icon: YouTubeIcon, url: "https://www.youtube.com/@bymuja", color: "hover:bg-red-600" },
  { name: "Apple Music", icon: AppleIcon, url: "https://music.apple.com/profile/bymuja", color: "hover:bg-pink-500" },
] as const;

export function MusicContent({ locale, t }: MusicContentProps) {
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" dir={dir}>

        {/* === HERO === */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-glass border border-glass-border text-primary text-sm font-medium mb-6">
            <Music2 className="w-4 h-4" />
            {t.artistName}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {t.heading}
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-6">
            {t.artistDescription}
          </p>

          {/* Streaming Platforms */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {platforms.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-foreground/70 hover:text-white transition-all duration-300 hover:scale-105 ${p.color}`}>
                <p.icon /> <span className="text-sm font-medium">{p.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* === ARTIST STORY === */}
        {t.artistStory && (
          <div className="max-w-3xl mx-auto mb-16 p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full"></span>
              {locale === "ar" ? "القصة" : locale === "fr" ? "L'histoire" : "The Story"}
            </h2>
            <p className="text-foreground/80 leading-relaxed">{t.artistStory}</p>
          </div>
        )}

        {/* === FEATURED RELEASE: KAKASHI EP === */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Disc3 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              {locale === "ar" ? "الإصدار المميز" : locale === "fr" ? "Sortie en vedette" : "Featured Release"}
            </h2>
          </div>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl flex-shrink-0">
                <Disc3 className="w-20 h-20 text-white/80" />
              </div>
              <div className="text-center md:text-left flex-1">
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider mb-3 inline-block">EP · 2022</span>
                <h3 className="text-3xl font-bold text-foreground mb-2">KAKASHI</h3>
                <p className="text-foreground/60 mb-6">
                  {locale === "ar"
                    ? "أول EP لموجا — بداية جديدة في مسيرته الفنية. عودة إلى الموسيقى بعد رحلة في هندسة البرمجيات."
                    : locale === "fr"
                    ? "Premier EP de Muja — un nouveau départ dans sa carrière artistique. Retour à la musique après un parcours en ingénierie logicielle."
                    : "Muja's debut EP — a new beginning in his artistic career. A return to music after a journey through software engineering."}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <Button variant="default" size="sm" className="bg-primary hover:bg-primary/80 text-white gap-2" onClick={() => window.open("https://www.youtube.com/@MujaOfficiel", "_blank")}>
                    <YouTubeIcon /> {locale === "ar" ? "مشاهدة على يوتيوب" : locale === "fr" ? "Regarder sur YouTube" : "Watch on YouTube"}
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary/20 gap-2" onClick={() => window.open("https://soundcloud.com/bymuja", "_blank")}>
                    <SoundCloudIcon /> SoundCloud
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === LEGACY WORKS: YouTube Channel === */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <YouTubeIcon className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-foreground">
              {locale === "ar" ? "الأعمال السابقة" : locale === "fr" ? "Travaux antérieurs" : "Legacy Works"}
            </h2>
            <a href="https://www.youtube.com/@MujaOfficiel" target="_blank" rel="noopener noreferrer"
              className="ml-auto text-sm text-primary hover:underline flex items-center gap-1">
              @MujaOfficiel <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="rounded-3xl overflow-hidden border border-border/50 shadow-xl">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed?listType=user_uploads&list=MujaOfficiel"
                width="100%" height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
                title="Muja YouTube Channel"
              />
            </div>
          </div>
          <p className="text-sm text-foreground/50 mt-4 text-center">
            {locale === "ar"
              ? "أرشيف فيديوهات موجا الموسيقية القديمة على يوتيوب"
              : locale === "fr"
              ? "Archives des anciennes vidéos musicales de Muja sur YouTube"
              : "Archive of Muja's earlier music videos on YouTube"}
          </p>
        </div>

        {/* === PLAYLISTS / COMING SOON === */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Play className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              {locale === "ar" ? "قوائم التشغيل" : locale === "fr" ? "Playlists" : "Playlists"}
            </h2>
          </div>
          <div className="text-center py-16 rounded-3xl bg-muted/20 border border-border/50">
            <Music2 className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
            <p className="text-foreground/50 text-lg">
              {locale === "ar"
                ? "قريباً — سيتم إضافة قوائم التشغيل من Spotify و Apple Music"
                : locale === "fr"
                ? "Bientôt — playlists Spotify et Apple Music à venir"
                : "Coming soon — Spotify & Apple Music playlists will be added here"}
            </p>
          </div>
        </div>

        {/* === FUTURE INTEGRATIONS === */}
        <div className="text-center py-12 rounded-3xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border border-primary/10">
          <h3 className="text-xl font-bold text-foreground mb-4">
            {locale === "ar" ? "قريباً على جميع المنصات" : locale === "fr" ? "Bientôt sur toutes les plateformes" : "Coming to All Platforms"}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-card/30 text-foreground/60 hover:text-foreground transition-all duration-300`}>
                <p.icon /> <span className="text-sm">{p.name}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
