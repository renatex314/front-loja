"use client";

import { authorization } from "@/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFeedback } from "../FeedbackProvider";

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
  onDeauthRoute: string;
}
const AuthProvider = ({ children, onDeauthRoute }: AuthProviderProps) => {
  const feedback = useFeedback();
  const router = useRouter();

  useEffect(() => {
    authorization.setOnUpdateAccessToken((deauthenticated) => {
      if (authorization.getAccessToken() === null) {
        router.push(onDeauthRoute);

        if (deauthenticated) {
          feedback({
            message: "Seu acesso expirou",
            type: "info",
          });
        }
      }
    });
  }, [onDeauthRoute, router]);

  return children;
};

export default AuthProvider;
