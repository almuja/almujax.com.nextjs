"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PostCard } from "./components/PostCard";
import { FeaturedPostCard } from "./components/FeaturedPostCard";
import { SearchAndFilters } from "./components/SearchAndFilters";
import { BlogPost, filterPosts } from "./lib/utils";
import { Star } from "lucide-react";

interface BlogPageProps {
  posts: BlogPost[];
  locale: string;
  t: {
    featuredPosts: string;
    highlights: string;
    highlightsPlural: string;
    sortBy: string;
    mostRecent: string;
    mostPopular: string;
    featuredFirst: string;
    allPosts: string;
    searchResults: string;
    postCount: string;
    postCountPlural: string;
    noPostsFound: string;
    noPostsAvailable: string;
    clearFilters: string;
  };
}

export default function BlogPageClient({ posts, locale, t }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "featured">(
    "recent",
  );

  const filteredPosts = useMemo(() => {
    let filtered = filterPosts(
      posts,
      searchQuery,
      selectedCategory,
      selectedTag,
    );
    switch (sortBy) {
      case "featured":
        filtered = [
          ...filtered.filter((p) => p.featured),
          ...filtered.filter((p) => !p.featured),
        ];
        break;
      case "popular":
        filtered = filtered.sort(
          (a, b) =>
            (b.description?.length || 0) +
            b.title.length * 10 -
            ((a.description?.length || 0) + a.title.length * 10),
        );
        break;
      default:
        filtered = filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    }
    return filtered;
  }, [searchQuery, selectedCategory, selectedTag, sortBy, posts]);

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div
          className="flex flex-col items-center mb-8 gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="w-full max-w-4xl">
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedTag={selectedTag}
              onTagChange={setSelectedTag}
              posts={posts}
            />
          </div>
        </div>

        <div className="w-full">
          {featuredPosts.length > 0 && (
            <section
              className="mb-16 w-full animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold text-foreground flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 me-2" />
                    {t.featuredPosts}
                  </h2>
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full ms-3">
                    {featuredPosts.length}{" "}
                    {featuredPosts.length !== 1
                      ? t.highlightsPlural
                      : t.highlights}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="sort"
                    className="text-sm font-medium text-muted-foreground whitespace-nowrap"
                  >
                    {t.sortBy}
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="block w-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                  >
                    <option value="recent">{t.mostRecent}</option>
                    <option value="popular">{t.mostPopular}</option>
                    <option value="featured">{t.featuredFirst}</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                {featuredPosts.map((post) => (
                  <FeaturedPostCard
                    key={post.slug}
                    post={post}
                    locale={locale}
                    onCategoryClick={(cat) => {
                      setSelectedCategory(cat);
                      setSelectedTag(null);
                      setSearchQuery("");
                    }}
                  />
                ))}
              </div>
            </section>
          )}

          {featuredPosts.length === 0 && (
            <div className="w-full max-w-4xl mb-8 flex justify-end">
              <div className="flex items-center gap-3">
                <label
                  htmlFor="sort2"
                  className="text-sm font-medium text-muted-foreground whitespace-nowrap"
                >
                  {t.sortBy}
                </label>
                <select
                  id="sort2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="block w-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
                >
                  <option value="recent">{t.mostRecent}</option>
                  <option value="popular">{t.mostPopular}</option>
                  <option value="featured">{t.featuredFirst}</option>
                </select>
              </div>
            </div>
          )}

          <section
            className="w-full animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-foreground text-center">
                  {searchQuery || selectedCategory || selectedTag
                    ? `${t.searchResults} (${filteredPosts.length})`
                    : t.allPosts}
                </h2>
                {filteredPosts.length > 0 && (
                  <span className="text-sm text-muted-foreground bg-primary/20 px-3 py-1 rounded-full ml-3">
                    {filteredPosts.length}{" "}
                    {filteredPosts.length !== 1
                      ? t.postCountPlural
                      : t.postCount}
                  </span>
                )}
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    locale={locale}
                    onCategoryClick={(cat) => {
                      setSelectedCategory(cat);
                      setSelectedTag(null);
                      setSearchQuery("");
                    }}
                    onTagClick={(tag) => {
                      setSelectedTag(tag);
                      setSelectedCategory(null);
                      setSearchQuery("");
                    }}
                  />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-16 bg-muted/30 rounded-2xl border border-border/50 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-muted-foreground text-lg mb-6 flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 text-muted-foreground/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  {searchQuery || selectedCategory || selectedTag
                    ? t.noPostsFound
                    : t.noPostsAvailable}
                </div>
                {(searchQuery || selectedCategory || selectedTag) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                      setSelectedTag(null);
                    }}
                    className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:scale-105 inline-flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    {t.clearFilters}
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
