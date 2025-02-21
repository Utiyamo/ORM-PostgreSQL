"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linq = void 0;
class Linq {
    constructor(data) {
        this.includes = [];
        this.data = data;
    }
    where(predicate) {
        this.data = this.data.filter(predicate);
        return this;
    }
    orderBy(keySelector) {
        this.data.sort((a, b) => {
            const keyA = keySelector(a);
            const keyB = keySelector(b);
            return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
        });
        return this;
    }
    select(selector) {
        return this.data.map(selector);
    }
    join(inner, // Array interno (segundo array)
    outerKeySelector, // Chave do array externo
    innerKeySelector, // Chave do array interno
    resultSelector // Função para criar o objeto de saída
    ) {
        const results = [];
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
    toArray() {
        return this.data;
    }
}
exports.Linq = Linq;
//# sourceMappingURL=index.js.map