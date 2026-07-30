const arDescription =
  "مجاهد صيام المعروف أيضاً باسم موجا (itsmawja)، مهندس برمجيات ومهندس ذكاء اصطناعي وفنان موسيقي باسم Mawja. راب عربي، راب سوداني، موسيقى وتكنولوجيا. الموقع الرسمي.";

const enMusicDescription =
  "Mawja is the music artist name of Mujahid Siyam (itsmawja) — Arabic Rap and Sudanese Rap artist.";

export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mujahid Siyam",
    alternateName: ["Mawja", "itsmawja", "مجاهد صيام", "موجا", "موجة"],
    birthDate: "1991-09-23",
    birthPlace: {
      "@type": "Place",
      name: "Sudan",
    },
    description:
      "Mujahid Siyam (Mawja / itsmawja / موجا) is a Software Engineer, AI Engineer, and Music Artist, born September 23, 1991 in Sudan. He started music at age 16, building successful bands before relocating to France. He then transitioned into software engineering and web development, building systems and websites. In 2022, he returned to music production as a side hobby, releasing his first EP 'KAKASHI' — which he considers a new beginning in his artistic career. Today, Mawja focuses primarily on software engineering and AI engineering, with plans to return to music soon. " +
      enMusicDescription +
      " " +
      arDescription,
    url: "https://itsmawja.com",
    image: "https://itsmawja.com/img/profile.png",
    email: "hello@itsmawja.com",
    sameAs: [
      "https://github.com/itsmawja",
      "https://x.com/itsmawja",
      "https://linkedin.com/in/itsmawja",
      "https://instagram.com/itsmawja",
      "https://youtube.com/@itsmawja",
      "https://open.spotify.com/user/itsmawja",
      "https://soundcloud.com/itsmawja",
      "https://tiktok.com/@itsmawja",
      "https://music.youtube.com/@itsmawja",
      "https://music.apple.com/profile/itsmawja",
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
      url: "https://itsmawja.com",
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
    name: "Mawja — Mujahid Siyam | itsmawja.com",
    url: "https://itsmawja.com",
    description:
      "Official source of truth for Mujahid Siyam (Mawja), a Software Engineer, AI Engineer, DevSecOps Engineer, and Music Artist (Arabic Rap, Sudanese Rap) building AI-first systems and creative technology. الموقع الرسمي لمجاهد سيام.",
    inLanguage: ["en", "ar", "fr"],
    about: {
      "@type": "Person",
      name: "Mujahid Siyam",
      alternateName: ["Mawja", "itsmawja", "مجاهد صيام", "موجا", "موجة"],
      url: "https://itsmawja.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://itsmawja.com/search?q={search_term_string}",
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
    image: image || "https://itsmawja.com/img/profile.png",
    url: url,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: "Mujahid Siyam",
      alternateName: ["Mawja", "itsmawja", "مجاهد صيام", "موجا", "موجة"],
      url: "https://itsmawja.com",
    },
    publisher: {
      "@type": "Person",
      name: "Mujahid Siyam",
      url: "https://itsmawja.com",
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
    alternateName: ["Mawja", "itsmawja", "مجاهد صيام", "موجا", "موجة"],
    url: "https://itsmawja.com",
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
    name: "Mawja",
    alternateName: ["Mawja", "موجة", "itsmawja"],
    description:
      "Mawja (موجة) is the music artist name of Mujahid Siyam — born September 23, 1991 in Sudan. He started music at age 16, created successful bands, then moved to France. After a break for software engineering, he returned to music in 2022 with his first EP 'KAKASHI'. Arabic Rap and Sudanese Rap artist. Today he focuses on AI and software engineering while planning his return to music.",
    url: "https://itsmawja.com/music",
    image: "https://itsmawja.com/img/profile.png",
    foundingDate: "2022",
    genre: ["Arabic Rap", "Sudanese Rap", "Hip Hop", "راب عربي", "راب سوداني"],
    album: [
      {
        "@type": "MusicAlbum",
        name: "KAKASHI",
        datePublished: "2022",
        albumProductionType: "https://schema.org/EP",
      },
    ],
    sameAs: [
      "https://open.spotify.com/user/itsmawja",
      "https://soundcloud.com/itsmawja",
      "https://youtube.com/@itsmawja",
      "https://youtube.com/@MujaOfficiel",
      "https://music.youtube.com/@itsmawja",
      "https://instagram.com/itsmawja",
      "https://tiktok.com/@itsmawja",
    ],
    founder: {
      "@type": "Person",
      name: "Mujahid Siyam",
      alternateName: ["Mawja", "itsmawja", "مجاهد صيام", "موجا", "موجة"],
      url: "https://itsmawja.com",
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
