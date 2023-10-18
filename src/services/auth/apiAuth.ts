import { api } from "@/core";
import {
  GetClientDataResponse,
  GetTokenByClientDataProps,
  RegisterClientProps,
} from "./types";

const getTokenByClientData = async (props: GetTokenByClientDataProps) =>
  (await api.post<string>("/login", props))?.data;

const registerUser = async (props: RegisterClientProps) =>
  (await api.post<string>("/register", props))?.data;

const getClientDataAuthenticated = async () =>
  (await api.get<GetClientDataResponse>("/api/me"))?.data;

export const apiAuth = {
  getTokenByClientData,
  registerUser,
  getClientDataAuthenticated,
};
