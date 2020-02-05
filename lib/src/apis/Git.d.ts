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
declare const Git: (options: GitOptions) => Git;
export default Git;
