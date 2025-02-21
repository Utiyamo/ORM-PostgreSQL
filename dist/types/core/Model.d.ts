import 'reflect-metadata';
import { Connection } from './Connection';
export declare abstract class Model {
    static tableName: string;
    static get connection(): Connection;
    static find<T>(id: number): Promise<T | null>;
    static findAll<T>(): Promise<T[]>;
    static create<T>(data: Partial<T>): Promise<T>;
}
