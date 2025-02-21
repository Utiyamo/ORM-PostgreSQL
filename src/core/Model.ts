import 'reflect-metadata';
import { Connection } from './Connection';

export abstract class Model {
  static tableName: string;

  static get connection() {
    return Connection.getInstance();
  }

  static async find<T>(id: number): Promise<T | null> {
    const result = await this.connection.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id]
    );
    return result[0] || null;
  }

  static async findAll<T>(): Promise<T[]> {
    const result = await this.connection.query(`SELECT * FROM ${this.tableName}`);
    return result;
  }

  static async create<T>(data: Partial<T>): Promise<T> {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
    const result = await this.connection.query(query, values);
    return result[0];
  }
}