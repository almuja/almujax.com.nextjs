#!/usr/bin/env node

/**
 * Submit all site URLs to search engines for indexing.
 * Run after deployment: node scripts/index-all.mjs
 */

const BASE_URL = "https://iammawja.com";
const INDEXNOW_KEY = "b8a9e2d4f6c3a1b5e7d9f0c2a4b6d8e0";

const urls = [
  `${BASE_URL}/en`,
  `${BASE_URL}/en/about`,
  `${BASE_URL}/en/projects`,
  `${BASE_URL}/en/blog`,
  `${BASE_URL}/en/contact`,
  `${BASE_URL}/en/music`,
  `${BASE_URL}/ar`,
  `${BASE_URL}/ar/about`,
  `${BASE_URL}/ar/projects`,
  `${BASE_URL}/ar/blog`,
  `${BASE_URL}/ar/contact`,
  `${BASE_URL}/ar/music`,
  `${BASE_URL}/fr`,
  `${BASE_URL}/fr/about`,
  `${BASE_URL}/fr/projects`,
  `${BASE_URL}/fr/blog`,
  `${BASE_URL}/fr/contact`,
  `${BASE_URL}/fr/music`,
];

// Add blog posts
const blogPosts = [
  "python-data-science",
  "react-hooks-guide",
  "typescript-nextjs",
  "rust-systems-programming",
  "building-llm-apps",
  "devsecops-pipeline",
  "nixos-reproducible-builds",
  "postgres-optimization",
  "docker-kubernetes-deployment",
  "api-design-rest",
];

for (const slug of blogPosts) {
  urls.push(
    `${BASE_URL}/en/blog/${slug}`,
    `${BASE_URL}/ar/blog/${slug}`,
    `${BASE_URL}/fr/blog/${slug}`,
  );
}

// Add projects
const projects = ["funmacs", "mujaos"];
for (const slug of projects) {
  urls.push(
    `${BASE_URL}/en/projects/${slug}`,
    `${BASE_URL}/ar/projects/${slug}`,
    `${BASE_URL}/fr/projects/${slug}`,
  );
}

// Add feeds and sitemap
urls.push(`${BASE_URL}/sitemap.xml`);
urls.push(`${BASE_URL}/feed.xml`);
urls.push(`${BASE_URL}/atom.xml`);

async function main() {
  console.log(`\n🔍 Indexing ${urls.length} URLs across all locales...\n`);

  // 1. Google Sitemap Ping
  try {
    const googleUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`;
    const r = await fetch(googleUrl, { signal: AbortSignal.timeout(10000) });
    console.log(`✅ Google: ${r.status} ${r.statusText}`);
  } catch (e) {
    console.log(`❌ Google: ${e instanceof Error ? e.message : "failed"}`);
  }

  // 2. Bing Sitemap Submission
  try {
    const bingUrl = `https://ssl.bing.com/webmaster/api.svc/pox/SubmitSitemap?apikey=&siteUrl=${encodeURIComponent(BASE_URL)}&sitemapUrl=${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`;
    const r = await fetch(bingUrl, { signal: AbortSignal.timeout(10000) });
    console.log(`✅ Bing: ${r.status} ${r.statusText}`);
  } catch (e) {
    console.log(`⚠️  Bing: requires API key — use Bing Webmaster Tools`);
  }

  // 3. IndexNow — submit to Bing, Yandex, Seznam
  const indexNowEndpoints = [
    "https://www.bing.com/indexnow",
    "https://indexnow.yandex.com/indexnow",
    "https://indexnow.seznam.cz/indexnow",
  ];

  // Submit in batches of 100 (IndexNow limit)
  for (let i = 0; i < urls.length; i += 100) {
    const batch = urls.slice(i, i + 100);
    for (const endpoint of indexNowEndpoints) {
      try {
        const r = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            host: "iammawja.com",
            key: INDEXNOW_KEY,
            keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
            urlList: batch,
          }),
          signal: AbortSignal.timeout(15000),
        });
        const name = new URL(endpoint).hostname;
        console.log(`✅ IndexNow ${name}: ${r.status} (${batch.length} URLs)`);
      } catch (e) {
        const name = new URL(endpoint).hostname;
        console.log(
          `❌ IndexNow ${name}: ${e instanceof Error ? e.message : "failed"}`,
        );
      }
    }
  }

  // 4. Yandex (direct ping)
  try {
    const yandexUrls = [
      `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`,
      `https://webmaster.yandex.ru/ping?sitemap=${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`,
    ];
    for (const yu of yandexUrls) {
      const r = await fetch(yu, { signal: AbortSignal.timeout(10000) });
      console.log(`✅ Yandex ping: ${r.status}`);
    }
  } catch (e) {
    console.log(`⚠️  Yandex ping: ${e instanceof Error ? e.message : "failed"}`);
  }

  console.log(`\n🎯 Done! ${urls.length} URLs submitted for indexing.\n`);
  console.log("   Manual steps:");
  console.log(
    "   1. Submit sitemap in Google Search Console: https://search.google.com/search-console",
  );
  console.log(
    "   2. Submit sitemap in Bing Webmaster: https://www.bing.com/webmasters",
  );
  console.log(
    "   3. Add site to Yandex Webmaster: https://webmaster.yandex.com",
  );
  console.log("");
}

main().catch(console.error);
