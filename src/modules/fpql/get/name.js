"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getName(type) {
    if (typeof type === 'undefined') {
        return '';
    }
    if ('name' in type) {
        var name_1 = type.name;
        if (name_1) {
            return name_1.value;
        }
    }
    return '';
}
exports.default = getName;
