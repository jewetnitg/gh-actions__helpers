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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const execa_1 = __importDefault(require("execa"));
const ChildProcess = () => {
    //noinspection UnnecessaryLocalVariableJS
    const api = {
        exec: (command, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
            return new Promise((resolve, reject) => child_process_1.exec(command, options, (err, stdout, stderr) => err || stderr
                ? reject(err || new Error(stderr))
                : resolve(stdout)));
        }),
        execa: execa_1.default,
    };
    return api;
};
exports.default = ChildProcess;
//# sourceMappingURL=ChildProcess.js.map