import axios, { AxiosInstance } from 'axios';

export class ApiClass {
  public baseURL: string;
  private config: Record<string, any>;
  public axiosInstance: AxiosInstance;

  constructor(
    baseURL: string = import.meta.env.VITE_BACKEND_API ??
      'http://localhost:8000/api',
    config?: Record<string, any>
  ) {
    this.baseURL = baseURL;

    this.config = config || {};

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      ...this.config,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.response.use(response => {
      return response;
    });
  }
}
