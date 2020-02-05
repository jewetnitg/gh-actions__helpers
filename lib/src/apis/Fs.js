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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fs = __importStar(require("fs-extra"));
const Fs = ({ defaultJsonIndent }) => {
    const api = Object.assign(Object.assign({}, fs), { detectJsonIndent: (path) => __awaiter(void 0, void 0, void 0, function* () {
            const textContent = (yield api.readFile(path)).toString();
            try {
                JSON.parse(textContent);
            }
            catch (err) {
                throw new Error(`Unable to detect json indent, provided string is not valid JSON`);
            }
            const indeterminableValues = ["{}", "[]", "null", "true", "false"];
            if (indeterminableValues.includes(textContent) ||
                // is a string
                textContent.startsWith(`"`) ||
                // is a number
                textContent.match(/^\d+$/g)) {
                return null;
            }
            const lines = textContent
                .split("\n")
                // remove empty lines
                .filter(line => line && !line.match(/^\s+$/g));
            if (lines.length < 3) {
                return null;
            }
            // find a "regular" line
            const line = lines.find(l => l.match(/^\s+"/g));
            if (!line) {
                return null;
            }
            return line.slice(0, line.indexOf(`"`));
        }), writeJson: (path, content) => __awaiter(void 0, void 0, void 0, function* () {
            const indent = (yield api.pathExists(path))
                ? (yield api.detectJsonIndent(path)) || defaultJsonIndent
                : defaultJsonIndent;
            core.info(`Writing json file "${path}"`);
            const json = JSON.stringify(content, null, indent);
            core.info(json);
            return api.writeFile(path, json);
        }), writeFiles: (files) => __awaiter(void 0, void 0, void 0, function* () {
            const entries = Object.entries(files);
            for (const [path, content] of entries) {
                if (typeof content === "string" || Buffer.isBuffer(content)) {
                    yield api.writeFile(path, content);
                }
                else if (typeof content === "object") {
                    yield api.writeJson(path, content);
                }
                else {
                    throw new Error(`Unable to write file ${path}, ` +
                        `content has an invalid type "${typeof content}"`);
                }
            }
        }) });
    return api;
};
exports.default = Fs;
//# sourceMappingURL=Fs.js.map