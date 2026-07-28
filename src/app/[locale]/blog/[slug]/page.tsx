import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { promises as fs } from "fs";
import { join } from "path";
import matter from "gray-matter";
import Author from "../../../components/Author";
import ClientMDXRenderer from "../../../components/ClientMDXRenderer";
import { ArticleStructuredData } from "../../../components/StructuredData";
import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { compileMdx } from "@/lib/mdx-compiler";

export const revalidate = 60;

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

interface AuthorData {
  name: string;
  image: string;
  bio: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

async function getBlogPosts(_dict?: any) {
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
          const { data } = matter(fileContents);

          // Parse author data
          let author: AuthorData | undefined;
          if (data.author) {
            if (typeof data.author === "string") {
              try {
                author = JSON.parse(data.author);
              } catch {
                author = {
                  name: data.author,
                  image: "/default-avatar.jpg",
                  bio: "",
                };
              }
            } else if (typeof data.author === "object") {
              author = data.author;
            }
          }

          return {
            slug,
            title: data.title || `Blog Post ${slug}`,
            description: data.description || "No description available.",
            date: data.date || "Unknown date",
            image: data.image || "/vercel.svg",
            category: data.category || "Uncategorized",
            tags: data.tags || [],
            readingTime: calculateReadingTime(fileContents),
            featured: data.featured || false,
            draft: data.draft || false,
            author,
          };
        }),
    );

    // Filter out draft posts and sort by date in descending order
    return posts
      .filter((post) => !post.draft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const validLocale = locales.includes(resolvedParams.locale as Locale) ? (resolvedParams.locale as Locale) : "en";
  const blogDirectory = join(process.cwd(), "src", "content", "blog");
  const fullPath = join(blogDirectory, `${slug}.mdx`);

  try {
    await fs.access(fullPath);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data } = matter(fileContents);

    const title = data.title || slug;
    const description = data.description || "";
    const image = data.image || "https://bymuja.com/img/profile.png";
    const publishedTime = data.date;

    return {
      title: `${title} | Mujahid Siyam (Muja / bymuja)`,
      description,
      keywords: [
        ...(data.tags || []),
        data.category,
        "Mujahid Siyam",
        "Muja",
        "bymuja",
        "AI Engineer",
        "Software Engineer",
        "DevSecOps",
        "blog",
      ].filter(Boolean),
      alternates: {
        canonical: `https://bymuja.com/${validLocale}/blog/${slug}`,
      },
      openGraph: {
        title: `${title} | Mujahid Siyam (Muja / bymuja)`,
        description,
        type: "article",
        url: `https://bymuja.com/${validLocale}/blog/${slug}`,
        images: [{ url: image, width: 1200, height: 630, alt: title }],
        publishedTime,
        authors: ["Mujahid Siyam"],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Mujahid Siyam`,
        description,
        images: [image],
      },
      other: {
        "geo.region": "FR",
        "geo.placename": "France",
        "geo.position": "46.603354;1.888334",
        ICBM: "46.603354, 1.888334",
        "DC.date": publishedTime || "",
        "DC.creator": "Mujahid Siyam",
        "DC.subject": (data.tags || []).join(", "),
      },
    };
  } catch {
    return {
      title: slug,
      alternates: {
        canonical: `https://bymuja.com/blog/${slug}`,
      },
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  try {
    const resolvedParams = await params;

    if (!resolvedParams?.slug) {
      notFound();
    }

    const validLocale = locales.includes(resolvedParams.locale as Locale) ? (resolvedParams.locale as Locale) : "en";
    const dict = getDictionary(validLocale);

    const blogDirectory = join(process.cwd(), "src", "content", "blog");
    const fullPath = join(blogDirectory, `${resolvedParams.slug}.mdx`);

    await fs.access(fullPath);

    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);

    if (frontmatter.draft === true) {
      notFound();
    }

    // Use default values if frontmatter is missing
    const title = frontmatter.title || `Blog Post ${resolvedParams.slug}`;
    const date = frontmatter.date || "Unknown date";

    // Calculate reading time
    const readingTime = calculateReadingTime(content);

    // Compile MDX to HTML with syntax highlighting
    const mdxSource = await compileMdx(content);

    return (
      <div className="min-h-screen bg-background transition-colors duration-300">
        <ArticleStructuredData
          title={title}
          description={frontmatter.description || dict.blog.noDescription}
          datePublished={
            date !== "Unknown date"
              ? new Date(date).toISOString()
              : new Date().toISOString()
          }
          image={frontmatter.image || ""}
          url={`https://bymuja.com/${validLocale}/blog/${resolvedParams.slug}`}
          authorName="Mujahid Siyam"
          authorUrl="https://bymuja.com"
        />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back to Blog Link - Always at the top */}
          <div className="flex justify-center mb-8">
            <Link
              href={`/${validLocale}/blog`}
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group"
            >
              <svg
                className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {dict.blog.backToBlog}
            </Link>
          </div>

          {/* Centered Article Content - Wider */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              {/* Modern Article Header */}
              <div className="text-center mb-16">
                <div className="flex flex-wrap gap-3 mb-8 justify-center">
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                    {frontmatter.category || dict.blog.uncategorized}
                  </span>
                  {frontmatter.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-muted/50 text-muted-foreground rounded-full text-xs font-medium border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                  {title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                  {frontmatter.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground justify-center text-sm">
                  <span className="flex items-center gap-2">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {date !== "Unknown date"
                      ? new Date(date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {readingTime}
                  </span>
                </div>
              </div>

              {frontmatter.image && (
                <div className="mb-16">
                  <div className="relative aspect-video w-full max-w-5xl mx-auto">
                    <Image
                      src={frontmatter.image}
                      alt={title}
                      fill
                      className="object-cover rounded-2xl shadow-2xl border border-border/50"
                      priority
                    />
                  </div>
                </div>
              )}

              {/* Elegant Markdown Content */}
              <ClientMDXRenderer mdxSource={mdxSource} />

              {/* Author Section */}
              <div className="mt-8">
                <Author
                  name={validLocale === "ar" ? "مجاهد صيام" : "Mujahid Siyam"}
                  image="/img/profile.png"
                  bio={dict.blog.authorBio}
                  socialLinks={{
                    github: "https://github.com/bymuja",
                    twitter: "https://twitter.com/bymuja",
                    linkedin: "https://linkedin.com/in/bymuja",
                    website: "https://bymuja.com",
                  }}
                />
              </div>

              {/* Next/Previous Navigation */}
              <PostNavigation currentSlug={resolvedParams.slug} locale={validLocale} dict={dict} />

              <RelatedPosts
                currentSlug={resolvedParams.slug}
                category={frontmatter.category}
                locale={validLocale}
                dict={dict}
              />
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}

async function PostNavigation({ currentSlug, locale, dict }: { currentSlug: string; locale: string; dict: any }) {
  const posts = await getBlogPosts(dict);
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) return null;

  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <nav className="mt-16 pt-8 border-t border-border">
      <div
        className={`flex flex-col sm:flex-row justify-between gap-6 ${!previousPost || !nextPost ? "items-center" : ""}`}
      >
        {previousPost && (
          <Link
            href={`/${locale}/blog/${previousPost.slug}`}
            className={`group flex-1 max-w-md ${!nextPost ? "sm:mx-auto" : ""}`}
          >
            <div className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-muted-foreground mb-1">{dict.blog.previous}</div>
                <h4 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">{previousPost.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{previousPost.description}</p>
              </div>
            </div>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/${locale}/blog/${nextPost.slug}`}
            className={`group flex-1 max-w-md ${!previousPost ? "sm:mx-auto" : "ml-auto"}`}
          >
            <div className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-right">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-muted-foreground mb-1">{dict.blog.next}</div>
                <h4 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">{nextPost.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{nextPost.description}</p>
              </div>
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

async function RelatedPosts({
  currentSlug,
  category,
  locale,
  dict,
}: {
  currentSlug: string;
  category?: string;
  locale: string;
  dict: any;
}) {
  const posts = await getBlogPosts(dict);
  const relatedPosts = posts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h3 className="text-2xl font-bold mb-6 text-card-foreground">
        {dict.blog.relatedPosts}
      </h3>
      <div className="grid gap-6 md:grid-cols-4">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group block"
          >
            <article className="backdrop-blur-sm bg-card border border-border rounded-lg p-4 hover:bg-primary/10 transition-colors">
              <h4 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {post.title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>{post.readingTime}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const blogDirectory = join(process.cwd(), "src", "content", "blog");

  try {
    const files = await fs.readdir(blogDirectory);
    const params = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => ({
        slug: file.replace(/\.mdx$/, ""),
      }));
    return params;
  } catch (error) {
    console.error("Error generating blog static params:", error);
    return [];
  }
}
