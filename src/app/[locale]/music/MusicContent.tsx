"use client";

import { useState } from "react";
import { ExternalLink, Disc3, ChevronDown, ChevronUp, Music2 } from "lucide-react";

const SpotifyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-2-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
);

const YouTubeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M19.67 8.12c-.24-.84-.94-1.5-1.83-1.73C16.04 6 12 6 12 6s-4.04 0-5.84.39c-.89.23-1.59.89-1.83 1.73C4 9.91 4 12 4 12s0 2.09.33 3.88c.24.84.94 1.5 1.83 1.73C7.96 18 12 18 12 18s4.04 0 5.84-.39c.89-.23 1.59-.89 1.83-1.73C20 14.09 20 12 20 12s0-2.09-.33-3.88zm-9.35 6.15V9.73l4.47 2.27-4.47 2.27z"/></svg>
);

const SoundCloudIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M11.56 8.87V17h8.76c1.85 0 3.31-1.46 3.31-3.31 0-1.84-1.46-3.31-3.31-3.31-.41 0-.82.08-1.2.22-.61-3.47-3.6-6.1-7.26-6.1-3.62 0-6.7 2.67-7.26 6.1-.38-.14-.79-.22-1.2-.22C2.07 10.38.5 11.95.5 13.84c0 1.89 1.57 3.26 3.46 3.26h7.6zM2.92 13.84c0-.63.5-1.15 1.12-1.15.63 0 1.12.52 1.12 1.15v1.16H2.92v-1.16zm2.4-.58c0-.63.5-1.15 1.12-1.15.63 0 1.12.52 1.12 1.15v1.74H5.32v-1.74zm2.4-.58c0-.63.5-1.15 1.12-1.15.63 0 1.12.52 1.12 1.15v2.32H7.72v-2.32zm2.4-.58c0-.63.5-1.15 1.12-1.15.63 0 1.12.52 1.12 1.15v2.9h-2.24v-2.9z"/></svg>
);

const AppleMusicIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M21.65 2.24a1 1 0 0 0-.8-.2l-13 2A1 1 0 0 0 7 5v10.35A3.45 3.45 0 0 0 5.5 15 3.5 3.5 0 1 0 9 18.5v-7.64l11-1.69v4.18a3.45 3.45 0 0 0-1.5-.35 3.5 3.5 0 1 0 3.5 3.5V3a1 1 0 0 0-.35-.76zM9 15.35a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm10 .65a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg>
);

const TidalIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 3L6 9l3 3-3 3 6 6 6-6-3-3 3-3-6-6zm0 4.5l3 3-3 3-3-3 3-3z"/></svg>
);

const AmazonMusicIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-1 4h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>
);

const PandoraIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M6 3h8c3.31 0 6 2.69 6 6s-2.69 6-6 6h-4v6H6V3zm4 8h4c1.1 0 2-.9 2-2s-.9-2-2-2h-4v4z"/></svg>
);

interface MusicContentProps {
  locale: string;
  t: {
    heading: string; subtitle: string; noPlaylists: string; loading: string;
    listenOn: string; tracks: string; openInApp: string;
    artistName: string; artistDescription: string; artistStory: string;
  };
}

const streamingPlatforms = [
  { name: "Spotify", icon: SpotifyIcon, url: "https://open.spotify.com/user/itsmawja", color: "#1DB954" },
  { name: "YouTube", icon: YouTubeIcon, url: "https://www.youtube.com/@itsmawja", color: "#FF0000" },
  { name: "SoundCloud", icon: SoundCloudIcon, url: "https://soundcloud.com/itsmawja", color: "#FF5500" },
  { name: "Apple Music", icon: AppleMusicIcon, url: "https://music.apple.com/profile/itsmawja", color: "#FC3C44" },
  { name: "Tidal", icon: TidalIcon, url: "https://tidal.com/browse/artist/", color: "#00FFFF" },
  { name: "Amazon", icon: AmazonMusicIcon, url: "https://music.amazon.com/", color: "#00A8E1" },
  { name: "Pandora", icon: PandoraIcon, url: "https://www.pandora.com/", color: "#3668FF" },
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

  return (
    <div className="relative min-h-screen bg-background">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-1/4 left-1/4 w-[700px] h-[700px] bg-purple-500/4 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-blue-500/4 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-1/4 left-1/3 w-[400px] h-[400px] bg-violet-500/4 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20" dir={dir}>

        {/* ===== HERO ===== */}
        <div className="text-center mb-20">
          {/* Artist badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-xl mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">{t.artistName}</span>
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            <span className="bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent">
              {t.heading}
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-foreground/40 max-w-md mx-auto mb-12 font-light leading-relaxed">
            {t.artistDescription}
          </p>

          {/* Streaming Platforms Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 max-w-3xl mx-auto mb-16">
            {streamingPlatforms.map((p, i) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-border/20 bg-card/20 backdrop-blur-xl hover:scale-105 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${p.color}15, transparent)` }} />
                <div className="relative z-10 p-3 rounded-xl transition-all duration-300 group-hover:shadow-lg" style={{ backgroundColor: `${p.color}15`, boxShadow: `0 0 20px ${p.color}10` }}>
                  <span className="text-white/90" style={{ color: p.color }}><p.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" /></span>
                </div>
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-wider text-foreground/40 group-hover:text-foreground/80 transition-colors duration-300">{p.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ===== STORY ===== */}
        {t.artistStory && (
          <div className="mb-16">
            <button onClick={() => setShowStory(!showStory)}
              className="w-full flex items-center justify-between p-5 rounded-2xl border border-border/20 bg-card/10 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <span className="w-6 h-0.5 bg-primary/40 rounded-full group-hover:w-10 group-hover:bg-primary transition-all duration-500"></span>
                <span className="text-base font-semibold text-foreground/50 group-hover:text-foreground">
                  {locale === "ar" ? "القصة" : locale === "fr" ? "L'histoire" : "The Story"}
                </span>
              </div>
              {showStory ? <ChevronUp className="w-4 h-4 text-foreground/30" /> : <ChevronDown className="w-4 h-4 text-foreground/30" />}
            </button>
            {showStory && (
              <div className="mt-4 p-6 rounded-2xl bg-card/5 border border-border/10 backdrop-blur-sm">
                <p className="text-foreground/50 leading-relaxed text-sm">{t.artistStory}</p>
              </div>
            )}
          </div>
        )}

        {/* ===== FEATURED RELEASE ===== */}
        <div className="mb-16">
          <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-primary/10 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              {/* Album Art */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-purple-600 blur-2xl opacity-30 animate-pulse-slow"></div>
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-br from-primary via-purple-500 to-secondary p-[2px]">
                  <div className="w-full h-full rounded-3xl bg-gray-900 flex items-center justify-center overflow-hidden">
                    <Disc3 className="w-20 h-20 text-white/60 animate-spin-slow" />
                  </div>
                </div>
              </div>

              <div className="text-center md:text-left flex-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-widest mb-4 border border-primary/20">
                  <Disc3 className="w-3 h-3" /> EP · 2022
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3">KAKASHI</h2>
                <p className="text-foreground/40 text-sm mb-6 max-w-sm">
                  {locale === "ar" ? "أول EP لموجا — بداية جديدة" : locale === "fr" ? "Premier EP de Mawja — un nouveau départ" : "Mawja's debut EP — a new beginning"}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { label: locale === "ar" ? "يوتيوب" : "YouTube", url: "https://www.youtube.com/@MujaOfficiel", icon: YouTubeIcon, primary: true },
                    { label: locale === "ar" ? "ساوند كلاود" : "SoundCloud", url: "https://soundcloud.com/itsmawja", icon: SoundCloudIcon, primary: false },
                    { label: locale === "ar" ? "سبوتيفاي" : "Spotify", url: "https://open.spotify.com/user/itsmawja", icon: SpotifyIcon, primary: false },
                  ].map((b) => (
                    <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 hover:scale-105 ${
                        b.primary ? "bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-500" : "border border-border/30 bg-card/30 backdrop-blur-sm text-foreground/60 hover:text-foreground hover:border-primary/30"}`}>
                      <b.icon /> {b.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== VIDEOS GRID ===== */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20">
                <YouTubeIcon className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{locale === "ar" ? "الفيديوهات" : locale === "fr" ? "Vidéos" : "Videos"}</h2>
                <p className="text-sm text-foreground/40">@MujaOfficiel</p>
              </div>
            </div>
            <a href="https://www.youtube.com/@MujaOfficiel" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium transition-colors">
              {locale === "ar" ? "القناة" : locale === "fr" ? "Chaîne" : "Channel"} <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {musicVideos.map((video, i) => (
              <div key={video.id} className="group rounded-2xl overflow-hidden border border-border/15 bg-card/10 backdrop-blur-sm hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-500 hover:-translate-y-1">
                <div className="aspect-video w-full bg-black">
                  <iframe src={`https://www.youtube.com/embed/${video.id}`} width="100%" height="100%" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" className="w-full h-full" title={video.title} />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
                    <span className="text-sm font-medium text-foreground/50 group-hover:text-foreground/80 transition-colors truncate">{video.title}</span>
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

        {/* ===== FOOTER PLATFORMS ===== */}
        <div className="text-center py-12 rounded-3xl border border-primary/5 bg-gradient-to-b from-primary/[0.03] to-transparent">
          <Music2 className="w-8 h-8 text-primary/15 mx-auto mb-4" />
          <p className="text-sm text-foreground/30 mb-6">{locale === "ar" ? "قريباً على جميع المنصات" : locale === "fr" ? "Bientôt sur toutes les plateformes" : "Coming to All Platforms"}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {streamingPlatforms.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/10 bg-card/5 text-foreground/20 hover:text-foreground/50 hover:border-border/30 transition-all duration-300">
                <p.icon className="w-3.5 h-3.5" /> <span className="text-[10px] font-medium">{p.name}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
