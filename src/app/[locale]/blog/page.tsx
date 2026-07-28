import { promises as fs } from "fs";
import { join } from "path";
import matter from "gray-matter";
import BlogPageClient from "./page-client";
import { Hero } from "../../components/Hero";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const t = getDictionary(validLocale);

  return {
    title: t.blog.title,
    description: t.blog.description,
    keywords: [...t.seo.keywords],
    alternates: {
      canonical: `https://bymuja.com/${validLocale}/blog`,
    },
    openGraph: {
      title: t.blog.title,
      description: t.blog.description,
      url: `https://bymuja.com/${validLocale}/blog`,
      type: "website",
    },
  };
}

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

function calculateReadingTime(content: string, t: any): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} ${t.blog.minRead}`;
}

async function getBlogPosts(t: any): Promise<BlogPost[]> {
  const blogDirectory = join(process.cwd(), "src", "content", "blog");

  try {
    const files = await fs.readdir(blogDirectory);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "");
          const fullPath = join(blogDirectory, file);
          const fileContents = await fs.readFile(fullPath, "utf8");
          const { data, content } = matter(fileContents);

          return {
            slug,
            title: data.title || `Blog Post ${slug}`,
            description: data.description || t.blog.noDescription,
            date: data.date || "Unknown date",
            image: data.image || "/vercel.svg",
            category: data.category || t.blog.uncategorized,
            tags: data.tags || [],
            readingTime: calculateReadingTime(content, t),
            featured: data.featured || false,
            draft: data.draft || false,
          };
        }),
    );

    return posts
      .filter((post) => !post.draft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const dict = getDictionary(validLocale);

  try {
    const posts = await getBlogPosts(dict);
    const safePosts = Array.isArray(posts) ? posts : [];
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center">
          <Hero
            title={dict.blog.heroTitle}
            subtitle={dict.blog.heroSubtitle}
            description={dict.blog.heroDescription}
          />
        </div>
        <BlogPageClient locale={validLocale} t={dict.blog} posts={safePosts} />
      </div>
    );
  } catch (error) {
    console.error("Error in BlogPage:", error);
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center">
          <Hero
            title={dict.blog.heroTitleAlt}
            subtitle={dict.blog.heroSubtitleAlt}
            description={dict.blog.heroDescriptionAlt}
          />
        </div>
        <BlogPageClient locale={validLocale} t={dict.blog} posts={[]} />
      </div>
    );
  }
}

// Revalidate every minute for ISR to ensure new content is indexed quickly
export const revalidate = 60;
