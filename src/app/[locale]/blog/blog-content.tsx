"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Clock, Pin, ArrowRight } from "lucide-react";

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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
            <input
              type="text"
              placeholder={dict.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-11 py-3 bg-transparent border border-border rounded-2xl text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-foreground/20 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-muted text-foreground/20 hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              !activeCategory
                ? "bg-foreground text-background"
                : "text-foreground/40 hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {dict.allFilter}
          </button>
          {categories.map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "text-foreground/40 hover:text-foreground hover:bg-muted/50"
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
              className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
            >
              {dict.clearFilters}
            </button>
          </div>
        )}
      </div>

      {/* Pinned Posts */}
      {!hasFilters && featuredPosts.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <Pin className="w-3.5 h-3.5 text-primary/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/20">
              {dict.pinned}
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group block"
              >
                <article className="relative h-full rounded-2xl overflow-hidden border border-border/50 bg-background hover:border-primary/15 hover:shadow-2xl hover:shadow-primary/[0.04] transition-all duration-500 flex flex-col">
                  {post.image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/50">
                        {post.category}
                      </span>
                      <span className="text-foreground/10">·</span>
                      <span className="text-[10px] text-foreground/25 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-3 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-[13px] text-foreground/35 leading-relaxed line-clamp-2 flex-1">
                      {post.description}
                    </p>
                    <div className="mt-5 pt-4 border-t border-border/30 flex items-center justify-between">
                      <span className="text-[11px] text-foreground/20 tabular-nums">
                        {new Date(post.date).toLocaleDateString(
                          locale === "ar" ? "ar-SA" : locale === "fr" ? "fr-FR" : "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-foreground/15 font-medium group-hover:text-primary transition-all duration-300">
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
            <div className="flex items-center gap-2 mb-8">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/20">
                {dict.allPostsLower}
              </span>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group block"
              >
                <article className="h-full rounded-xl overflow-hidden border border-border/40 bg-background hover:border-primary/10 hover:shadow-lg hover:shadow-primary/[0.03] transition-all duration-400 flex flex-col">
                  {post.image && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
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
                      <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-primary/40">
                        {post.category}
                      </span>
                      <span className="ml-auto text-[10px] text-foreground/20 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-foreground/30 leading-relaxed line-clamp-2 flex-1">
                      {post.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-border/20">
                      <span className="text-[11px] text-foreground/20 tabular-nums">
                        {new Date(post.date).toLocaleDateString(
                          locale === "ar" ? "ar-SA" : locale === "fr" ? "fr-FR" : "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
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
          <p className="text-sm text-foreground/20 font-light">{dict.noPostsFound}</p>
        </div>
      )}
    </>
  );
}
