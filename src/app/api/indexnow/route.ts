const INDEXNOW_KEY = "b8a9e2d4f6c3a1b5e7d9f0c2a4b6d8e0";
const BASE_URL = "https://itsmawja.com";

const SEARCH_ENGINES = [
  "https://www.bing.com/indexnow",
  "https://indexnow.yandex.com/indexnow",
  "https://indexnow.seznam.cz/indexnow",
];

async function notifyIndexNow(urls: string[]) {
  const results: Array<{ engine: string; status: number }> = [];

  await Promise.allSettled(
    SEARCH_ENGINES.map(async (engine) => {
      try {
        const response = await fetch(engine, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            host: "itsmawja.com",
            key: INDEXNOW_KEY,
            keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
            urlList: urls.slice(0, 100),
          }),
          signal: AbortSignal.timeout(15000),
        });
        results.push({ engine: new URL(engine).hostname, status: response.status });
      } catch {
        results.push({ engine: new URL(engine).hostname, status: 0 });
      }
    }),
  );

  return results;
}

async function pingGoogle() {
  try {
    await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`, {
      signal: AbortSignal.timeout(10000),
    });
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const url = searchParams.get("url");

  if (key !== INDEXNOW_KEY) {
    return Response.json({ error: "Invalid key" }, { status: 401 });
  }

  if (!url) {
    return Response.json({ error: "url parameter required" }, { status: 400 });
  }

  const results = await notifyIndexNow([url]);
  await pingGoogle();

  return Response.json({ success: true, submitted: [url], results });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, urls } = body;

    if (key !== INDEXNOW_KEY) {
      return Response.json({ error: "Invalid key" }, { status: 401 });
    }

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return Response.json({ error: "urls array required" }, { status: 400 });
    }

    const results = await notifyIndexNow(urls);
    const googleOk = await pingGoogle();

    return Response.json({
      success: true,
      submitted: urls.length,
      google: googleOk ? "pinged" : "failed",
      results,
    });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
