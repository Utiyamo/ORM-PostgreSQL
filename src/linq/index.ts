export class Linq<T> {
    private data: T[];
    private includes: Array<{ property: string; data: any[] }> = [];

    constructor(data: T[]) {
        this.data = data;
    }

    where(predicate: (item: T) => boolean): Linq<T> {
        this.data = this.data.filter(predicate);
        return this;
    }

    orderBy(keySelector: (item: T) => any): Linq<T> {
        this.data.sort((a, b) => {
            const keyA = keySelector(a);
            const keyB = keySelector(b);
            return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
        });
        return this;
    }

    select<TResult>(selector: (item: T) => TResult): TResult[] {
        return this.data.map(selector);
    }

    join<U, TResult>(
        inner: U[], // Array interno (segundo array)
        outerKeySelector: (outer: T) => any, // Chave do array externo
        innerKeySelector: (inner: U) => any, // Chave do array interno
        resultSelector: (outer: T, inner: U) => TResult // Função para criar o objeto de saída
    ): TResult[] {
        const results: TResult[] = [];

        for (const outerItem of this.data) {
            const outerKeyValue = outerKeySelector(outerItem);

            for (const innerItem of inner) {
                const innerKeyValue = innerKeySelector(innerItem);

                if (outerKeyValue === innerKeyValue) {
                    results.push(resultSelector(outerItem, innerItem));
                }
            }
        }

        return results;
    }

    toArray(): T[] {
        return this.data;
    }
}