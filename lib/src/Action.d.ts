import Api from "./apis";
import { ApiOptions } from "./apis/Api";
export declare type StepFn<TInputs> = (api: Api, inputs: TInputs) => Promise<void>;
interface Action {
    run(options?: ApiOptions): Promise<void>;
}
declare const Action: <TInputs>(steps: [string, StepFn<TInputs>][], getInputs: () => TInputs) => Action;
export default Action;
