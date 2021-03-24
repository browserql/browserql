"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var name_1 = __importDefault(require("./get/name"));
/**
 * Merge different document nodes together
 * @param {DocumentNode[]} documents The documents to merge
 */
function merge() {
    var documents = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        documents[_i] = arguments[_i];
    }
    var types = [];
    var nextDocuments = documents.map(function (document) { return (__assign(__assign({}, document), { definitions: document.definitions.map(function (definition) {
            var name = name_1.default(definition);
            switch (definition.kind) {
                case 'ObjectTypeDefinition':
                    {
                        if (types.indexOf(name) > -1) {
                            return __assign(__assign({}, definition), { kind: 'ObjectTypeExtension' });
                        }
                    }
                    break;
                case 'ObjectTypeExtension':
                    {
                        if (types.indexOf(name) === -1) {
                            return __assign(__assign({}, definition), { kind: 'ObjectTypeDefinition' });
                        }
                    }
                    break;
            }
            if (definition.kind === 'ObjectTypeExtension' ||
                definition.kind === 'ObjectTypeDefinition') {
                if (types.indexOf(name) === -1) {
                    types.push(name);
                }
            }
            return definition;
        }) })); });
    var source = nextDocuments
        .map(function (document) { return graphql_1.print(document); })
        .join('\n');
    var document = graphql_tag_1.default(source);
    return document;
}
exports.default = merge;
