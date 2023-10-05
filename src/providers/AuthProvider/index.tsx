"use client";

import { authorization } from "@/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
  onDeauthRoute: string;
}
const AuthProvider = ({ children, onDeauthRoute }: AuthProviderProps) => {
  const router = useRouter();

  useEffect(() => {
    authorization.setOnUpdateAccessToken((deauthenticated) => {
      if (authorization.getAccessToken() === null) {
        router.push(onDeauthRoute);

        if (deauthenticated) {
          alert("desautenticado");
        }
      }
    });
  }, [onDeauthRoute, router]);

  return children;
};

export default AuthProvider;
