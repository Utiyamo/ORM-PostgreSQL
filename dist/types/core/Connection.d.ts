export declare class Connection {
    private static instance;
    private client;
    private constructor();
    static getInstance(): Connection;
    connect(): Promise<void>;
    query(query: string, values?: any[]): Promise<any>;
    close(): Promise<void>;
}
