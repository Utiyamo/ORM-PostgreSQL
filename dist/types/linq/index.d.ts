export declare class Linq<T> {
    private data;
    private includes;
    constructor(data: T[]);
    where(predicate: (item: T) => boolean): Linq<T>;
    orderBy(keySelector: (item: T) => any): Linq<T>;
    select<TResult>(selector: (item: T) => TResult): TResult[];
    join<U, TResult>(inner: U[], // Array interno (segundo array)
    outerKeySelector: (outer: T) => any, // Chave do array externo
    innerKeySelector: (inner: U) => any, // Chave do array interno
    resultSelector: (outer: T, inner: U) => TResult): TResult[];
    toArray(): T[];
}
