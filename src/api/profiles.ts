import { apiClient } from "./client";
import type { Profile, ProfileResponse } from "../types/api";

export async function getProfile(username: string): Promise<Profile> {
  const { data } = await apiClient.get<ProfileResponse>(
    `/profiles/${username}`
  );
  return data.profile;
}
