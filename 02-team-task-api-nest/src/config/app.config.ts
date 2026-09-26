export interface AppConfig {
  appName: string;
  port: number;
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
  corsOrigins: string[];
  redisUrl: string;
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

  const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
  const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!jwtAccessSecret) {
    throw new Error('JWT_ACCESS_SECRET is required');
  }

  if (!jwtRefreshSecret) {
    throw new Error('JWT_REFRESH_SECRET is required');
  }

  const corsOrigins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (corsOrigins.length === 0) {
    throw new Error('CORS_ORIGINS must contain at least one allowed origin');
  }

  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error('REDIS_URL is required');
  }

  return {
    appName,
    port,
    jwtAccessSecret,
    jwtRefreshSecret,
    corsOrigins,
    redisUrl,
  };
}
