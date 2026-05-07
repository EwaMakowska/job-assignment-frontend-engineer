import { apiClient } from "./client";
import type { Profile, ProfileResponse } from "../types/api";

export async function getProfile(username: string): Promise<Profile> {
  const { data } = await apiClient.get<ProfileResponse>(
    `/profiles/${username}`
  );
  return data.profile;
}

export async function followUser(username: string): Promise<Profile> {
  const { data } = await apiClient.post<ProfileResponse>(
    `/profiles/${username}/follow`
  );
  return data.profile;
}

export async function unfollowUser(username: string): Promise<Profile> {
  const { data } = await apiClient.delete<ProfileResponse>(
    `/profiles/${username}/follow`
  );
  return data.profile;
}
