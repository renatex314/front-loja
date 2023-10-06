import axios, { AxiosInstance } from "axios";

class CoreAuthTools {
  private axiosInstance: AxiosInstance;
  private loadedAccessToken: string | null;
  private onUpdateAccessToken: null | ((deauthenticated?: boolean) => void);

  constructor() {
    this.axiosInstance = axios.create();
    this.loadedAccessToken = null;
    this.onUpdateAccessToken = null;

    this.updateAccessToken();
    this.updateAxiosHeaders();
  }

  public getAxiosInstance() {
    return this.axiosInstance;
  }

  public getAccessToken() {
    return this.loadedAccessToken;
  }

  public setOnUpdateAccessToken(callback: (deauthenticated?: boolean) => void) {
    this.onUpdateAccessToken = callback;

    callback();
  }

  public saveAccessToken(accessToken: string) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
    }

    this.updateAccessToken();
    this.updateAxiosHeaders();

    if (this.onUpdateAccessToken) {
      this.onUpdateAccessToken(false);
    }
  }

  private updateAccessToken() {
    let accessToken = null;

    if (typeof localStorage !== "undefined") {
      accessToken = localStorage.getItem("accessToken");
    }

    if (!accessToken) {
      this.loadedAccessToken = null;
    } else {
      this.loadedAccessToken = accessToken;
    }
  }

  private updateAxiosHeaders() {
    this.axiosInstance.interceptors.request.clear();

    this.axiosInstance.interceptors.request.use((config) => {
      if (this.loadedAccessToken !== null) {
        config.headers.Authorization = `Bearer ${this.loadedAccessToken}`;
      }

      config.baseURL = process.env.ENDPOINT_URL || "http://localhost:4000/";

      return config;
    });

    this.axiosInstance.interceptors.response.use((config) => {
      if (config.status === 401) {
        this.loadedAccessToken = null;

        if (this.onUpdateAccessToken) {
          this.onUpdateAccessToken(true);
        }
      }

      return config;
    });
  }
}

let coreTools: CoreAuthTools | null = null;
export const getCoreAuthTools = () => {
  if (coreTools == null) {
    coreTools = new CoreAuthTools();
  }

  return coreTools;
};
