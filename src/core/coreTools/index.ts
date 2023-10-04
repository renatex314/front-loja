import axios, { AxiosInstance } from "axios";

class CoreTools {
  private axiosInstance: AxiosInstance;
  private loadedAccessToken: string;
  private onUpdateAccessToken: null | ((deauthenticated?: boolean) => void);

  constructor() {
    this.axiosInstance = axios.create();
    this.loadedAccessToken = '';
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
    localStorage.setItem('accessToken', accessToken);
    this.updateAccessToken();
    this.updateAxiosHeaders();

    if (this.onUpdateAccessToken) {
      this.onUpdateAccessToken(false);
    }
  }

  private updateAccessToken() {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      this.loadedAccessToken = '';
    } else {
      this.loadedAccessToken = accessToken;
    }
  }

  private updateAxiosHeaders() {
    this.axiosInstance.interceptors.request.clear();

    if (this.loadedAccessToken !== '') {
      this.axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${this.loadedAccessToken}`;
        
        return config;
      });
    }

    this.axiosInstance.interceptors.response.use((config) => {
      if (config.status === 401) {
        this.loadedAccessToken = '';

        if (this.onUpdateAccessToken) {
          this.onUpdateAccessToken(true);
        }
      }
      
      return config;
    });
  }

}

let coreTools: CoreTools | null = null;
export const getCoreTools = () => {
  if (coreTools == null) {
    coreTools = new CoreTools();
  }

  return coreTools;
}