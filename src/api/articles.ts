import { apiClient } from "./client";
import type {
  Article,
  MultipleArticlesResponse,
  SingleArticleResponse,
} from "../types/api";

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

export async function getArticle(slug: string): Promise<Article> {
  const { data } = await apiClient.get<SingleArticleResponse>(
    `/articles/${slug}`
  );
  return data.article;
}
