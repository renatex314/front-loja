import { getCoreTools } from "./coreTools";

const coreTools = getCoreTools();

const APIAuthBase = coreTools.getAxiosInstance();
const saveAccessToken = (accessToken: string) =>
  coreTools.saveAccessToken(accessToken);
const getAccessToken = () => coreTools.getAccessToken();
const setOnUpdateAccessToken = (
  callback: (deauthenticated?: boolean) => void
) => coreTools.setOnUpdateAccessToken(callback);

export const authorization = {
  saveAccessToken,
  getAccessToken,
  setOnUpdateAccessToken,
};

export const api = APIAuthBase;
