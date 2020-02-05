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

const Api = ({
    git: {
        token = process.env.GITHUB_TOKEN || "",
        user = process.env.GITHUB_ACTOR || "",
        email = "action@github.com",
        branch = "develop",
        repository = process.env.GITHUB_REPOSITORY || "",
    } = {},
    defaultJsonIndent = 2,
}: ApiOptions = {}): Api => {
    const api: Api = {
        ...Fs({ defaultJsonIndent }),
        ...ChildProcess(),
        npm: Npm({ defaultJsonIndent }),
        git: Git({ token, user, email, branch, repository }),
    };

    return api;
};

export default Api;
