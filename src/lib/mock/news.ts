import news from "@/data/news.json";

export type NewsPost = (typeof news)[number];

const PER_PAGE = 10;

export function getLatestNews(count: number): NewsPost[] {
  return news.slice(0, count);
}

export async function getNewsPaginated(page: number): Promise<{
  posts: NewsPost[];
  total: number;
  totalPages: number;
  page: number;
}> {
  const total = news.length;
  const totalPages = Math.ceil(total / PER_PAGE);
  const clamped = Math.min(Math.max(1, page), totalPages);
  const posts = news.slice((clamped - 1) * PER_PAGE, clamped * PER_PAGE);
  return { posts, total, totalPages, page: clamped };
}
