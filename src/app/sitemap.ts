import { MetadataRoute } from "next";
import { join } from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";

const baseUrl = "https://itsmawja.com";
const defaultLocale = "en";

function toAbsoluteImage(image: string | undefined): string | undefined {
  if (!image) return undefined;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("/")) return `${baseUrl}${image}`;
  return `${baseUrl}/${image}`;
}

function isValidImage(image: string | undefined): boolean {
  if (!image) return false;
  if (image === "/vercel.svg" || image.endsWith("/vercel.svg")) return false;
  return true;
}

async function getBlogPosts(): Promise<MetadataRoute.Sitemap> {
  const blogDirectory = join(process.cwd(), "src", "content", "blog");

  try {
    const files = await fs.readdir(blogDirectory);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "");
          const filePath = join(blogDirectory, file);
          const fileContents = await fs.readFile(filePath, "utf8");
          const { data } = matter(fileContents);
          const stats = await fs.stat(filePath);

          if (data.draft === true) return null;

          const postDate = data.date ? new Date(data.date) : stats.mtime;
          const image = isValidImage(data.image) ? toAbsoluteImage(data.image) : undefined;

          return {
            url: `${baseUrl}/${defaultLocale}/blog/${slug}`,
            lastModified: postDate > stats.mtime ? postDate : stats.mtime,
            changeFrequency: "daily" as const,
            priority: 0.9,
            images: image ? [image] : undefined,
          };
        }),
    );

    return posts.filter((p): p is NonNullable<typeof p> => p !== null);
  } catch {
    return [];
  }
}

async function getProjects(): Promise<MetadataRoute.Sitemap> {
  const projectsDirectory = join(process.cwd(), "src", "content", "projects");

  try {
    const files = await fs.readdir(projectsDirectory, { recursive: true });
    const projects = await Promise.all(
      files
        .filter((file): file is string => typeof file === "string" && file.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "").split("/").pop()!;
          const filePath = join(projectsDirectory, file);
          const fileContents = await fs.readFile(filePath, "utf8");
          const { data } = matter(fileContents);
          const stats = await fs.stat(filePath);

          if (data.draft === true) return null;

          const projDate = data.date ? new Date(data.date) : stats.mtime;
          const image = isValidImage(data.image) ? toAbsoluteImage(data.image) : undefined;

          return {
            url: `${baseUrl}/${defaultLocale}/projects/${slug}`,
            lastModified: projDate > stats.mtime ? projDate : stats.mtime,
            changeFrequency: "daily" as const,
            priority: 0.9,
            images: image ? [image] : undefined,
          };
        }),
    );

    return projects.filter((p): p is NonNullable<typeof p> => p !== null);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/en`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/en/about`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/en/projects`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/en/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/en/now`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/en/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/en/music`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  const blogPosts = await getBlogPosts();
  const projects = await getProjects();

  return [...staticPages, ...blogPosts, ...projects];
}
