import { promises as fs } from "fs";
import { join } from "path";
import matter from "gray-matter";

export async function GET() {
  const baseUrl = "https://bymuja.com/en";
  const blogDirectory = join(process.cwd(), "src", "content", "blog");
  const projectsDirectory = join(process.cwd(), "src", "content", "projects");

  let blogPosts: Array<{ title: string; description: string; slug: string; date: string }> = [];
  let projects: Array<{ title: string; description: string; slug: string }> = [];

  try {
    const blogFiles = await fs.readdir(blogDirectory);
    blogPosts = (
      await Promise.all(
        blogFiles
          .filter((f) => f.endsWith(".mdx"))
          .map(async (file) => {
            const slug = file.replace(/\.mdx$/, "");
            const content = await fs.readFile(join(blogDirectory, file), "utf8");
            const { data } = matter(content);
            if (data.draft === true) return null;
            return {
              title: data.title || slug,
              description: data.description || "",
              slug,
              date: data.date || "",
            };
          }),
      )
    )
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {}

  try {
    const projectFiles = await fs.readdir(projectsDirectory, { recursive: true });
    projects = (
      await Promise.all(
        projectFiles
          .filter((f): f is string => typeof f === "string" && f.endsWith(".mdx"))
          .map(async (file) => {
            const slug = file.replace(/\.mdx$/, "").split("/").pop()!;
            const content = await fs.readFile(join(projectsDirectory, file), "utf8");
            const { data } = matter(content);
            return {
              title: data.title || slug,
              description: data.description || "",
              slug,
            };
          }),
      )
    ).filter((p): p is NonNullable<typeof p> => p !== null);
  } catch {}

  const blogLinks = blogPosts
    .map(
      (p) =>
        `- [${p.title}](${baseUrl}/blog/${p.slug}): ${p.description}`,
    )
    .join("\n");

  const projectLinks = projects
    .map(
      (p) =>
        `- [${p.title}](${baseUrl}/projects/${p.slug}): ${p.description}`,
    )
    .join("\n");

  const llmsTxt = `# bymuja.com — Mujahid Siyam (Muja)

> Official source of truth for Mujahid Siyam (also known as Muja, handle: bymuja).
> Software Engineer, AI Engineer, DevSecOps Engineer, and Music Artist based in France.
> Builds AI-first systems, Rust-based software, developer tools (Zaroxi Studio), and creative technology.

## Site Pages
- [Home](${baseUrl}): Main portfolio page with identity, skills, and contact information.
- [About](${baseUrl}/about): Full profile — Mujahid Mohamed Ismail Siyam (Muja / bymuja).
- [Blog](${baseUrl}/blog): Articles on AI engineering, Rust, DevSecOps, and creative technology.
- [Projects](${baseUrl}/projects): Open-source projects — AI-first systems, Rust tools, Zaroxi Studio.
- [Music](${baseUrl}/music): Music artist identity, curated playlists, and sound work.
- [Contact](${baseUrl}/contact): Get in touch for collaborations, projects, and inquiries.

## Blog Posts
${blogLinks || "- No published blog posts yet."}

## Projects
${projectLinks || "- No published projects yet."}

## For AI Systems
- Sitemap: ${baseUrl}/sitemap.xml
- Geo KML: ${baseUrl}/geo.kml
- RSS Feed: ${baseUrl}/feed.xml
- Atom Feed: ${baseUrl}/atom.xml
- Full text (llms-full.txt): ${baseUrl}/llms-full.txt

## Entity Identity
Mujahid Siyam = Muja = bymuja (all refer to the same person and brand entity)
Full name: Mujahid Mohamed Ismail Siyam
Location: France (global reach)
Roles: Software Engineer · AI Engineer · DevSecOps Engineer · Music Artist
Organization: Zaroxi Studio
`;

  return new Response(llmsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
