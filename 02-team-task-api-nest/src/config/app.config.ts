export interface AppConfig {
  appName: string;
  port: number;
}

export function loadAppConfig(): AppConfig {
  const appName = process.env.APP_NAME;
  const port = Number(process.env.PORT);

  if (!appName) {
    throw new Error('APP_NAME is required');
  }

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('PORT must be a positive integer');
  }

  return {
    appName,
    port,
  };
}
