const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export const dynamic = "force-dynamic";

type AnalyticsCountResponse = number | { count?: number; value?: number };

function getCount(data: AnalyticsCountResponse): number | null {
  if (typeof data === "number") return data;
  if (typeof data.count === "number") return data.count;
  if (typeof data.value === "number") return data.value;
  return null;
}

export async function GET() {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!token || !projectId) {
    return Response.json({ count: null }, { status: 503 });
  }

  const now = Date.now();
  const params = new URLSearchParams({
    projectId,
    from: String(now - THIRTY_DAYS_MS),
    to: String(now),
    filter: "requestPath eq '/'",
  });
  const teamId = process.env.VERCEL_TEAM_ID ?? process.env.VERCEL_ORG_ID;

  if (teamId) params.set("teamId", teamId);

  try {
    const response = await fetch(
      `https://api.vercel.com/v1/query/web-analytics/visits/count?${params}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 60 * 60 },
      },
    );

    if (!response.ok) {
      return Response.json({ count: null }, { status: 502 });
    }

    const count = getCount((await response.json()) as AnalyticsCountResponse);

    if (count === null) {
      return Response.json({ count: null }, { status: 502 });
    }

    return Response.json(
      { count },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return Response.json({ count: null }, { status: 502 });
  }
}
