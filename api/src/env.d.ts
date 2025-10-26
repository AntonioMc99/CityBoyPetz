declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGO_URI: string;
    JWT_SECRET: string;
    WEB_ORIGIN: string;
    EMAIL_FROM?: string;
    SMTP_HOST?: string;
    SMTP_PORT?: string;
    SMTP_USER?: string;
    SMTP_PASS?: string;
    OWNER_EMAIL?: string;
  }
}
