declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        ENV: 'DEV' | 'PROD';
        PORT: number;
        DB_ENGINE: string;
        DB_HOST: string;
        DB_PORT: string;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_NAME: string;
        DB_LOG: string;
      }
    }
  }
}
