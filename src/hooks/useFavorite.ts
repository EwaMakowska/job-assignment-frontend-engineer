import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { favoriteArticle, unfavoriteArticle } from "../api/articles";
import type { Article, MultipleArticlesResponse } from "../types/api";

export function useFavorite(): UseMutationResult<Article, unknown, Article> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (article: Article) =>
      article.favorited
        ? unfavoriteArticle(article.slug)
        : favoriteArticle(article.slug),
    onMutate: async (article) => {
      const newFavorited = !article.favorited;
      const newCount = article.favoritesCount + (newFavorited ? 1 : -1);

      await queryClient.cancelQueries({ queryKey: ["articles"] });
      await queryClient.cancelQueries({
        queryKey: ["article", article.slug],
      });

      queryClient.setQueryData<Article | undefined>(
        ["article", article.slug],
        (prev) =>
          prev
            ? { ...prev, favorited: newFavorited, favoritesCount: newCount }
            : prev
      );

      queryClient.setQueriesData<MultipleArticlesResponse | undefined>(
        { queryKey: ["articles"] },
        (prev) =>
          prev
            ? {
                ...prev,
                articles: prev.articles.map((a) =>
                  a.slug === article.slug
                    ? {
                        ...a,
                        favorited: newFavorited,
                        favoritesCount: newCount,
                      }
                    : a
                ),
              }
            : prev
      );
    },
    onError: (_err, article) => {
      queryClient.invalidateQueries({ queryKey: ["article", article.slug] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onSettled: (data) => {
      if (data) {
        queryClient.setQueryData(["article", data.slug], data);
      }
    },
  });
}
