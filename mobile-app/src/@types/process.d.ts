declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        EXPO_PUBLIC_TASKS_MANAGER_API_HOST: string;
      }
    }
  }
}
