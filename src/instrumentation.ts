export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NODE_ENV === "production") {
    const urls = [
      "https://itsmawja.com/sitemap.xml",
      "https://itsmawja.com/feed.xml",
      "https://itsmawja.com/atom.xml",
      "https://itsmawja.com/llms.txt",
    ];

    const pings = [
      { name: "Google", url: `https://www.google.com/ping?sitemap=${encodeURIComponent("https://itsmawja.com/sitemap.xml")}` },
      { name: "Bing", url: "https://www.bing.com/indexnow" },
      { name: "Yandex", url: "https://indexnow.yandex.com/indexnow" },
    ];

    for (const { name, url } of pings) {
      try {
        if (name === "Google") {
          await fetch(url, { signal: AbortSignal.timeout(5000) });
        } else {
          await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              host: "itsmawja.com",
              key: "b8a9e2d4f6c3a1b5e7d9f0c2a4b6d8e0",
              keyLocation: "https://itsmawja.com/b8a9e2d4f6c3a1b5e7d9f0c2a4b6d8e0.txt",
              urlList: urls,
            }),
            signal: AbortSignal.timeout(5000),
          });
        }
        console.log(`[auto-index] ✅ ${name}`);
      } catch {
        console.log(`[auto-index] ⚠️ ${name} unreachable (site may not be live yet)`);
      }
    }
  }
}
