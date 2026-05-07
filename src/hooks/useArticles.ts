import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { listArticles, ListArticlesParams } from "../api/articles";
import type { MultipleArticlesResponse } from "../types/api";

export function useArticles(
  params: ListArticlesParams = {}
): UseQueryResult<MultipleArticlesResponse> {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => listArticles(params),
  });
}
