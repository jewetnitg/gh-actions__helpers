import ChildProcess from "./ChildProcess";
import Fs from "./Fs";
import Git from "./Git";
import Npm from "./Npm";
interface Api extends Fs, ChildProcess {
    npm: Npm;
    git: Git;
}
export interface ApiOptions {
    git?: {
        token?: string;
        user?: string;
        email?: string;
        branch?: string;
        repository?: string;
    };
    defaultJsonIndent?: string | number;
}
declare const Api: ({ git: { token, user, email, branch, repository, }, defaultJsonIndent, }?: ApiOptions) => Api;
export default Api;
