import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { login } from "../api/users";
import { useAuthStore } from "../store/auth";
import type { User } from "../types/api";

interface LoginInput {
  email: string;
  password: string;
}

export function useLogin(): UseMutationResult<User, unknown, LoginInput> {
  const history = useHistory();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: ({ email, password }: LoginInput) => login(email, password),
    onSuccess: (user) => {
      setAuth(user);
      history.push("/");
    },
  });
}
