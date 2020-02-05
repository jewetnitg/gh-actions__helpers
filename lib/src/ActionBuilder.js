"use strict";
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
const Action_1 = __importDefault(require("./Action"));
const ActionBuilder = () => {
    const steps = [];
    const inputDeserializers = [];
    const syntheticInputDeserializers = [];
    const getInputs = () => syntheticInputDeserializers.reduce((inputs, [key, deserialize]) => (Object.assign(Object.assign({}, inputs), { [key]: deserialize(inputs) })), inputDeserializers.reduce((inputs, [key, deserialize]) => (Object.assign(Object.assign({}, inputs), { [key]: deserialize(core.getInput(key)) })), {}));
    const builder = {
        input: (name, deserializer) => {
            inputDeserializers.push([name, deserializer]);
            return builder;
        },
        syntheticInput: (name, deserializer) => {
            syntheticInputDeserializers.push([name, deserializer]);
            return builder;
        },
        step: (message, fn) => {
            steps.push([message, fn]);
            return builder;
        },
        build: () => Action_1.default(steps, getInputs),
    };
    return builder;
};
exports.default = ActionBuilder;
//# sourceMappingURL=ActionBuilder.js.map