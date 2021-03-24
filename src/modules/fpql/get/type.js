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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var name_1 = __importDefault(require("./name"));
var types_1 = __importDefault(require("./types"));
var fields_1 = __importDefault(require("./fields"));
function getType(name, options) {
    if (options === void 0) { options = {}; }
    return function (document) {
        var types = types_1.default(document);
        var matches = types.filter(function (type) {
            return name_1.default(type) === name &&
                (type.kind === 'ObjectTypeDefinition' ||
                    type.kind === 'ObjectTypeExtension');
        });
        if (!matches.length) {
            return undefined;
        }
        if (matches.length === 1) {
            return matches[0];
        }
        var _a = options.includesExtended, includesExtended = _a === void 0 ? true : _a;
        if (includesExtended) {
            return __assign(__assign({}, matches[0]), { 
                // @ts-ignore
                fields: matches.reduce(
                // @ts-ignore
                function (all, match) { return __spreadArray(__spreadArray([], all), fields_1.default(match)); }, []) });
        }
        return matches[0];
    };
}
exports.default = getType;
