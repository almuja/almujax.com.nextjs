"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Clock, Pin, ArrowRight, Sparkles } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  "AI": "amber",
  "Rust": "orange",
  "DevSecOps": "emerald",
  "Infrastructure": "sky",
  "Systems": "teal",
  "Networking": "violet",
  "Open Source": "rose",
  "Tutorial": "blue",
  "Thought": "fuchsia",
};

export default function BlogContent({
  posts,
  locale,
  dict,
}: {
  posts: BlogPost[];
  locale: string;
  dict: any;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Map<string, number>();
    posts.forEach((p) => {
      if (p.category) cats.set(p.category, (cats.get(p.category) || 0) + 1);
    });
    return Array.from(cats.entries());
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeCategory) result = result.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, activeCategory, searchQuery]);

  const featuredPosts = filteredPosts.filter((p) => p.featured).slice(0, 3);
  const regularPosts = filteredPosts.filter((p) => !p.featured);
  const hasFilters = activeCategory || searchQuery.trim();

  return (
    <>
      {/* Search + Filters */}
      <div className="mb-20 space-y-8">
        <div className="max-w-md mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/25 group-focus-within:text-primary/40 transition-colors duration-300" />
            <input
              type="text"
              placeholder={dict.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-11 py-3.5 bg-background/50 border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/[0.04] transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-muted text-foreground/30 hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              !activeCategory
                ? "bg-foreground text-background shadow-lg shadow-foreground/10"
                : "bg-muted/30 border border-border/20 text-foreground/40 hover:text-foreground hover:border-border/40"
            }`}
          >
            {dict.allFilter}
          </button>
          {categories.map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-foreground text-background shadow-lg shadow-foreground/10 border-transparent"
                  : "bg-muted/30 border-border/20 text-foreground/40 hover:text-foreground hover:border-border/40"
              }`}
            >
              {cat}
              <span className="ml-1.5 text-[11px] opacity-40">{count}</span>
            </button>
          ))}
        </div>

        {hasFilters && (
          <div className="text-center">
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory(null); }}
              className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
            >
              {dict.clearFilters}
            </button>
          </div>
        )}
      </div>

      {/* Pinned Posts */}
      {!hasFilters && featuredPosts.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <Pin className="w-3.5 h-3.5 text-amber-500/50" />
            </div>
            <span className="text-sm font-bold text-foreground">{dict.pinned}</span>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/10 to-transparent" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group block"
              >
                <article className="relative h-full rounded-2xl overflow-hidden border border-border/30 bg-card/10 backdrop-blur-sm hover:border-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/[0.04] transition-all duration-700 hover:-translate-y-1 flex flex-col">
                  {/* Shine sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none z-20" />
                  {post.image && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-amber-500/60 bg-amber-500/5 px-2.5 py-1 rounded-full border border-amber-500/10">
                        {post.category}
                      </span>
                      <span className="ml-auto text-[10px] text-foreground/35 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-foreground group-hover:text-amber-500/80 transition-colors duration-300 line-clamp-2 mb-3 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-[13px] text-foreground/45 leading-relaxed line-clamp-2 flex-1">
                      {post.description}
                    </p>
                    <div className="mt-5 pt-4 border-t border-border/25 flex items-center justify-between">
                      <span className="text-[11px] text-foreground/30 tabular-nums">
                        {new Date(post.date).toLocaleDateString(
                          locale === "ar" ? "ar-SA" : locale === "fr" ? "fr-FR" : "en-US",
                          { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-foreground/25 font-medium group-hover:text-amber-500/60 transition-all duration-300">
                        {dict.read}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      {filteredPosts.length > 0 ? (
        <>
          {!hasFilters && regularPosts.length > 0 && featuredPosts.length > 0 && (
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 rounded-xl bg-primary/5 border border-primary/10">
                <Sparkles className="w-3.5 h-3.5 text-primary/40" />
              </div>
              <span className="text-sm font-bold text-foreground">{dict.allPostsLower}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/10 to-transparent" />
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group block"
              >
                <article className="relative h-full rounded-xl overflow-hidden border border-border/20 bg-card/5 backdrop-blur-sm hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.03] transition-all duration-700 hover:-translate-y-0.5 flex flex-col">
                  {/* Shine sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none z-20" />
                  {post.image && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted/20">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-primary/40">
                        {post.category}
                      </span>
                      <span className="ml-auto text-[10px] text-foreground/30 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary/80 transition-colors duration-300 line-clamp-2 mb-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-foreground/40 leading-relaxed line-clamp-2 flex-1">
                      {post.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-border/20">
                      <span className="text-[11px] text-foreground/30 tabular-nums">
                        {new Date(post.date).toLocaleDateString(
                          locale === "ar" ? "ar-SA" : locale === "fr" ? "fr-FR" : "en-US",
                          { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-24">
          <p className="text-sm text-foreground/30 font-light">{dict.noPostsFound}</p>
        </div>
      )}
    </>
  );
}
