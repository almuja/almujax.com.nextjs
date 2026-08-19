export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://almujax.com/#person",
    name: "Mujahid Siyam",
    additionalName: "Almuja",
    alternateName: ["almujax", "Almuja", "الموجا", "الموجة", "الموجه"],
    url: "https://almujax.com",
    description:
      "Mujahid Siyam, known as Almuja (الموجا, also spelt الموجة/الموجه — Arabic for 'the wave'), online handle almujax. Sudanese new things engineer, AI cloud architect, rapper, music producer, and content creator born in Sudan and based in Paris, France. He started making music at age 16 in Sudan, forming bands and performing before ever touching a computer. After relocating to France, he transitioned into software engineering, AI engineering, cloud architecture, and systems administration, building production systems with Rust, TypeScript, Python and managing infrastructure with Terraform, Ansible, Docker, Kubernetes on AWS. He administers Linux and Windows servers and works with PostgreSQL, MySQL, MongoDB, and Redis. In 2022, after a long silence, he returned to music production and released his debut EP KAKASHI under the name Almuja — a raw, honest project marking the beginning of his return. His next EP Rockstar is scheduled for August 2026, representing a bigger, more focused chapter. His music spans Arabic, Middle Eastern, and African rap and hip-hop, blending his Sudanese roots with his life in Europe. He is the founder of Zaroxi Studio, a GPU-accelerated IDE written in Rust, and the creator of MujaOS, a NixOS-based operating system. He bridges both worlds — engineering and music — from Paris. His universal handle across all platforms is almujax. Contact: hello@almujax.com.",
    birthPlace: { "@type": "Country", name: "Sudan" },
    homeLocation: {
      "@type": "Place",
      name: "Paris, France",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
    },
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
    worksFor: {
      "@type": "Organization",
      name: "Zaroxi Studio",
      url: "https://zaroxi.com",
    },
    sameAs: [
      "https://github.com/almujax",
      "https://linkedin.com/in/almujax",
      "https://dev.to/almujax",
      "https://reddit.com/user/almujax",
      "https://instagram.com/almujax",
      "https://youtube.com/@almujax",
      "https://twitter.com/almujax",
      "https://soundcloud.com/almujax",
      "https://tiktok.com/@almujax",
      "https://open.spotify.com/artist/24n3um6erIOUxobs69qDPX",
      "https://music.apple.com/fr/artist/almuja/6800033494",
      "https://music.youtube.com/@almujaofficial",
      "https://www.deezer.com/en/artist/409144252",
      "https://play.anghami.com/artist/29651679",
      "https://almujax.bandcamp.com",
      "https://tidal.com/browse/artist/almujax",
      "https://music.amazon.fr/artists/B0HDMF43R7",
      "https://www.pandora.com/artist/almujax",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ArtistPersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://almujax.com/#artist",
    name: "Almuja",
    additionalName: "Mujahid Siyam",
    alternateName: [
      "almujax",
      "Almuja",
      "الموجا",
      "الموجة",
      "الموجه",
      "Mujahid Siyam",
    ],
    url: "https://almujax.com/music",
    description:
      "Almuja (الموجا, also spelled الموجة / الموجه — Arabic for 'the wave') is the artist stage name of Mujahid Siyam. Sudanese rapper and hip-hop producer creating Arabic, Middle Eastern, and African rap. Debut EP KAKASHI (2022). Next EP Rockstar coming August 2026.",
    birthPlace: { "@type": "Country", name: "Sudan" },
    homeLocation: {
      "@type": "Place",
      name: "Paris, France",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
    },
    jobTitle: ["Rapper", "Hip-Hop Producer", "Music Artist"],
    knowsAbout: [
      "Arabic Rap",
      "Middle Eastern Rap",
      "Sudanese Rap",
      "African Rap",
      "Hip-Hop",
      "Music Production",
    ],
    genre: [
      "Arabic Rap",
      "Middle Eastern Rap",
      "Sudanese Rap",
      "African Rap",
      "Hip Hop",
    ],
    knowsLanguage: ["ar", "en", "fr"],
    nationality: { "@type": "Country", name: "Sudan" },
    sameAs: [
      "https://instagram.com/almujax",
      "https://youtube.com/@almujaofficial",
      "https://youtube.com/@almujax",
      "https://twitter.com/almujax",
      "https://soundcloud.com/almujax",
      "https://tiktok.com/@almujax",
      "https://open.spotify.com/artist/24n3um6erIOUxobs69qDPX",
      "https://music.apple.com/fr/artist/almuja/6800033494",
      "https://music.youtube.com/@almujaofficial",
      "https://www.deezer.com/en/artist/409144252",
      "https://play.anghami.com/artist/29651679",
      "https://almujax.bandcamp.com",
      "https://tidal.com/browse/artist/almujax",
      "https://music.amazon.fr/artists/B0HDMF43R7",
      "https://www.pandora.com/artist/almujax",
    ],
    subjectOf: {
      "@type": "MusicGroup",
      "@id": "https://almujax.com/music#artist",
      name: "Almuja",
      url: "https://almujax.com/music",
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
    "@id": "https://almujax.com/#zaroxi-app",
    name: "Zaroxi Studio",
    url: "https://zaroxi.com",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    description:
      "Zaroxi Studio is a GPU-accelerated IDE written in Rust, built by Mujahid Siyam (Almuja). An AI-first developer environment with wgpu-powered rendering.",
    programmingLanguage: "Rust",
    author: {
      "@type": "Person",
      "@id": "https://almujax.com/#person",
      name: "Mujahid Siyam",
      url: "https://almujax.com",
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
    "@id": "https://almujax.com/#org",
    name: "Zaroxi Studio",
    url: "https://zaroxi.com",
    description:
      "Zaroxi Studio is the software development and creative technology company founded by Mujahid Siyam (Almuja). Building AI-first systems, developer tools, and creative technology solutions including a GPU-accelerated IDE written in Rust.",
    logo: "https://almujax.com/img/profile.png?v=3",
    image: "https://almujax.com/img/profile.png?v=3",
    email: "hello@almujax.com",
    foundingDate: "2023",
    location: {
      "@type": "Place",
      name: "Paris, France",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
    },
    founder: {
      "@type": "Person",
      "@id": "https://almujax.com/#person",
      name: "Mujahid Siyam",
      url: "https://almujax.com",
    },
    sameAs: ["https://github.com/almujax", "https://linkedin.com/in/almujax"],
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
    "@id": "https://almujax.com/#website",
    name: "Almuja",
    url: "https://almujax.com",
    description:
      "Official website of Mujahid Siyam, known as Almuja (handle: almujax) — a Sudanese software engineer, network engineer, AI cloud architect, data scientist, system administrator, rapper, and hip-hop producer born in Sudan and based in Paris, France. He started music at 16, moved to France, built a career in software engineering and cloud infrastructure, then returned to music in 2022 with his debut EP KAKASHI. His next EP Rockstar drops August 2026. He founded Zaroxi Studio, a GPU-accelerated IDE written in Rust, and creates Arabic, Middle Eastern, and African rap and hip-hop. This site hosts his projects, technical writing, and music.",
    inLanguage: ["en", "ar", "fr"],
    about: {
      "@type": "Person",
      "@id": "https://almujax.com/#person",
      name: "Mujahid Siyam",
      alternateName: ["Almuja", "almujax"],
      url: "https://almujax.com",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://almujax.com/#org",
      name: "Zaroxi Studio",
      url: "https://zaroxi.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://almujax.com/search?q={search_term_string}",
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
    image: image || "https://almujax.com/img/profile.png?v=3",
    url: url,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      "@id": "https://almujax.com/#person",
      name: "Mujahid Siyam",
      alternateName: ["Almuja", "almujax"],
      url: "https://almujax.com",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://almujax.com/#org",
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
      "@id": "https://almujax.com/#person",
      name: "Mujahid Siyam",
      alternateName: ["Almuja", "almujax"],
      url: "https://almujax.com",
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
    "@id": "https://almujax.com/music#artist",
    name: "Almuja",
    alternateName: ["Almuja", "الموجا", "الموجة", "الموجه"],
    description:
      "Almuja (الموجا, also spelled الموجة / الموجه — meaning 'the wave' in Arabic) is the music artist name of Mujahid Siyam — Sudanese rapper and hip-hop producer based in Paris, France. Creating Arabic, Middle Eastern, and African rap and hip-hop. His debut EP KAKASHI released in 2022, and his next EP Rockstar is scheduled for release in August 2026.",
    url: "https://almujax.com/music",
    image: "https://almujax.com/img/profile.png?v=3",
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
        "@id": "https://almujax.com/music#kakashi",
        name: "KAKASHI",
        datePublished: "2022",
        albumProductionType: "https://schema.org/EP",
        url: "https://almujax.com/music",
      },
      {
        "@type": "MusicAlbum",
        "@id": "https://almujax.com/music#rockstar",
        name: "Rockstar",
        datePublished: "2026-08",
        albumProductionType: "https://schema.org/EP",
        url: "https://almujax.com/music",
      },
    ],
    sameAs: [
      "https://open.spotify.com/artist/24n3um6erIOUxobs69qDPX",
      "https://soundcloud.com/almujax",
      "https://youtube.com/@almujaofficial",
      "https://music.youtube.com/@almujaofficial",
      "https://instagram.com/almujax",
      "https://tiktok.com/@almujax",
      // Spotify Artist, Apple Music Artist, Anghami, Deezer, and Tidal artist profile URLs
      // to be added once those profiles exist after music release.
    ],
    founder: {
      "@type": "Person",
      "@id": "https://almujax.com/#person",
      name: "Mujahid Siyam",
      alternateName: ["Almuja", "almujax"],
      url: "https://almujax.com",
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
