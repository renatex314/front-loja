import { getCoreTools } from "./coreTools";

if (typeof window !== undefined) {
  
}

const coreTools = getCoreTools();

const APIAuthBase = coreTools.getAxiosInstance();
const saveAccessToken = coreTools.saveAccessToken;
const getAccessToken = coreTools.getAccessToken;
const setOnUpdateAccessToken = coreTools.setOnUpdateAccessToken;

export const authorization = {
  saveAccessToken,
  getAccessToken,
  setOnUpdateAccessToken
}

export const api = APIAuthBase;
