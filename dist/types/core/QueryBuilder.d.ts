export declare class QueryBuilder {
    private query;
    private params;
    private joins;
    select(columns: string[]): QueryBuilder;
    from(table: string): QueryBuilder;
    include(relation: {
        table: string;
        alias: string;
        foreignKey: string;
        localKey: string;
    }): QueryBuilder;
    where(condition: string, value: any): QueryBuilder;
    orderBy(column: string, direction?: 'ASC' | 'DESC'): QueryBuilder;
    build(): {
        query: string;
        params: any[];
    };
    private getTableName;
}
