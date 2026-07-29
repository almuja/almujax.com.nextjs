"use client";

import { useState } from "react";
import { ExternalLink, Music2, Disc3, Volume2, ChevronDown, ChevronUp } from "lucide-react";

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
  { name: "Spotify", icon: SpotifyIcon, url: "https://open.spotify.com/user/bymuja", color: "#1DB954", glow: "shadow-green-500/20" },
  { name: "YouTube", icon: YouTubeIcon, url: "https://www.youtube.com/@bymuja", color: "#FF0000", glow: "shadow-red-500/20" },
  { name: "SoundCloud", icon: Volume2, url: "https://soundcloud.com/bymuja", color: "#FF5500", glow: "shadow-orange-500/20" },
  { name: "Apple Music", icon: Music2, url: "https://music.apple.com/profile/bymuja", color: "#FC3C44", glow: "shadow-rose-500/20" },
  { name: "Tidal", icon: Music2, url: "https://tidal.com/browse/artist/", color: "#00FFFF", glow: "shadow-cyan-500/20" },
  { name: "Amazon", icon: Music2, url: "https://music.amazon.com/", color: "#00A8E1", glow: "shadow-sky-500/20" },
  { name: "Pandora", icon: Music2, url: "https://www.pandora.com/", color: "#3668FF", glow: "shadow-blue-500/20" },
] as const;

const musicVideos = [
  { id: "QETIqXOf_KU", title: "Music Video" },
  { id: "3JEXFwKn24g", title: "Music Video" },
  { id: "FY_braEkhIo", title: "Music Video" },
  { id: "c-EY43l0M7Y", title: "Music Video" },
  { id: "j28Cn-NPpH4", title: "Music Video" },
  { id: "XGGFjI9hMx0", title: "Music Video" },
];

export function MusicContent({ locale, t }: MusicContentProps) {
  const [showStory, setShowStory] = useState(true);
  const dir = locale === "ar" ? "rtl" : "ltr";
  const rtl = dir === "rtl";

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Glow Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[90px] animate-pulse-slow animation-delay-1000"></div>
      </div>

      <div className="relative z-10 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir={dir}>

          {/* === HERO === */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-xl text-primary text-xs font-bold mb-6 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              {t.artistName}
            </div>

            <h1 className="text-5xl sm:text-7xl font-black mb-4 tracking-tight leading-none">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                {t.heading}
              </span>
            </h1>

            <p className="text-lg text-foreground/40 max-w-lg mx-auto mb-10">
              {t.artistDescription}
            </p>

            {/* Streaming */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-0">
              {services.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/30 bg-card/40 backdrop-blur-md text-foreground/50 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ boxShadow: s.color + "08" }}
                >
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle at center, ${s.color}20 0%, transparent 80%)` }} />
                  <span className="relative z-10"><s.icon /></span>
                  <span className="relative z-10 text-[11px] font-bold uppercase tracking-wider">{s.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* === THE STORY === */}
          {t.artistStory && (
            <div className="mb-14">
              <button onClick={() => setShowStory(!showStory)}
                className="w-full flex items-center justify-between p-5 rounded-2xl border border-border/20 bg-card/20 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-primary rounded-full group-hover:w-10 transition-all duration-300"></span>
                  <span className="text-base font-semibold text-foreground/70 group-hover:text-foreground">
                    {locale === "ar" ? "القصة" : locale === "fr" ? "L'histoire" : "The Story"}
                  </span>
                </div>
                {showStory ? <ChevronUp className="w-4 h-4 text-foreground/40" /> : <ChevronDown className="w-4 h-4 text-foreground/40" />}
              </button>
              {showStory && (
                <div className="mt-3 p-6 rounded-2xl bg-card/10 border border-border/10 backdrop-blur-sm">
                  <p className="text-foreground/60 leading-relaxed text-sm">{t.artistStory}</p>
                </div>
              )}
            </div>
          )}

          {/* === KAKASHI EP === */}
          <div className="mb-14">
            <div className="relative p-8 md:p-10 rounded-3xl overflow-hidden border border-primary/10"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 50%, rgba(0,0,0,0.3) 100%)" }}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className={`flex flex-col md:flex-row items-center gap-8 relative z-10 ${rtl ? "md:flex-row-reverse" : ""}`}>
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-secondary flex items-center justify-center shadow-2xl shadow-primary/10 flex-shrink-0 ring-4 ring-primary/5">
                  <Disc3 className="w-14 h-14 md:w-16 md:h-16 text-white/80 animate-spin-slow" />
                </div>
                <div className={`text-center ${!rtl ? "md:text-left" : "md:text-right"} flex-1`}>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-widest mb-3 border border-primary/20">
                    <Disc3 className="w-3 h-3" /> EP · 2022
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-foreground mb-2">KAKASHI</h3>
                  <p className="text-foreground/40 text-sm mb-5 max-w-md">
                    {locale === "ar"
                      ? "أول EP لموجا — بداية جديدة في مسيرته الفنية."
                      : locale === "fr"
                      ? "Premier EP de Muja — un nouveau départ."
                      : "Muja's debut EP — a new beginning."}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <a href="https://www.youtube.com/@MujaOfficiel" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-500 transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/20">
                      <YouTubeIcon /> {locale === "ar" ? "يوتيوب" : locale === "fr" ? "YouTube" : "YouTube"}
                    </a>
                    <a href="https://soundcloud.com/bymuja" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm text-foreground/60 hover:text-foreground text-xs font-semibold hover:border-primary/30 transition-all duration-300">
                      <Volume2 className="w-3.5 h-3.5" /> SoundCloud
                    </a>
                    <a href="https://open.spotify.com/user/bymuja" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm text-foreground/60 hover:text-foreground text-xs font-semibold hover:border-primary/30 transition-all duration-300">
                      <SpotifyIcon /> Spotify
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === VIDEOS === */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20">
                <YouTubeIcon className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">
                  {locale === "ar" ? "الفيديوهات" : locale === "fr" ? "Vidéos" : "Videos"}
                </h2>
                <p className="text-sm text-foreground/40">@MujaOfficiel</p>
              </div>
              <a href="https://www.youtube.com/@MujaOfficiel" target="_blank" rel="noopener noreferrer"
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors font-medium">
                {locale === "ar" ? "القناة" : locale === "fr" ? "Chaîne" : "Channel"}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {musicVideos.map((video, i) => (
                <div key={video.id}
                  className="group rounded-2xl overflow-hidden bg-gradient-to-b from-card/30 to-card/5 border border-border/20 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-500 hover:-translate-y-1">
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      width="100%" height="100%"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full"
                      title={video.title}
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                      <span className="text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors truncate">{video.title}</span>
                    </div>
                    <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-foreground/20 group-hover:text-red-400 transition-colors flex-shrink-0 ml-2">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* === COMING SOON === */}
          <div className="text-center py-14 rounded-3xl border border-primary/5 bg-gradient-to-b from-primary/[0.02] to-transparent">
            <Music2 className="w-8 h-8 text-primary/20 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-foreground/40 mb-1">
              {locale === "ar" ? "قريباً على جميع المنصات" : locale === "fr" ? "Bientôt sur toutes les plateformes" : "Coming to All Platforms"}
            </h3>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {services.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/10 bg-card/5 text-foreground/25 hover:text-foreground/50 hover:border-border/30 transition-all duration-300">
                  <s.icon className="w-3 h-3" /> <span className="text-[10px] font-medium">{s.name}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
