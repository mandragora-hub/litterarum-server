export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "test" | "dev" | "prod";
      PORT: string;
      MONGODB_URI: string;
    }
  }
}
