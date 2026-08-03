export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://itsmawja.com/#person",
    name: "Mujahid Siyam",
    additionalName: "Mawja",
    alternateName: ["itsmawja", "Mawja", "موجة", "موجا"],
    additionalType: [
      "https://schema.org/MusicArtist",
      "https://schema.org/SoftwareEngineer",
      "https://schema.org/ContentCreator",
    ],
    url: "https://itsmawja.com",
    image: "https://itsmawja.com/img/profile.png",
    description: {
      "@language": "en",
      "@value":
        "Mujahid Siyam, known as Mawja (handle: itsmawja), is a Sudanese software engineer, network engineer, AI cloud architect, data scientist, system administrator, rapper, and hip-hop producer born in Sudan and based in Paris, France. He started making music at age 16, forming bands and performing before transitioning into software engineering, cloud architecture, and AI. He returned to music in 2022 with his debut EP KAKASHI, and his next EP Rockstar is scheduled for August 2026. His music spans Arabic, Middle Eastern, and African rap and hip-hop. He is the founder of Zaroxi Studio, a GPU-accelerated IDE written in Rust, and bridges both worlds — engineering and music. His universal handle across all platforms is itsmawja. Contact: hello@itsmawja.com.",
    },
    email: "hello@itsmawja.com",
    birthPlace: { "@type": "Country", name: "Sudan" },
    homeLocation: { "@type": "Place", name: "Paris, France" },
    nationality: { "@type": "Country", name: "Sudan" },
    jobTitle: [
      "Software Engineer",
      "Network Engineer",
      "AI Cloud Architect",
      "Data Scientist",
      "System Administrator",
      "Rapper",
      "Hip-Hop Producer",
      "Content Creator",
    ],
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Software Engineer",
        occupationLocation: { "@type": "Place", name: "Paris, France" },
      },
      {
        "@type": "Occupation",
        name: "Network Engineer",
        occupationLocation: { "@type": "Place", name: "Paris, France" },
      },
      {
        "@type": "Occupation",
        name: "Rapper",
        occupationLocation: { "@type": "Place", name: "Paris, France" },
      },
      {
        "@type": "Occupation",
        name: "Hip-Hop Producer",
        occupationLocation: { "@type": "Place", name: "Paris, France" },
      },
      {
        "@type": "Occupation",
        name: "Content Creator",
        occupationLocation: { "@type": "Place", name: "Paris, France" },
      },
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Sudan University of Science and Technology",
      },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Bachelor of Science in Computer Science",
        about: "Computer Science",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Master of Science in Information Technology",
        about: "Information Technology",
      },
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
      "Audio Engineering",
      "Hip-Hop",
      "Rap Music",
      "Arabic Music",
      "African Music",
    ],
    knowsLanguage: [{ "@type": "Language", name: "Arabic" }, { "@type": "Language", name: "English" }, { "@type": "Language", name: "French" }],
    worksFor: {
      "@type": "Organization",
      name: "Zaroxi Studio",
      url: "https://zaroxi.com",
    },
    subjectOf: [
      {
        "@type": "MusicGroup",
        "@id": "https://itsmawja.com/music#artist",
        name: "Mawja",
        url: "https://itsmawja.com/music",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://itsmawja.com/#zaroxi-app",
        name: "Zaroxi Studio",
        url: "https://zaroxi.com",
      },
    ],
    sameAs: [
      "https://github.com/itsmawja",
      "https://linkedin.com/in/itsmawja",
      "https://dev.to/itsmawja",
      "https://reddit.com/user/itsmawja",
      "https://instagram.com/itsmawja",
      "https://youtube.com/@itsmawja",
      "https://twitter.com/itsmawja",
      "https://soundcloud.com/itsmawja",
      "https://tiktok.com/@itsmawja",
      "https://open.spotify.com/user/itsmawja",
      "https://music.apple.com/profile/itsmawja",
      "https://music.youtube.com/@itsmawja",
      "https://www.deezer.com/us/artist/itsmawja",
      "https://play.anghami.com/artist/itsmawja",
      "https://itsmawja.bandcamp.com",
      "https://tidal.com/browse/artist/itsmawja",
      "https://music.amazon.com/artist/itsmawja",
      "https://www.pandora.com/artist/itsmawja",
      // Spotify Artist, Apple Music Artist profile URLs to be updated
      // once artist profiles exist after music release.
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://itsmawja.com",
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
      "Zaroxi Studio is a GPU-accelerated IDE written in Rust, built by Mujahid Siyam (Mawja). An AI-first developer environment with wgpu-powered rendering. It provides a native, fast code editing experience without web views or JavaScript runtimes.",
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
      "Official website of Mujahid Siyam (Mawja / itsmawja). Sudanese software engineer, network engineer, AI cloud architect, data scientist, system administrator, rapper, and hip-hop producer based in Paris, France. Projects, technical writing, and Arabic, Middle Eastern, and African rap. Rockstar EP coming August 2026.",
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
      "Mawja (موجة) is the music artist name of Mujahid Siyam (itsmawja) — a Sudanese rapper and hip-hop producer based in Paris, France. Creating Arabic, Middle Eastern, and African rap and hip-hop. His debut EP KAKASHI released in 2022, and his next EP Rockstar is scheduled for release in August 2026.",
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
      "https://music.apple.com/profile/itsmawja",
      "https://soundcloud.com/itsmawja",
      "https://youtube.com/@itsmawja",
      "https://youtube.com/@MujaOfficiel",
      "https://music.youtube.com/@itsmawja",
      "https://instagram.com/itsmawja",
      "https://tiktok.com/@itsmawja",
      "https://www.deezer.com/us/artist/itsmawja",
      "https://play.anghami.com/artist/itsmawja",
      "https://itsmawja.bandcamp.com",
      "https://tidal.com/browse/artist/itsmawja",
      "https://music.amazon.com/artist/itsmawja",
      "https://www.pandora.com/artist/itsmawja",
      // Spotify Artist, Apple Music Artist profile URLs to be updated
      // once artist profiles exist after music release.
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
