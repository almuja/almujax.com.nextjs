const INDEXNOW_KEY = "b8a9e2d4f6c3a1b5e7d9f0c2a4b6d8e0";
const BASE_URL = "https://bymuja.com";

const SEARCH_ENGINES = [
  "https://www.bing.com/indexnow",
  "https://indexnow.yandex.com/indexnow",
  "https://indexnow.seznam.cz/indexnow",
];

async function notifyIndexNow(urls: string[]) {
  const results: { engine: string; status: number; ok: boolean }[] = [];

  await Promise.allSettled(
    SEARCH_ENGINES.map(async (engine) => {
      try {
        const response = await fetch(engine, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            host: "bymuja.com",
            key: INDEXNOW_KEY,
            keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
            urlList: urls,
          }),
          signal: AbortSignal.timeout(10000),
        });
        results.push({
          engine: new URL(engine).hostname,
          status: response.status,
          ok: response.ok || response.status === 200,
        });
      } catch (err) {
        results.push({
          engine: new URL(engine).hostname,
          status: 0,
          ok: false,
        });
      }
    }),
  );

  return results;
}

async function notifyGoogle(urls: string[]) {
  try {
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`;
    await fetch(pingUrl, { signal: AbortSignal.timeout(10000) });
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
    return Response.json(
      { error: "Invalid key" },
      { status: 401 },
    );
  }

  const urls = url ? [url] : [];
  if (urls.length === 0) {
    return Response.json(
      { error: "No URL provided" },
      { status: 400 },
    );
  }

  const results = await notifyIndexNow(urls);
  await notifyGoogle(urls);

  return Response.json({
    success: true,
    submitted: urls,
    results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, urls } = body;

    if (key !== INDEXNOW_KEY) {
      return Response.json(
        { error: "Invalid key" },
        { status: 401 },
      );
    }

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return Response.json(
        { error: "No URLs provided" },
        { status: 400 },
      );
    }

    const results = await notifyIndexNow(urls);
    await notifyGoogle(urls);

    return Response.json({
      success: true,
      submitted: urls,
      results,
    });
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
