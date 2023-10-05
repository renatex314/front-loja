"use client";

import { api } from "@/core";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    api
      .get("/api/cliente/list/")
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }, []);

  return <div>Página de login</div>;
};

export default LoginPage;
