"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var name_1 = __importDefault(require("./name"));
function getTypes(document) {
    var definitions = document.definitions;
    var next = definitions
        .filter(function (def) {
        return def.kind === 'ObjectTypeDefinition' ||
            def.kind === 'ObjectTypeExtension';
    })
        .filter(function (def) { return name_1.default(def) !== 'Query' && name_1.default(def) !== 'Mutation'; });
    return next;
}
exports.default = getTypes;
