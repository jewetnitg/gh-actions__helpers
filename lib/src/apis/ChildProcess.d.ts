/// <reference types="node" />
import { ExecOptions } from "child_process";
import execa from "execa";
interface ChildProcess {
    exec(command: string, options?: ExecOptions): Promise<string>;
    execa: typeof execa;
}
declare const ChildProcess: () => ChildProcess;
export default ChildProcess;
