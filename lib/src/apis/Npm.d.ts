import { JsonValue } from "./Fs";
interface Npm {
    install: ((dependencies?: string[], options?: InstallOptions) => Promise<void>) & {
        dev(dependencies?: string[], options?: InstallOptions): Promise<void>;
    };
    packageJson: {
        scripts: {
            add(scripts: {
                [name: string]: string;
            }): Promise<void>;
        };
        transform(transformer: (pkg: {
            [name: string]: JsonValue;
        }) => Promise<{
            [name: string]: JsonValue;
        } | void> | ({
            [name: string]: JsonValue;
        } | void)): Promise<void>;
    };
    run(script: string, args?: string[]): Promise<void>;
}
export interface InstallOptions {
    bundle?: boolean;
    exact?: boolean;
    type?: "prod" | "dev" | "optional";
}
export interface NpmOptions {
    defaultJsonIndent: string | number;
}
declare const Npm: ({ defaultJsonIndent }: NpmOptions) => Npm;
export default Npm;
