"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import "./mdx-code.css";

interface ClientMDXRendererProps {
  mdxSource: MDXRemoteSerializeResult;
}

export default function ClientMDXRenderer({ mdxSource }: ClientMDXRendererProps) {
  if (!mdxSource) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <article className="prose-content">
        <MDXRemote
          {...mdxSource}
          components={{
            style: () => null,
            h1: ({ children }) => (
              <h1 className="text-4xl font-bold text-foreground mb-8 mt-12 leading-tight tracking-tight border-b border-border/50 pb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl font-semibold text-foreground mb-6 mt-10 leading-tight tracking-tight">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl font-semibold text-foreground mb-4 mt-8 leading-snug">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-xl font-medium text-foreground mb-3 mt-6 leading-snug">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="text-foreground/90 leading-8 text-lg mb-6 font-light">
                {children}
              </p>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-foreground/90">{children}</em>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary/60 bg-muted/20 pl-6 py-4 my-8 italic text-foreground/80 text-lg leading-8 rounded-r-lg">
                {children}
              </blockquote>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-3 mb-6 text-foreground/90 text-lg leading-7">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-3 mb-6 text-foreground/90 text-lg leading-7">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="pl-2">{children}</li>,
            code: ({ children, className }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-muted/50 px-2 py-1 rounded-md text-foreground font-mono text-sm border border-border/50">
                    {children}
                  </code>
                );
              }
              return <code className={className}>{children}</code>;
            },
            pre: ({ children }) => (
              <pre className="my-8 rounded-xl border border-border/50 overflow-x-auto shadow-lg">
                {children}
              </pre>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-8 border border-border rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-border border-collapse">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-muted/50">{children}</thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-border bg-background">{children}</tbody>
            ),
            tr: ({ children }) => (
              <tr className="even:bg-muted/20 border-b border-border">{children}</tr>
            ),
            th: ({ children }) => (
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground border-r border-border last:border-r-0">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-6 py-4 text-sm text-foreground/90 border-r border-border last:border-r-0 whitespace-normal">
                {children}
              </td>
            ),
            a: ({ children, href }) => (
              <a href={href} className="text-primary font-medium no-underline border-b border-primary/30 hover:border-primary transition-colors duration-200">
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              <img src={src} alt={alt} className="rounded-2xl shadow-lg my-8 mx-auto border border-border/50 max-w-full" />
            ),
            hr: () => <hr className="my-12 border-border/50" />,
          }}
        />
      </article>
    </div>
  );
}
