declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    NEXT_PUBLIC_API_URL: string;
    CHANNEL_TALK_PLUGIN_KEY: string;
    CHANNEL_TALK_SECRET_KEY: string;
  }
}
