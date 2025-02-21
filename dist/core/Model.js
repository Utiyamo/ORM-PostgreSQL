"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
require("reflect-metadata");
const Connection_1 = require("./Connection");
class Model {
    static get connection() {
        return Connection_1.Connection.getInstance();
    }
    static find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
            return result[0] || null;
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.query(`SELECT * FROM ${this.tableName}`);
            return result;
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const columns = Object.keys(data).join(', ');
            const values = Object.values(data);
            const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
            const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
            const result = yield this.connection.query(query, values);
            return result[0];
        });
    }
}
exports.Model = Model;
//# sourceMappingURL=Model.js.map