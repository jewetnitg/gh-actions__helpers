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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const ChildProcess_1 = __importDefault(require("./ChildProcess"));
const Fs_1 = __importDefault(require("./Fs"));
const paths = {
    packageJson: "package.json",
};
const Npm = ({ defaultJsonIndent }) => {
    const { execa } = ChildProcess_1.default();
    const { writeJson, readJson } = Fs_1.default({ defaultJsonIndent });
    const npm = {
        install: Object.assign((dependencies = [], { bundle = false, exact = false, type = "prod", } = {}) => __awaiter(void 0, void 0, void 0, function* () {
            const flags = dependencies.length
                ? [
                    `--save-${type}`,
                    bundle && "--save-bundle",
                    exact && "--save-exact",
                ].filter(Boolean)
                : [];
            if (dependencies.length) {
                core.info(`Adding ${type} dependencies: ${dependencies.join(", ")}`);
            }
            yield execa(`npm`, [`install`, ...flags, ...dependencies], {
                env: process.env,
            });
        }), {
            dev: (dependencies = [], options = {}) => __awaiter(void 0, void 0, void 0, function* () { return npm.install(dependencies, Object.assign(Object.assign({}, options), { type: "dev" })); }),
        }),
        packageJson: {
            scripts: {
                add: (scripts) => __awaiter(void 0, void 0, void 0, function* () {
                    const keys = Object.keys(scripts).join(", ");
                    if (!keys.length) {
                        return;
                    }
                    core.info(`Adding ${keys} scripts to package.json`);
                    return npm.packageJson.transform(pkg => (Object.assign(Object.assign({}, pkg), { scripts: Object.assign(Object.assign({}, (pkg.scripts || {})), scripts) })));
                }),
            },
            transform: (transformer) => __awaiter(void 0, void 0, void 0, function* () {
                const pkg = yield readJson(paths.packageJson);
                const transformedPkg = (yield transformer(pkg)) || pkg;
                yield writeJson(paths.packageJson, transformedPkg);
            }),
        },
        run: (scriptName, args = []) => __awaiter(void 0, void 0, void 0, function* () {
            core.info(`Running npm script "${scriptName}"`);
            if (args.length) {
                core.info(`Script arguments: ${args.join(", ")}"`);
            }
            yield execa("npm", [
                "run",
                scriptName,
                ...(args.length ? ["--", ...args] : []),
            ]);
        }),
    };
    return npm;
};
exports.default = Npm;
//# sourceMappingURL=Npm.js.map