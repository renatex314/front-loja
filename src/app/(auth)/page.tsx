"use client";

import { api } from "@/core";
import { useFeedback } from "@/providers/FeedbackProvider";
import { useCallback, useEffect } from "react";

const RootPage = () => {
  const feedback = useFeedback();

  return <p>teste</p>;
};

export default RootPage;
