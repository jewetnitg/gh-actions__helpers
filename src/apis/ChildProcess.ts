import { exec, ExecOptions } from "child_process";
import execa from "execa";

interface ChildProcess {
    exec(command: string, options?: ExecOptions): Promise<string>;
    execa: typeof execa;
}

const ChildProcess = (): ChildProcess => {
    //noinspection UnnecessaryLocalVariableJS
    const api: ChildProcess = {
        exec: async (command: string, options: ExecOptions = {}) =>
            new Promise<string>((resolve, reject) =>
                exec(command, options, (err, stdout, stderr) =>
                    err || stderr
                        ? reject(err || new Error(stderr))
                        : resolve(stdout),
                ),
            ),
        execa,
    };

    return api;
};

export default ChildProcess;
