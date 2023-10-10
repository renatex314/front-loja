import { api } from "@/core";
import { GetTokenByClientDataProps, RegisterClientProps } from "./types";

const getTokenByUserData = async (props: GetTokenByClientDataProps) =>
  (await api.post<string>("/login", props))?.data;

const registerUser = async (props: RegisterClientProps) =>
  (await api.post<string>("/register", props))?.data;

export const apiAuth = {
  getTokenByUserData,
  registerUser,
};
