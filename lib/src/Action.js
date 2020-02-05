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
const apis_1 = __importDefault(require("./apis"));
const Action = (steps, getInputs) => ({
    run: (options = {}) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const api = apis_1.default(options);
            for (const [message, fn] of steps) {
                try {
                    yield core.group(message, () => __awaiter(void 0, void 0, void 0, function* () {
                        yield fn(api, getInputs());
                        yield api.git
                            .add(".")
                            .commit(message)
                            .execute();
                    }));
                }
                catch (e) {
                    core.setFailed(e.message);
                    return;
                }
            }
            yield api.git.push().execute();
        }
        catch (e) {
            core.setFailed(e.message);
        }
    }),
});
exports.default = Action;
//# sourceMappingURL=Action.js.map