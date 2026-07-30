import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales, type Locale } from "@/i18n/config";
import { BreadcrumbStructuredData } from "../../components/BreadcrumbJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";

  return {
    title: validLocale === "ar" ? "الآن | موجا (مجاهد صيام)" : "Now | Mawja (Mujahid Siyam)",
    description:
      validLocale === "ar"
        ? "ما الذي يركز عليه موجا (مجاهد صيام) حالياً — العمل، التعلم، والاهتمامات الحالية."
        : "What Mawja (Mujahid Siyam) is focused on right now — work, learning, and current interests.",
    keywords:
      validLocale === "ar"
        ? ["الآن", "موجا", "مجاهد صيام", "تركيز", "تعلم", "مشاريع"]
        : ["now", "Mawja", "Mujahid Siyam", "focus", "learning", "projects"],
    alternates: {
      canonical: `https://itsmawja.com/${validLocale}/now`,
      languages: {
        en: "https://itsmawja.com/en/now",
        ar: "https://itsmawja.com/ar/now",
        fr: "https://itsmawja.com/fr/now",
      },
    },
    openGraph: {
      title:
        validLocale === "ar"
          ? "الآن | موجا (مجاهد صيام)"
          : "Now | Mawja (Mujahid Siyam)",
      description:
        validLocale === "ar"
          ? "ما الذي يركز عليه موجا (مجاهد صيام) حالياً."
          : "What Mawja (Mujahid Siyam) is focused on right now.",
      url: `https://itsmawja.com/${validLocale}/now`,
      type: "website",
      images: ["https://itsmawja.com/img/profile.png"],
      siteName: "itsmawja.com",
    },
    twitter: {
      card: "summary_large_image",
      title:
        validLocale === "ar"
          ? "الآن | موجا (مجاهد صيام)"
          : "Now | Mawja (Mujahid Siyam)",
      description:
        validLocale === "ar"
          ? "ما الذي يركز عليه موجا (مجاهد صيام) حالياً."
          : "What Mawja (Mujahid Siyam) is focused on right now.",
      images: ["https://itsmawja.com/img/profile.png"],
      site: "@itsmawja",
      creator: "@itsmawja",
    },
    other: {
      "geo.region": "FR",
      "geo.placename": "France",
      "geo.position": "46.603354;1.888334",
      ICBM: "46.603354, 1.888334",
      "DC.creator": "Mujahid Siyam",
      "DC.subject":
        validLocale === "ar"
          ? "الآن، موجا، مجاهد صيام، تركيز، تعلم، مشاريع"
          : "Now, Mawja, Mujahid Siyam, Focus, Learning, Projects",
    },
  };
}

const workItems = [
  {
    en: {
      title: "AI-First Systems",
      description:
        "Building intelligent, scalable AI-first applications and developer tools through Zaroxi Studio. Exploring the frontier of LLM-powered systems and agentic architectures.",
    },
    ar: {
      title: "أنظمة الذكاء الاصطناعي",
      description:
        "بناء تطبيقات وأدوات مطورين ذكية وقابلة للتطوير تعتمد على الذكاء الاصطناعي من خلال Zaroxi Studio. استكشاف أحدث أنظمة النماذج اللغوية والمعماريات الوكيلة.",
    },
    fr: {
      title: "Systèmes IA-First",
      description:
        "Construction d'applications et d'outils développeur intelligents et évolutifs basés sur l'IA via Zaroxi Studio. Exploration des systèmes LLM et des architectures agentiques.",
    },
  },
  {
    en: {
      title: "Open Source Contributions",
      description:
        "Actively contributing to open-source projects in the Rust ecosystem, Nix/NixOS tooling, and developer productivity tools. Sharing knowledge and building in public.",
    },
    ar: {
      title: "المساهمات مفتوحة المصدر",
      description:
        "المساهمة بنشاط في المشاريع مفتوحة المصدر في نظام رست وأدوات Nix/NixOS وأدوات إنتاجية المطورين. مشاركة المعرفة والبناء بشكل علني.",
    },
    fr: {
      title: "Contributions Open Source",
      description:
        "Contribution active aux projets open source dans l'écosystème Rust, les outils Nix/NixOS et les outils de productivité pour développeurs. Partage de connaissances et construction en public.",
    },
  },
  {
    en: {
      title: "Music Production — KAKASHI Follow-up",
      description:
        "Working on the follow-up to the KAKASHI EP. Experimenting with new sounds, Arabic Rap, and Sudanese Rap fusion. Music remains a core creative outlet alongside engineering.",
    },
    ar: {
      title: "الإنتاج الموسيقي — متابعة KAKASHI",
      description:
        "العمل على الألبوم التالي لـ KAKASHI EP. تجربة أصوات جديدة ودمج الراب العربي والراب السوداني. تبقى الموسيقى منفذاً إبداعياً أساسياً إلى جانب الهندسة.",
    },
    fr: {
      title: "Production Musicale — Suite de KAKASHI",
      description:
        "Travail sur la suite de l'EP KAKASHI. Expérimentation de nouveaux sons, fusion de rap arabe et rap soudanais. La musique reste un exutoire créatif essentiel aux côtés de l'ingénierie.",
    },
  },
];

const learnItems = [
  {
    en: {
      title: "Advanced Rust Patterns",
      description:
        "Deep-diving into async Rust, tokio internals, zero-cost abstractions, and embedded systems programming with Rust.",
    },
    ar: {
      title: "أنماط رست المتقدمة",
      description:
        "الغوص العميق في رست غير المتزامنة وأعمال tokio الداخلية والتجريدات عديمة التكلفة وبرمجة الأنظمة المدمجة باستخدام رست.",
    },
    fr: {
      title: "Patterns Rust Avancés",
      description:
        "Plongée approfondie dans Rust asynchrone, les internes de tokio, les abstractions à coût nul et la programmation de systèmes embarqués avec Rust.",
    },
  },
  {
    en: {
      title: "Distributed Systems",
      description:
        "Studying consensus algorithms, CAP theorem trade-offs, and building resilient distributed architectures. Applying patterns from research papers to production systems.",
    },
    ar: {
      title: "الأنظمة الموزعة",
      description:
        "دراسة خوارزميات الإجماع ومقايضات نظرية CAP وبناء معماريات موزعة مرنة. تطبيق أنماط من الأوراق البحثية على أنظمة الإنتاج.",
    },
    fr: {
      title: "Systèmes Distribués",
      description:
        "Étude des algorithmes de consensus, des compromis du théorème CAP et construction d'architectures distribuées résilientes. Application des patterns issus de la recherche aux systèmes de production.",
    },
  },
  {
    en: {
      title: "LLM Architecture & Training",
      description:
        "Understanding transformer architectures, fine-tuning strategies, RAG systems, and the emerging field of AI agents and multi-agent coordination.",
    },
    ar: {
      title: "معمارية وتدريب النماذج اللغوية",
      description:
        "فهم معماريات المحولات واستراتيجيات الضبط الدقيق وأنظمة RAG والمجال الناشئ لوكلاء الذكاء الاصطناعي والتنسيق متعدد الوكلاء.",
    },
    fr: {
      title: "Architecture et Entraînement des LLM",
      description:
        "Compréhension des architectures de transformeurs, des stratégies de fine-tuning, des systèmes RAG et du domaine émergent des agents IA et de la coordination multi-agents.",
    },
  },
];

const readingItems = [
  {
    en: {
      title: "Technical Books",
      description:
        "\"Designing Data-Intensive Applications\" by Martin Kleppmann, \"Zero to One\" by Peter Thiel, and the Rust Book.",
    },
    ar: {
      title: "كتب تقنية",
      description:
        '"تصميم التطبيقات كثيفة البيانات" لمارتن كليبمان، "من الصفر إلى الواحد" لبيتر ثيل، وكتاب رست.',
    },
    fr: {
      title: "Livres Techniques",
      description:
        '"Designing Data-Intensive Applications" de Martin Kleppmann, "Zero to One" de Peter Thiel, et le Livre Rust.',
    },
  },
  {
    en: {
      title: "Engineering Blogs & Papers",
      description:
        "Following research from Anthropic, OpenAI, and DeepMind. Reading engineering blogs from Cloudflare, Figma, and Oxide Computer.",
    },
    ar: {
      title: "مدونات وأوراق هندسية",
      description:
        "متابعة أبحاث من Anthropic وOpenAI وDeepMind. قراءة المدونات الهندسية من Cloudflare وFigma وOxide Computer.",
    },
    fr: {
      title: "Blogs d'Ingénierie et Articles",
      description:
        "Suivi des recherches d'Anthropic, OpenAI et DeepMind. Lecture des blogs d'ingénierie de Cloudflare, Figma et Oxide Computer.",
    },
  },
];

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const dir = validLocale === "ar" ? "rtl" : "ltr";

  const isAr = validLocale === "ar";
  const isFr = validLocale === "fr";

  function t(item: { en: { title: string; description: string }; ar: { title: string; description: string }; fr: { title: string; description: string } }) {
    if (isAr) return item.ar;
    if (isFr) return item.fr;
    return item.en;
  }

  const sectionTitle = isAr ? "الآن" : isFr ? "Maintenant" : "Now";
  const subtitle = isAr
    ? "ما أركز عليه حالياً"
    : isFr
      ? "Ce sur quoi je me concentre en ce moment"
      : "What I'm focused on right now";

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: validLocale === "ar" ? "الرئيسية" : "Home", url: `https://itsmawja.com/${validLocale}` },
          { name: sectionTitle, url: `https://itsmawja.com/${validLocale}/now` },
        ]}
      />

      <div dir={dir} className="min-h-screen pt-20 pb-20">
        <div className="relative">
          <div className="wave-gradient absolute inset-0 opacity-5" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <p className="inline-block wave-gradient text-white text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6">
                {sectionTitle}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                {sectionTitle}
              </h1>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light">
                {subtitle}
              </p>
            </div>

            <div className="space-y-16">
              {/* What I'm Working On */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-[var(--color-primary)]/30 to-transparent" />
                  <h2 className="text-2xl font-bold text-foreground whitespace-nowrap">
                    {isAr ? "ما أعمل عليه" : isFr ? "Sur quoi je travaille" : "What I'm Working On"}
                  </h2>
                  <div className="h-[2px] flex-1 bg-gradient-to-l from-[var(--color-primary)]/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {workItems.map((item) => {
                    const localized = t(item);
                    return (
                      <div key={localized.title} className="card-premium group">
                        <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                            <span className="text-lg">⚡</span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-3">
                            {localized.title}
                          </h3>
                          <p className="text-sm text-foreground/60 leading-relaxed">
                            {localized.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* What I'm Learning */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-[var(--color-secondary)]/30 to-transparent" />
                  <h2 className="text-2xl font-bold text-foreground whitespace-nowrap">
                    {isAr ? "ما أتعلمه" : isFr ? "Ce que j'apprends" : "What I'm Learning"}
                  </h2>
                  <div className="h-[2px] flex-1 bg-gradient-to-l from-[var(--color-secondary)]/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {learnItems.map((item) => {
                    const localized = t(item);
                    return (
                      <div key={localized.title} className="card-premium group">
                        <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[var(--color-secondary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-secondary)]/20 transition-colors duration-300">
                            <span className="text-lg">🧠</span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-3">
                            {localized.title}
                          </h3>
                          <p className="text-sm text-foreground/60 leading-relaxed">
                            {localized.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* What I'm Reading/Watching */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-[var(--color-accent)]/30 to-transparent" />
                  <h2 className="text-2xl font-bold text-foreground whitespace-nowrap">
                    {isAr
                      ? "ما أقرأه / أشاهده"
                      : isFr
                        ? "Ce que je lis / regarde"
                        : "What I'm Reading / Watching"}
                  </h2>
                  <div className="h-[2px] flex-1 bg-gradient-to-l from-[var(--color-accent)]/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {readingItems.map((item) => {
                    const localized = t(item);
                    return (
                      <div key={localized.title} className="card-premium group">
                        <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-accent)]/20 transition-colors duration-300">
                            <span className="text-lg">📚</span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-3">
                            {localized.title}
                          </h3>
                          <p className="text-sm text-foreground/60 leading-relaxed">
                            {localized.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Updated timestamp */}
              <div className="text-center pt-8">
                <p className="text-xs text-foreground/30 font-mono">
                  {isAr
                    ? "آخر تحديث: يوليو 2026"
                    : isFr
                      ? "Dernière mise à jour : juillet 2026"
                      : "Last updated: July 2026"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
