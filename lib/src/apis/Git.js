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
const ChildProcess_1 = __importDefault(require("./ChildProcess"));
const checkoutCommand = ({ options: { branch }, hasBranch, }) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield hasBranch(branch);
    return [
        "git",
        ["checkout", !exists && "-b", branch].filter(Boolean),
    ];
});
const initialGitCommands = (git) => __awaiter(void 0, void 0, void 0, function* () {
    return [
        ["git", ["config", "--local", "user.name", git.options.user]],
        ["git", ["config", "--local", "user.email", git.options.email]],
        yield checkoutCommand(git),
    ].filter(Boolean);
});
const Git = (options) => {
    const { branch, user, token, repository } = options;
    const { execa, exec } = ChildProcess_1.default();
    const remoteUrl = `https://${user}:${token}@github.com/${repository}.git`;
    let commands = [];
    let shouldExecute = false;
    const git = {
        options: Object.freeze(Object.assign({}, options)),
        getBranches: () => __awaiter(void 0, void 0, void 0, function* () {
            return (yield exec(`git branch | tail`))
                .split("\n")
                .map(v => v.replace("*", "").replace(/\s+/g, ""));
        }),
        hasBranch: (name) => __awaiter(void 0, void 0, void 0, function* () { return (yield git.getBranches()).includes(name); }),
        add: (files = ["."]) => {
            if (shouldExecute) {
                throw new Error(`Execute before performing another git action`);
            }
            commands.push([
                "git",
                [
                    "add",
                    ...(Array.isArray(files) ? files : [files]).filter(Boolean),
                ],
            ]);
            return git;
        },
        commit: (message) => {
            if (shouldExecute) {
                throw new Error(`Execute before performing another git action`);
            }
            commands.push(["git", ["commit", "-m", message]]);
            return git;
        },
        push: (flags = []) => {
            if (shouldExecute) {
                throw new Error(`Execute before performing another git action`);
            }
            commands.push([
                "git",
                ["push", "--force", "-u", remoteUrl, branch, ...flags],
            ]);
            shouldExecute = true;
            return git;
        },
        execute: () => __awaiter(void 0, void 0, void 0, function* () {
            for (const [command, args] of [
                ...(yield initialGitCommands(git)),
                ...commands,
            ]) {
                yield execa(command, args);
            }
            shouldExecute = false;
            commands = yield initialGitCommands(git);
        }),
    };
    return git;
};
exports.default = Git;
//# sourceMappingURL=Git.js.map