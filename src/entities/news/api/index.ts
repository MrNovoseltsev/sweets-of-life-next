import { createAnonSupabaseClient } from "@/shared/lib/supabase";
import type { NewsPost } from "../model/types";

const PER_PAGE = 10;

type NewsRow = {
  slug: string;
  published_date: string;
  title: string;
  excerpt: string;
  image: string;
  url: string | null;
};

function mapRow(row: NewsRow): NewsPost {
  return {
    id: row.slug,
    date: row.published_date,
    title: row.title,
    excerpt: row.excerpt,
    image: row.image,
    url: row.url,
  };
}

export async function getLatestNews(count: number): Promise<NewsPost[]> {
  const supabase = createAnonSupabaseClient();
  const { data } = await supabase
    .from("news")
    .select("slug, published_date, title, excerpt, image, url")
    .order("published_date", { ascending: false })
    .limit(count);
  return (data ?? []).map(mapRow);
}

export async function getNewsPaginated(page: number): Promise<{
  posts: NewsPost[];
  total: number;
  totalPages: number;
  page: number;
}> {
  const supabase = createAnonSupabaseClient();

  const { count } = await supabase
    .from("news")
    .select("*", { count: "exact", head: true });

  const total = count ?? 0;
  const totalPages = Math.ceil(total / PER_PAGE);
  const clamped = Math.min(Math.max(1, page), totalPages || 1);

  const { data } = await supabase
    .from("news")
    .select("slug, published_date, title, excerpt, image, url")
    .order("published_date", { ascending: false })
    .range((clamped - 1) * PER_PAGE, clamped * PER_PAGE - 1);

  return { posts: (data ?? []).map(mapRow), total, totalPages, page: clamped };
}
