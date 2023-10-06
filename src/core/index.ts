import { getCoreAuthTools } from "./coreAuthTools";

const coreAuthTools = getCoreAuthTools();

const APIAuthBase = coreAuthTools.getAxiosInstance();
const saveAccessToken = (accessToken: string) =>
  coreAuthTools.saveAccessToken(accessToken);
const getAccessToken = () => coreAuthTools.getAccessToken();
const setOnUpdateAccessToken = (
  callback: (deauthenticated?: boolean) => void
) => coreAuthTools.setOnUpdateAccessToken(callback);

export const authorization = {
  saveAccessToken,
  getAccessToken,
  setOnUpdateAccessToken,
};

export const api = APIAuthBase;
