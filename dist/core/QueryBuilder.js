"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
class QueryBuilder {
    constructor() {
        this.query = '';
        this.params = [];
        this.joins = [];
    }
    select(columns) {
        this.query += `SELECT ${columns.join(', ')} `;
        return this;
    }
    from(table) {
        this.query += `FROM ${table} `;
        return this;
    }
    include(relation) {
        const joinClause = `LEFT JOIN ${relation.table} AS ${relation.alias} ON ${relation.alias}.${relation.foreignKey} = ${this.getTableName()}.${relation.localKey}`;
        this.joins.push(joinClause);
        return this;
    }
    where(condition, value) {
        this.query += `WHERE ${condition} `;
        this.params.push(value);
        return this;
    }
    orderBy(column, direction = 'ASC') {
        this.query += `ORDER BY ${column} ${direction} `;
        return this;
    }
    build() {
        const fullQuery = `${this.query}${this.joins.join(' ')}`.trim();
        return { query: fullQuery, params: this.params };
    }
    getTableName() {
        // Extrai o nome da tabela principal do FROM
        const match = this.query.match(/FROM\s+(\w+)/i);
        if (!match)
            throw new Error('Table name not found in query');
        return match[1];
    }
}
exports.QueryBuilder = QueryBuilder;
