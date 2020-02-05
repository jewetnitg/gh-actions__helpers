"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = (inputParser) => (defaultValue) => v => {
    const value = inputParser(v, defaultValue);
    if (value == null) {
        if (defaultValue == null) {
            return null;
        }
        return defaultValue;
    }
    return value;
};
exports.string = parser((v) => v);
exports.stringarray = parser(str => str.split("\n").filter(Boolean));
exports.object = parser((v, defaultValue) => v ? Object.assign(Object.assign({}, (defaultValue || {})), JSON.parse(v)) : null);
exports.array = parser((v) => v ? JSON.parse(v) : null);
exports.boolean = parser((v) => v ? v === "true" || v === "1" : null);
exports.date = parser((v) => (v ? new Date(v) : null));
//# sourceMappingURL=InputParsers.js.map