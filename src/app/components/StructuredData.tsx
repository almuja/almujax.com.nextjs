export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mujahid Siyam",
    alternateName: ["Muja", "bymuja"],
    description:
      "Mujahid Siyam, also known as Muja (bymuja), is a Software Engineer, AI Engineer, DevSecOps Engineer, and Music Artist building AI-first systems and creative technology. Official source of truth for Mujahid Mohamed Ismail Siyam.",
    url: "https://bymuja.com",
    image: "https://bymuja.com/img/profile.png",
    email: "contact@bymuja.com",
    sameAs: [
      "https://github.com/bymuja",
      "https://twitter.com/bymuja",
      "https://linkedin.com/in/bymuja",
      "https://instagram.com/bymuja",
      "https://youtube.com/@bymuja",
      "https://open.spotify.com/user/bymuja",
      "https://soundcloud.com/bymuja",
      "https://tiktok.com/@bymuja",
    ],
    jobTitle: ["Software Engineer", "AI Engineer", "DevSecOps Engineer", "Music Artist"],
    worksFor: {
      "@type": "Organization",
      name: "Zaroxi Studio",
      url: "https://bymuja.com",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Rust",
      "Software Engineering",
      "DevSecOps",
      "Music Production",
      "AI-first systems",
      "Developer Tools",
      "Open Source",
      "TypeScript",
      "React",
      "Python",
      "Linux",
      "Nix/NixOS",
      "Machine Learning",
      "Full-Stack Development",
    ],
    nationality: {
      "@type": "Country",
      name: "France",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebSiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "bymuja.com — Mujahid Siyam (Muja)",
    url: "https://bymuja.com",
    description:
      "Official source of truth for Mujahid Siyam (Muja), a Software Engineer, AI Engineer, DevSecOps Engineer, and Music Artist building AI-first systems and creative technology.",
    inLanguage: "en",
    about: {
      "@type": "Person",
      name: "Mujahid Siyam",
      alternateName: ["Muja", "bymuja"],
      url: "https://bymuja.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://bymuja.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ArticleStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  image,
  url,
  authorName,
  authorUrl,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  authorName: string;
  authorUrl: string;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    image: image || "https://bymuja.com/img/profile.png",
    url: url,
    author: {
      "@type": "Person",
      name: "Mujahid Siyam",
      alternateName: ["Muja", "bymuja"],
      url: "https://bymuja.com",
    },
    publisher: {
      "@type": "Person",
      name: "Mujahid Siyam",
      url: "https://bymuja.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function SoftwareSourceCodeStructuredData({
  name,
  description,
  url,
  codeRepository,
  dateCreated,
  programmingLanguage,
}: {
  name: string;
  description: string;
  url: string;
  codeRepository?: string;
  dateCreated?: string;
  programmingLanguage?: string[];
}) {
  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name,
    description,
    url,
  };

  if (codeRepository) {
    structuredData.codeRepository = codeRepository;
  }

  if (dateCreated) {
    structuredData.dateCreated = dateCreated;
  }

  if (programmingLanguage?.length) {
    structuredData.programmingLanguage = programmingLanguage;
  }

  structuredData.author = {
    "@type": "Person",
    name: "Mujahid Siyam",
    alternateName: ["Muja", "bymuja"],
    url: "https://bymuja.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
