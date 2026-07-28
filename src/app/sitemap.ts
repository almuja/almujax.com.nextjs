import { MetadataRoute } from "next";
import { join } from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";

const baseUrl = "https://bymuja.com";

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
          const image = data.image || undefined;

          return {
            url: `${baseUrl}/blog/${slug}`,
            lastModified: postDate > stats.mtime ? postDate : stats.mtime,
            changeFrequency: "daily" as const,
            priority: 0.9,
            images: image ? [image] : undefined,
          };
        }),
    );

    return posts.filter(
      (p): p is NonNullable<typeof p> => p !== null,
    );
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
        .filter(
          (file): file is string =>
            typeof file === "string" && file.endsWith(".mdx"),
        )
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "").split("/").pop()!;
          const filePath = join(projectsDirectory, file);
          const fileContents = await fs.readFile(filePath, "utf8");
          const { data } = matter(fileContents);
          const stats = await fs.stat(filePath);

          if (data.draft === true) return null;

          const projDate = data.date ? new Date(data.date) : stats.mtime;
          const image = data.image || undefined;

          return {
            url: `${baseUrl}/projects/${slug}`,
            lastModified:
              projDate > stats.mtime ? projDate : stats.mtime,
            changeFrequency: "daily" as const,
            priority: 0.9,
            images: image ? [image] : undefined,
          };
        }),
    );

    return projects.filter(
      (p): p is NonNullable<typeof p> => p !== null,
    );
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/music`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const blogPosts = await getBlogPosts();
  const projects = await getProjects();

  return [...staticPages, ...blogPosts, ...projects];
}
