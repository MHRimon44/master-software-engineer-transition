import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class AppService implements OnModuleDestroy {
  private readonly pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionTimeoutMillis: 3000,
  });

  getHello(): string {
    return 'Hello World!';
  }

  async getHealth() {
    try {
      await this.pool.query('SELECT 1');

      return {
        status: 'ok',
        api: 'healthy',
        database: 'healthy',
      };
    } catch {
      return {
        status: 'error',
        api: 'healthy',
        database: 'unhealthy',
      };
    }
  }

  async getDatabaseTest() {
    const result = await this.pool.query(
      'SELECT current_database() AS database, current_user AS username, NOW() AS server_time',
    );

    return result.rows[0];
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
  constructor() {
    this.pool.on('error', (error: Error) => {
      console.error(
        '[PostgreSQL] Unexpected idle client error:',
        error.message,
      );
    });
  }
}
