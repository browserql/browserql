"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var graphql_1 = require("graphql");
var schema_1 = __importDefault(require("./generate/schema"));
function printSchemaWithDirectives(schema) {
    var str = Object
        .keys(schema.getTypeMap())
        .filter(function (k) { return !k.match(/^__/); })
        .reduce(function (accum, name) {
        var type = schema.getType(name);
        return !graphql_1.isSpecifiedScalarType(type)
            ? accum += graphql_1.print(type.astNode) + "\n"
            : accum;
    }, '');
    return schema
        .getDirectives()
        .reduce(function (accum, d) {
        return !graphql_1.isSpecifiedDirective(d)
            ? accum += graphql_1.print(d.astNode) + "\n"
            : accum;
    }, str + (graphql_1.print(schema.astNode) + "\n"));
}
module.exports = {
    plugin: function (schema) {
        var doc = graphql_1.parse(printSchemaWithDirectives(schema));
        var x = schema_1.default(doc);
        return graphql_1.print(x);
    },
};
