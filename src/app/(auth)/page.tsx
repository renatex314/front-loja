"use client";

import { api } from "@/core";
import { useFeedback } from "@/providers/FeedbackProvider";
import { useCallback, useEffect } from "react";

const RootPage = () => {
  const feedback = useFeedback();

  const testApi = useCallback(async () => {
    try {
      await api.get("/api/cliente/list");

      feedback({
        message: "Com token",
        type: "success",
      });
    } catch (err) {
      feedback({
        message: "Sem token ou token inválido",
        type: "error",
      });
    }
  }, []);

  useEffect(() => {
    testApi();
  }, []);

  return <p>teste</p>;
};

export default RootPage;
