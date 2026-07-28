import { promises as fs } from "fs";
import { join } from "path";
import matter from "gray-matter";

export async function GET() {
  const baseUrl = "https://bymuja.com";
  const blogDirectory = join(process.cwd(), "src", "content", "blog");
  const projectsDirectory = join(process.cwd(), "src", "content", "projects");

  let sections: string[] = [];

  sections.push(`# bymuja.com — Full Content for AI Indexing
## Mujahid Siyam (Muja / bymuja)

Mujahid Siyam, also known as Muja (bymuja), is a Software Engineer, AI Engineer, DevSecOps Engineer, and Music Artist based in France with global reach. His full name is Mujahid Mohamed Ismail Siyam. He builds AI-first systems, Rust-based software, and developer tools through Zaroxi Studio. This website (bymuja.com) is the official source of truth for Mujahid Siyam (Muja).

### Entity Identity
- Primary name: Mujahid Siyam
- Full name: Mujahid Mohamed Ismail Siyam
- Also known as: Muja
- Handle/username: bymuja
- Mujahid Siyam = Muja = bymuja (all same person, same brand)
- Roles: Software Engineer, AI Engineer, DevSecOps Engineer, Music Artist
- Organization: Zaroxi Studio
- Location: France (global audience)
- Website: ${baseUrl}

### Social Profiles
- GitHub: https://github.com/bymuja
- Twitter: https://twitter.com/bymuja
- LinkedIn: https://linkedin.com/in/bymuja
- Instagram: https://instagram.com/bymuja
- YouTube: https://youtube.com/@bymuja
- Spotify: https://open.spotify.com/user/bymuja
- SoundCloud: https://soundcloud.com/bymuja
- TikTok: https://tiktok.com/@bymuja
- Email: contact@bymuja.com

### Expertise
Artificial Intelligence, Rust, Software Engineering, DevSecOps, Music Production, AI-first systems, Developer Tools, Open Source, TypeScript, React, Python, Linux, Nix/NixOS, Machine Learning, Full-Stack Development

---

`);

  try {
    const blogFiles = await fs.readdir(blogDirectory);
    const posts = await Promise.all(
      blogFiles
        .filter((f) => f.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "");
          const content = await fs.readFile(join(blogDirectory, file), "utf8");
          const { data, content: body } = matter(content);
          if (data.draft === true) return null;
          return { slug, title: data.title, description: data.description, date: data.date, tags: data.tags, category: data.category, body };
        }),
    );

    const published = posts.filter((p): p is NonNullable<typeof p> => p !== null);
    if (published.length > 0) {
      sections.push("## Blog Posts\n");
      for (const post of published) {
        sections.push(
          `### ${post.title}\n` +
          `URL: ${baseUrl}/blog/${post.slug}\n` +
          `Date: ${post.date || "Unknown"}\n` +
          `Category: ${post.category || "Uncategorized"}\n` +
          `Tags: ${(post.tags || []).join(", ")}\n\n` +
          `${post.body}\n\n---\n`,
        );
      }
    }
  } catch {}

  try {
    const projectFiles = await fs.readdir(projectsDirectory, { recursive: true });
    const projs = await Promise.all(
      projectFiles
        .filter((f): f is string => typeof f === "string" && f.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "").split("/").pop()!;
          const content = await fs.readFile(join(projectsDirectory, file), "utf8");
          const { data, content: body } = matter(content);
          return { slug, title: data.title, description: data.description, body, githubUrl: data.githubUrl, liveUrl: data.liveUrl };
        }),
    );

    if (projs.length > 0) {
      sections.push("## Projects\n");
      for (const proj of projs) {
        sections.push(
          `### ${proj.title}\n` +
          `URL: ${baseUrl}/projects/${proj.slug}\n` +
          `GitHub: ${proj.githubUrl || "N/A"}\n` +
          `Live: ${proj.liveUrl || "N/A"}\n\n` +
          `${proj.body}\n\n---\n`,
        );
      }
    }
  } catch {}

  const fullText = sections.join("\n");

  return new Response(fullText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
