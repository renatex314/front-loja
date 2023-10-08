import { api } from "@/core";
import { GetTokenByUserDataProps } from "./types";

const getTokenByUserData = async (props: GetTokenByUserDataProps) =>
  (await api.post<string>("/login", props))?.data;

export const apiAuth = {
  getTokenByUserData,
};
