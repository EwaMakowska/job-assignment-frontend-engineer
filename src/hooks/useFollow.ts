import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { followUser, unfollowUser } from "../api/profiles";
import type {
  Article,
  MultipleArticlesResponse,
  Profile,
} from "../types/api";

export function useFollow(): UseMutationResult<Profile, unknown, Profile> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: Profile) =>
      profile.following
        ? unfollowUser(profile.username)
        : followUser(profile.username),
    onMutate: async (profile) => {
      const newFollowing = !profile.following;

      await queryClient.cancelQueries({
        queryKey: ["profile", profile.username],
      });
      await queryClient.cancelQueries({ queryKey: ["articles"] });
      await queryClient.cancelQueries({ queryKey: ["article"] });

      queryClient.setQueryData<Profile | undefined>(
        ["profile", profile.username],
        (prev) => (prev ? { ...prev, following: newFollowing } : prev)
      );

      queryClient.setQueriesData<MultipleArticlesResponse | undefined>(
        { queryKey: ["articles"] },
        (prev) =>
          prev
            ? {
                ...prev,
                articles: prev.articles.map((a) =>
                  a.author.username === profile.username
                    ? {
                        ...a,
                        author: { ...a.author, following: newFollowing },
                      }
                    : a
                ),
              }
            : prev
      );

      queryClient.setQueriesData<Article | undefined>(
        { queryKey: ["article"] },
        (prev) =>
          prev && prev.author.username === profile.username
            ? { ...prev, author: { ...prev.author, following: newFollowing } }
            : prev
      );
    },
    onError: (_err, profile) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", profile.username],
      });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
    onSettled: (data) => {
      if (data) {
        queryClient.setQueryData(["profile", data.username], data);
      }
    },
  });
}
