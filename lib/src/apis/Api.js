"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChildProcess_1 = __importDefault(require("./ChildProcess"));
const Fs_1 = __importDefault(require("./Fs"));
const Git_1 = __importDefault(require("./Git"));
const Npm_1 = __importDefault(require("./Npm"));
const Api = ({ git: { token = process.env.GITHUB_TOKEN || "", user = process.env.GITHUB_ACTOR || "", email = "action@github.com", branch = "develop", repository = process.env.GITHUB_REPOSITORY || "", } = {}, defaultJsonIndent = 2, } = {}) => {
    const api = Object.assign(Object.assign(Object.assign({}, Fs_1.default({ defaultJsonIndent })), ChildProcess_1.default()), { npm: Npm_1.default({ defaultJsonIndent }), git: Git_1.default({ token, user, email, branch, repository }) });
    return api;
};
exports.default = Api;
//# sourceMappingURL=Api.js.map