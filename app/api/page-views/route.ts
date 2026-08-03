export const dynamic = "force-dynamic";

type AnalyticsResponse = {
  visitors: number;
  pageviews: number;
};

export async function GET() {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!token || !projectId) {
    return Response.json(
      { count: null, error: "Vercel Analytics token or project ID is unavailable." },
      { status: 503 },
    );
  }

  const params = new URLSearchParams({
    projectId,
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
      return Response.json(
        { count: null, error: `Vercel Analytics query failed (${response.status}).` },
        { status: 502 },
      );
    }

    const data = (await response.json()) as AnalyticsResponse;

    const count = data.pageviews;
    if (count === null) {
      return Response.json(
        { count: null, error: "Vercel Analytics returned an unexpected response." },
        { status: 502 },
      );
    }

    return Response.json(
      { count },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return Response.json(
      { count: null, error: "Could not reach the Vercel Analytics API." },
      { status: 502 },
    );
  }
}
