const arDescription =
  "مجاهد صيام المعروف أيضاً باسم موجا (bymuja)، مهندس برمجيات ومهندس ذكاء اصطناعي وفنان موسيقي باسم Muja. راب عربي، راب سوداني، موسيقى وتكنولوجيا. الموقع الرسمي.";

const frDescription =
  "Mujahid Siyam, également connu sous le nom de Muja (bymuja), est un ingénieur logiciel, ingénieur IA et artiste musical sous le nom Muja. Rap arabe, rap soudanais, musique et technologie. Site officiel.";

const enMusicDescription =
  "Muja is the music artist name of Mujahid Siyam (bymuja) — Arabic Rap and Sudanese Rap artist.";

export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mujahid Siyam",
    alternateName: ["Muja", "bymuja", "مجاهد صيام", "موجا"],
    description:
      "Mujahid Siyam, also known as Muja (bymuja), is a Software Engineer, AI Engineer, DevSecOps Engineer, and Music Artist. Muja (موجا) is his music artist name for Arabic Rap and Sudanese Rap. " +
      enMusicDescription +
      " " +
      arDescription +
      " " +
      frDescription,
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
      "https://music.youtube.com/@bymuja",
      "https://music.apple.com/profile/bymuja",
    ],
    jobTitle: [
      "Software Engineer",
      "AI Engineer",
      "DevSecOps Engineer",
      "Music Artist",
      "مهندس برمجيات",
      "مهندس ذكاء اصطناعي",
      "فنان موسيقي",
      "Ingénieur logiciel",
      "Ingénieur IA",
      "Artiste musical",
    ],
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
      "Arabic Rap",
      "Sudanese Rap",
      "راب عربي",
      "راب سوداني",
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
    knowsLanguage: ["Arabic", "English", "French", "العربية", "English", "français"],
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
    name: "bymuja.com — Mujahid Siyam (Muja) | راب عربي وسوداني",
    url: "https://bymuja.com",
    description:
      "Official source of truth for Mujahid Siyam (Muja), a Software Engineer, AI Engineer, DevSecOps Engineer, and Music Artist (Arabic Rap, Sudanese Rap) building AI-first systems and creative technology. الموقع الرسمي لمجاهد سيام.",
    inLanguage: ["en", "ar", "fr"],
    about: {
      "@type": "Person",
      name: "Mujahid Siyam",
      alternateName: ["Muja", "bymuja", "مجاهد صيام", "موجا"],
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
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: "Mujahid Siyam",
      alternateName: ["Muja", "bymuja", "مجاهد صيام", "موجا"],
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
    alternateName: ["Muja", "bymuja", "مجاهد صيام", "موجا"],
    url: "https://bymuja.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function MusicArtistStructuredData() {
  const musicSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Muja",
    alternateName: ["Muja", "موجا", "bymuja"],
    description:
      "Muja (موجا) is the music artist name of Mujahid Siyam — Arabic Rap and Sudanese Rap artist. Combining technology and music, Muja creates rap music with modern production.",
    url: "https://bymuja.com/music",
    image: "https://bymuja.com/img/profile.png",
    genre: ["Arabic Rap", "Sudanese Rap", "Hip Hop", "راب عربي", "راب سوداني"],
    sameAs: [
      "https://open.spotify.com/user/bymuja",
      "https://soundcloud.com/bymuja",
      "https://youtube.com/@bymuja",
      "https://music.youtube.com/@bymuja",
      "https://instagram.com/bymuja",
      "https://tiktok.com/@bymuja",
    ],
    founder: {
      "@type": "Person",
      name: "Mujahid Siyam",
      alternateName: ["Muja", "bymuja", "مجاهد صيام", "موجا"],
      url: "https://bymuja.com",
    },
    inLanguage: ["en", "ar", "fr"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(musicSchema) }}
    />
  );
}
