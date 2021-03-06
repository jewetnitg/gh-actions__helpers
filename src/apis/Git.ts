import ChildProcess from "./ChildProcess";

type Command = [string, string[]];

interface Git {
    readonly options: GitOptions;

    getBranches(): Promise<string[]>;
    hasBranch(branch: string): Promise<boolean>;

    add(files?: string | string[]): Git;
    commit(message: string): Git;
    push(flags?: string[]): Git;

    execute(): Promise<void>;
}

export interface GitOptions {
    token: string;
    user: string;
    email: string;
    branch: string;
    repository: string;
}
const checkoutCommand = async ({
    options: { branch },
    hasBranch,
}: Git): Promise<Command> => {
    const exists = await hasBranch(branch);

    return [
        "git",
        ["checkout", !exists && "-b", branch].filter(Boolean) as string[],
    ];
};

const initialGitCommands = async (git: Git): Promise<[string, string[]][]> =>
    [
        ["git", ["config", "--local", "user.name", git.options.user]],
        ["git", ["config", "--local", "user.email", git.options.email]],
        await checkoutCommand(git),
    ].filter(Boolean) as [string, string[]][];

const Git = (options: GitOptions): Git => {
    const { branch, user, token, repository } = options;
    const { execa, exec } = ChildProcess();
    const remoteUrl = `https://${user}:${token}@github.com/${repository}.git`;
    let commands: [string, string[]][] = [];
    let shouldExecute = false;

    const git: Git = {
        options: Object.freeze({ ...options }),
        getBranches: async () =>
            (await exec(`git branch | tail`))
                .split("\n")
                .map(v => v.replace("*", "").replace(/\s+/g, "")),
        hasBranch: async name => (await git.getBranches()).includes(name),
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
        commit: (message: string) => {
            if (shouldExecute) {
                throw new Error(`Execute before performing another git action`);
            }

            commands.push(["git", ["commit", "-m", message]]);

            return git;
        },
        push: (flags: string[] = []) => {
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
        execute: async () => {
            for (const [command, args] of [
                ...(await initialGitCommands(git)),
                ...commands,
            ]) {
                await execa(command, args);
            }

            shouldExecute = false;

            commands = await initialGitCommands(git);
        },
    };

    return git;
};

export default Git;
