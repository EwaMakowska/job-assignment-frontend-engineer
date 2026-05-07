import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getProfile } from "../api/profiles";
import type { Profile } from "../types/api";

export function useProfile(username: string): UseQueryResult<Profile> {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => getProfile(username),
    enabled: !!username,
  });
}
