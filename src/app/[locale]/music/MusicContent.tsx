"use client";

import { useState, useRef } from "react";
import { ExternalLink, Music2, Play, Disc3, Volume2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../../components/ui/Button";

const SpotifyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-2-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
);

const YouTubeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M19.67 8.12c-.24-.84-.94-1.5-1.83-1.73C16.04 6 12 6 12 6s-4.04 0-5.84.39c-.89.23-1.59.89-1.83 1.73C4 9.91 4 12 4 12s0 2.09.33 3.88c.24.84.94 1.5 1.83 1.73C7.96 18 12 18 12 18s4.04 0 5.84-.39c.89-.23 1.59-.89 1.83-1.73C20 14.09 20 12 20 12s0-2.09-.33-3.88zm-9.35 6.15V9.73l4.47 2.27-4.47 2.27z"/></svg>
);

interface MusicContentProps {
  locale: string;
  t: {
    heading: string; subtitle: string; noPlaylists: string; loading: string;
    listenOn: string; tracks: string; openInApp: string;
    artistName: string; artistDescription: string; artistStory: string;
  };
}

const services = [
  { name: "Spotify", icon: SpotifyIcon, url: "https://open.spotify.com/user/bymuja", color: "#1DB954" },
  { name: "YouTube", icon: YouTubeIcon, url: "https://www.youtube.com/@bymuja", color: "#FF0000" },
  { name: "SoundCloud", icon: Volume2, url: "https://soundcloud.com/bymuja", color: "#FF5500" },
  { name: "Apple Music", icon: Music2, url: "https://music.apple.com/profile/bymuja", color: "#FC3C44" },
  { name: "Tidal", icon: Music2, url: "https://tidal.com/browse/artist/", color: "#00FFFF" },
  { name: "Amazon Music", icon: Music2, url: "https://music.amazon.com/", color: "#00A8E1" },
  { name: "Pandora", icon: Music2, url: "https://www.pandora.com/", color: "#3668FF" },
] as const;

const legacyVideos = [
  { id: "uploads", title: "All Uploads", url: "https://www.youtube.com/@MujaOfficiel/videos", embedUrl: "https://www.youtube.com/embed?listType=user_uploads&list=MujaOfficiel" },
];

function VideoCard({ video, locale }: { video: typeof legacyVideos[0]; locale: string }) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  return (
    <div className="group">
      <div className="relative rounded-2xl overflow-hidden border border-border/30 shadow-2xl shadow-black/20 bg-black/40 backdrop-blur-sm">
        <div className="aspect-video w-full relative bg-gradient-to-br from-gray-900 to-black">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-foreground/40">
                {locale === "ar" ? "جاري تحميل الفيديو..." : locale === "fr" ? "Chargement..." : "Loading video..."}
              </span>
            </div>
          )}
          <iframe
            src={video.embedUrl}
            width="100%" height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={`w-full h-full ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
            onLoad={() => setLoaded(true)}
            loading="lazy"
            title={video.title}
          />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">{video.title}</h3>
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary/60 hover:text-primary flex items-center gap-1">
          <ExternalLink className="w-3 h-3" />
          {locale === "ar" ? "يوتيوب" : "YouTube"}
        </a>
      </div>
    </div>
  );
}

export function MusicContent({ locale, t }: MusicContentProps) {
  const [showStory, setShowStory] = useState(false);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      </div>

      <div className="relative z-10 pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" dir={dir}>

          {/* === HERO === */}
          <div className="text-center mb-20 pt-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-xl text-primary text-sm font-bold mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              {t.artistName}
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t.heading}
              </span>
            </h1>

            <p className="text-xl text-foreground/50 max-w-xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {t.artistDescription}
            </p>

            {/* Streaming Links - Glowing */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              {services.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl text-foreground/60 hover:text-white transition-all duration-500 hover:scale-110 hover:shadow-lg overflow-hidden"
                  style={{ boxShadow: `0 0 20px ${s.color}10` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: `radial-gradient(circle at center, ${s.color}30 0%, transparent 70%)` }} />
                  <span className="relative z-10"><s.icon className="w-4 h-4" /></span>
                  <span className="relative z-10 text-xs font-semibold uppercase tracking-wider">{s.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* === FEATURED: KAKASHI EP === */}
          <div className="mb-20 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/15 via-secondary/8 to-black/40">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/30">
                  <Disc3 className="w-3.5 h-3.5" /> EP · 2022
                </span>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-40 h-40 md:w-52 md:h-52 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-2xl shadow-primary/20 flex-shrink-0 ring-4 ring-primary/10">
                    <Disc3 className="w-16 h-16 md:w-20 md:h-20 text-white/90 animate-spin-slow" />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-4xl md:text-5xl font-black text-foreground mb-3">KAKASHI</h3>
                    <p className="text-foreground/50 mb-6 max-w-md">
                      {locale === "ar"
                        ? "أول EP لموجا — بداية جديدة في مسيرته الفنية. عودة إلى الموسيقى بعد رحلة في هندسة البرمجيات."
                        : locale === "fr"
                        ? "Premier EP de Muja — un nouveau départ. Retour à la musique après un parcours en ingénierie logicielle."
                        : "Muja's debut EP. A new beginning — returning to music after a journey through software engineering."}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      {[
                        { label: locale === "ar" ? "مشاهدة على يوتيوب" : locale === "fr" ? "Regarder" : "Watch",
                          url: "https://www.youtube.com/@MujaOfficiel", icon: YouTubeIcon, primary: true },
                        { label: "SoundCloud", url: "https://soundcloud.com/bymuja", icon: Volume2, primary: false },
                        { label: "Spotify", url: "https://open.spotify.com/user/bymuja", icon: SpotifyIcon, primary: false },
                      ].map((btn) => (
                        <a key={btn.label} href={btn.url} target="_blank" rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                            btn.primary
                              ? "bg-primary text-white shadow-lg shadow-primary/30"
                              : "border border-border/50 bg-card/50 backdrop-blur-sm text-foreground/70 hover:text-foreground hover:border-primary/30"
                          }`}>
                          <btn.icon className="w-4 h-4" /> {btn.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === LEGACY VIDEOS === */}
          <div className="mb-20 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
                <YouTubeIcon className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {locale === "ar" ? "مقاطع الفيديو" : locale === "fr" ? "Vidéos" : "Videos"}
                </h2>
                <p className="text-sm text-foreground/40">
                  {locale === "ar" ? "أرشيف @MujaOfficiel" : locale === "fr" ? "Archives @MujaOfficiel" : "@MujaOfficiel Archive"}
                </p>
              </div>
              <a href="https://www.youtube.com/@MujaOfficiel" target="_blank" rel="noopener noreferrer"
                className="ml-auto text-sm text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
                @MujaOfficiel <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="grid gap-6">
              {legacyVideos.map((video) => (
                <VideoCard key={video.id} video={video} locale={locale} />
              ))}
            </div>
          </div>

          {/* === ARTIST STORY === */}
          {t.artistStory && (
            <div className="mb-20 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <button onClick={() => setShowStory(!showStory)}
                className="w-full flex items-center justify-between p-6 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-1 bg-primary rounded-full"></span>
                  <span className="text-lg font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                    {locale === "ar" ? "القصة" : locale === "fr" ? "L'histoire" : "The Story"}
                  </span>
                </div>
                {showStory ? <ChevronUp className="w-5 h-5 text-foreground/40" /> : <ChevronDown className="w-5 h-5 text-foreground/40" />}
              </button>
              {showStory && (
                <div className="mt-4 p-6 rounded-2xl bg-card/20 border border-border/20 backdrop-blur-sm animate-fade-in-up">
                  <p className="text-foreground/70 leading-relaxed">{t.artistStory}</p>
                </div>
              )}
            </div>
          )}

          {/* === COMING SOON === */}
          <div className="text-center py-16 rounded-3xl border border-primary/10 bg-gradient-to-b from-primary/5 to-transparent animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <Music2 className="w-10 h-10 text-primary/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground/60 mb-2">
              {locale === "ar" ? "قريباً على جميع المنصات" : locale === "fr" ? "Bientôt sur toutes les plateformes" : "Coming to All Platforms"}
            </h3>
            <p className="text-sm text-foreground/30 mb-6">
              {locale === "ar" ? "سيتم إضافة Spotify و Apple Music والمزيد قريباً" : locale === "fr" ? "Spotify, Apple Music et plus à venir" : "Spotify, Apple Music & more coming soon"}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {services.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/20 bg-card/10 text-foreground/30 hover:text-foreground/60 hover:border-border/60 transition-all duration-300">
                  <s.icon className="w-3.5 h-3.5" /> <span className="text-xs">{s.name}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
