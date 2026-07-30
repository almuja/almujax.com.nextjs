"use client";

import "highlight.js/styles/github-dark.css";
import "./mdx-code.css";

interface ClientMDXRendererProps {
  html: string;
}

export default function ClientMDXRenderer({ html }: ClientMDXRendererProps) {
  if (!html) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-muted/30 rounded w-3/4"></div>
        <div className="h-4 bg-muted/30 rounded w-1/2"></div>
        <div className="h-4 bg-muted/30 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <article
      className="prose-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
