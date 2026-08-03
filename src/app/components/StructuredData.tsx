export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://itsmawja.com/#person",
    name: "Mujahid Siyam",
    additionalName: "Mawja",
    alternateName: ["itsmawja", "Mawja"],
    url: "https://itsmawja.com",
    description:
      "Sudanese software engineer and hip-hop artist/producer based in Paris, France. Known as Mawja, creating Arabic, Middle Eastern, and African rap and hip-hop. Founder of Zaroxi Studio, a GPU-accelerated IDE written in Rust.",
    birthPlace: { "@type": "Country", name: "Sudan" },
    homeLocation: { "@type": "Place", name: "Paris, France" },
    jobTitle: [
      "Software Engineer",
      "Network Engineer",
      "AI Cloud Architect",
      "Data Scientist",
      "System Administrator",
      "Music Artist",
      "Music Producer",
      "Content Creator",
    ],
    knowsAbout: [
      "Software Engineering",
      "Network Engineering",
      "Cloud Architecture",
      "Artificial Intelligence",
      "Data Science",
      "Linux Administration",
      "Windows Server Administration",
      "Rust Programming",
      "Music Production",
      "Hip-Hop",
      "Rap Music",
      "Arabic Music",
      "African Music",
    ],
    knowsLanguage: ["ar", "en", "fr"],
    nationality: { "@type": "Country", name: "Sudan" },
    worksFor: { "@type": "Organization", name: "Zaroxi Studio", url: "https://zaroxi.com" },
    sameAs: [
      "https://github.com/itsmawja",
      "https://linkedin.com/in/itsmawja",
      "https://dev.to/itsmawja",
      "https://reddit.com/user/itsmawja",
      "https://instagram.com/itsmawja",
      "https://youtube.com/@itsmawja",
      "https://twitter.com/itsmawja",
      // Spotify, Apple Music, Anghami, Deezer, and Tidal artist profile URLs
      // to be added here once those profiles exist after music release.
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function PerformingArtistStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://itsmawja.com/#person",
    name: "Mujahid Siyam",
    additionalName: "Mawja",
    alternateName: ["itsmawja", "Mawja"],
    url: "https://itsmawja.com",
    description:
      "Performing artist identity of Mujahid Siyam, known as Mawja. Sudanese rapper and hip-hop producer creating Arabic, Middle Eastern, and African rap. KAKASHI EP (2022). Rockstar EP coming August 2026.",
    sameAs: [
      "https://instagram.com/itsmawja",
      "https://youtube.com/@itsmawja",
      "https://twitter.com/itsmawja",
      // Spotify, Apple Music, Anghami, Deezer, and Tidal artist profile URLs
      // to be added here once those profiles exist after music release.
    ],
    subjectOf: {
      "@type": "MusicGroup",
      "@id": "https://itsmawja.com/music#artist",
      name: "Mawja",
      url: "https://itsmawja.com/music",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function FaqPageStructuredData({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function SoftwareApplicationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://itsmawja.com/#zaroxi-app",
    name: "Zaroxi Studio",
    url: "https://zaroxi.com",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    description:
      "Zaroxi Studio is a GPU-accelerated IDE written in Rust, built by Mujahid Siyam (Mawja). An AI-first developer environment with wgpu-powered rendering.",
    programmingLanguage: "Rust",
    author: {
      "@type": "Person",
      "@id": "https://itsmawja.com/#person",
      name: "Mujahid Siyam",
      url: "https://itsmawja.com",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://itsmawja.com/#org",
    name: "Zaroxi Studio",
    url: "https://zaroxi.com",
    description:
      "Zaroxi Studio is the software development and creative technology company founded by Mujahid Siyam (Mawja). Building AI-first systems, developer tools, and creative technology solutions including a GPU-accelerated IDE written in Rust.",
    logo: "https://itsmawja.com/img/profile.png",
    image: "https://itsmawja.com/img/profile.png",
    email: "hello@itsmawja.com",
    foundingDate: "2023",
    founder: {
      "@type": "Person",
      "@id": "https://itsmawja.com/#person",
      name: "Mujahid Siyam",
      url: "https://itsmawja.com",
    },
    sameAs: [
      "https://github.com/itsmawja",
      "https://linkedin.com/in/itsmawja",
    ],
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
    "@id": "https://itsmawja.com/#website",
    name: "Mawja — Mujahid Siyam | itsmawja.com",
    url: "https://itsmawja.com",
    description:
      "Official website of Mujahid Siyam (Mawja / itsmawja). Sudanese software engineer, network engineer, AI cloud architect, data scientist, system administrator, and hip-hop artist/producer based in Paris, France. Projects, technical writing, and Arabic, Middle Eastern, and African rap. Rockstar EP coming August 2026.",
    inLanguage: ["en", "ar", "fr"],
    about: {
      "@type": "Person",
      "@id": "https://itsmawja.com/#person",
      name: "Mujahid Siyam",
      alternateName: ["Mawja", "itsmawja"],
      url: "https://itsmawja.com",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://itsmawja.com/#org",
      name: "Zaroxi Studio",
      url: "https://zaroxi.com",
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
    "@id": `${url}#article`,
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    image: image || "https://itsmawja.com/img/profile.png",
    url: url,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      "@id": "https://itsmawja.com/#person",
      name: "Mujahid Siyam",
      alternateName: ["Mawja", "itsmawja"],
      url: "https://itsmawja.com",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://itsmawja.com/#org",
      name: "Zaroxi Studio",
      url: "https://zaroxi.com",
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
    "@id": `${url}#code`,
    name,
    description,
    url,
    author: {
      "@type": "Person",
      "@id": "https://itsmawja.com/#person",
      name: "Mujahid Siyam",
      alternateName: ["Mawja", "itsmawja"],
      url: "https://itsmawja.com",
    },
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
    "@id": "https://itsmawja.com/music#artist",
    name: "Mawja",
    alternateName: ["Mawja", "itsmawja", "موجة"],
    description:
      "Mawja (موجة) is the music artist name of Mujahid Siyam (itsmawja) — Sudanese rapper and hip-hop producer based in Paris, France. Creating Arabic, Middle Eastern, and African rap and hip-hop. His debut EP KAKASHI released in 2022, and his next EP Rockstar is scheduled for release in August 2026.",
    url: "https://itsmawja.com/music",
    image: "https://itsmawja.com/img/profile.png",
    foundingDate: "2022",
    genre: [
      "Arabic Rap",
      "Middle Eastern Rap",
      "Sudanese Rap",
      "African Rap",
      "Hip Hop",
      "راب عربي",
      "راب سوداني",
    ],
    album: [
      {
        "@type": "MusicAlbum",
        "@id": "https://itsmawja.com/music#kakashi",
        name: "KAKASHI",
        datePublished: "2022",
        albumProductionType: "https://schema.org/EP",
        url: "https://itsmawja.com/music",
      },
      {
        "@type": "MusicAlbum",
        "@id": "https://itsmawja.com/music#rockstar",
        name: "Rockstar",
        datePublished: "2026-08",
        albumProductionType: "https://schema.org/EP",
        url: "https://itsmawja.com/music",
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
      // Spotify Artist, Apple Music Artist, Anghami, Deezer, and Tidal artist profile URLs
      // to be added once those profiles exist after music release.
    ],
    founder: {
      "@type": "Person",
      "@id": "https://itsmawja.com/#person",
      name: "Mujahid Siyam",
      alternateName: ["Mawja", "itsmawja"],
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
