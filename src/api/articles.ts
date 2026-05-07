import { apiClient } from "./client";
import type { MultipleArticlesResponse } from "../types/api";

export interface ListArticlesParams {
  limit?: number;
  offset?: number;
  author?: string;
}

export async function listArticles(
  params: ListArticlesParams = {}
): Promise<MultipleArticlesResponse> {
  const { data } = await apiClient.get<MultipleArticlesResponse>("/articles", {
    params,
  });
  return data;
}
