import { Client } from 'pg';

export class Connection {
    private static instance: Connection;
    private client: Client;
  
    private constructor() {
      this.client = new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
    }
  
    public static getInstance(): Connection {
      if (!Connection.instance) {
        Connection.instance = new Connection();
      }
      return Connection.instance;
    }
  
    public async connect(): Promise<void> {
      await this.client.connect();
    }
  
    public async query(query: string, values?: any[]): Promise<any> {
      try {
        const result = await this.client.query(query, values);
        return result.rows;
      } catch (error) {
        console.error('Query error:', error);
        throw error;
      }
    }
  
    public async close(): Promise<void> {
      await this.client.end();
    }
  }