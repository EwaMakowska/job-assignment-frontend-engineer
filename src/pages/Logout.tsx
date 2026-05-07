import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export default function Logout(): JSX.Element {
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    clearAuth();
  }, [clearAuth]);

  return <Redirect to="/" />;
}
