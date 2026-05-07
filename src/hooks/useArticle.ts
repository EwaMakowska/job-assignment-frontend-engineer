import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getArticle } from "../api/articles";
import type { Article } from "../types/api";

export function useArticle(slug: string): UseQueryResult<Article> {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticle(slug),
    enabled: !!slug,
  });
}
