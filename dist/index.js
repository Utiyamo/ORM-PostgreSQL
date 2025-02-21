"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linq = exports.QueryBuilder = exports.Connection = exports.Model = void 0;
// Exporta a classe base para modelos
var Model_1 = require("./core/Model");
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return Model_1.Model; } });
// Exporta a classe para gerenciamento de conexão com o banco de dados
var Connection_1 = require("./core/Connection");
Object.defineProperty(exports, "Connection", { enumerable: true, get: function () { return Connection_1.Connection; } });
// Exporta o QueryBuilder para construção dinâmica de consultas SQL
var QueryBuilder_1 = require("./core/QueryBuilder");
Object.defineProperty(exports, "QueryBuilder", { enumerable: true, get: function () { return QueryBuilder_1.QueryBuilder; } });
// Exporta a classe Linq para manipulação de dados em memória
var linq_1 = require("./linq");
Object.defineProperty(exports, "Linq", { enumerable: true, get: function () { return linq_1.Linq; } });
