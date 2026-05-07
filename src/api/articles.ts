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

export async function favoriteArticle(slug: string): Promise<Article> {
  const { data } = await apiClient.post<SingleArticleResponse>(
    `/articles/${slug}/favorite`
  );
  return data.article;
}

export async function unfavoriteArticle(slug: string): Promise<Article> {
  const { data } = await apiClient.delete<SingleArticleResponse>(
    `/articles/${slug}/favorite`
  );
  return data.article;
}
