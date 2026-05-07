import { apiClient } from "./client";
import type { LoginUserRequest, User, UserResponse } from "../types/api";

export async function login(email: string, password: string): Promise<User> {
  const body: LoginUserRequest = { user: { email, password } };
  const { data } = await apiClient.post<UserResponse>("/users/login", body);
  return data.user;
}
