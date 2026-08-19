export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "production"
  ) {
    const urls = [
      "https://almujax.com/sitemap.xml",
      "https://almujax.com/feed.xml",
      "https://almujax.com/atom.xml",
      "https://almujax.com/llms.txt",
    ];

    const pings = [
      {
        name: "Google",
        url: `https://www.google.com/ping?sitemap=${encodeURIComponent("https://almujax.com/sitemap.xml")}`,
      },
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
              host: "almujax.com",
              key: "1dac02664f4d441084286ceca1a2640e",
              keyLocation:
                "https://almujax.com/1dac02664f4d441084286ceca1a2640e.txt",
              urlList: urls,
            }),
            signal: AbortSignal.timeout(5000),
          });
        }
        console.log(`[auto-index] ✅ ${name}`);
      } catch {
        console.log(
          `[auto-index] ⚠️ ${name} unreachable (site may not be live yet)`,
        );
      }
    }
  }
}
