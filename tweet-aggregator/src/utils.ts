export function toJSON(data: unknown, status = 200): Response {
  let body = JSON.stringify(data, null, 2);
  let headers = { 'content-type': 'application/json' };
  return new Response(body, { headers, status });
}

export function toError(error: string | unknown, status = 400): Response {
  return toJSON({ error }, status);
}

export function reply(output: any): Response {
  if (output != null) return toJSON(output, 200);
  return toError('Error with query', 500);
}

export type TwitterTrend = {
  name: string;
  url: string;
  query: string;
  tweet_volume: number;
};

export async function getTrends(token: string) {
  const response = await fetch(
    'https://api.twitter.com/1.1/trends/place.json?id=23424977',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const [trendsRes] = await response.json();
  return trendsRes.trends as TwitterTrend[];
}

export async function searchTweets(token: string, trend: string) {
  const response = await fetch(
    `https://api.twitter.com/1.1/search/tweets.json?q=${encodeURIComponent(
      trend
    )}&lang=en&tweet_mode=extended&count=100&result_type=mixed`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const { statuses } = await response.json();
  return statuses || [];
}
