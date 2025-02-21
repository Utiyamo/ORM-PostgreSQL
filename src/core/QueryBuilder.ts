export class QueryBuilder {
    private query: string = '';
    private params: any[] = [];
    private joins: string[] = [];
  
    select(columns: string[]): QueryBuilder {
      this.query += `SELECT ${columns.join(', ')} `;
      return this;
    }
  
    from(table: string): QueryBuilder {
      this.query += `FROM ${table} `;
      return this;
    }
  
    include(relation: { table: string; alias: string; foreignKey: string; localKey: string }): QueryBuilder {
      const joinClause = `LEFT JOIN ${relation.table} AS ${relation.alias} ON ${relation.alias}.${relation.foreignKey} = ${this.getTableName()}.${relation.localKey}`;
      this.joins.push(joinClause);
      return this;
    }
  
    where(condition: string, value: any): QueryBuilder {
      this.query += `WHERE ${condition} `;
      this.params.push(value);
      return this;
    }
  
    orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
      this.query += `ORDER BY ${column} ${direction} `;
      return this;
    }
  
    build(): { query: string; params: any[] } {
      const fullQuery = `${this.query}${this.joins.join(' ')}`.trim();
      return { query: fullQuery, params: this.params };
    }
  
    private getTableName(): string {
      // Extrai o nome da tabela principal do FROM
      const match = this.query.match(/FROM\s+(\w+)/i);
      if (!match) throw new Error('Table name not found in query');
      return match[1];
    }
  }