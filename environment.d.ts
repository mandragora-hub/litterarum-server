export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "test" | "dev" | "prod";
      PORT: string;
      MONGODB_URI: string;
      WEBDAV_USER: string;
      WEBDAV_TOKEN: string;
      WEBDAV_BASE_URL: string;
      WEBDAV_BASE_DIR: string;
    }
  }
}
