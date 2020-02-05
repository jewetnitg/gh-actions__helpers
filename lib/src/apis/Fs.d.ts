/// <reference types="node" />
import * as fs from "fs-extra";
export declare type JsonValue = object | string | number | boolean | null;
export interface FileMap {
    [name: string]: (string | Buffer) | JsonValue;
}
declare type Fs = typeof fs & {
    detectJsonIndent(path: string): Promise<string | null>;
    writeJson(path: string, content: JsonValue): Promise<void>;
    writeFiles(files: FileMap): Promise<void>;
};
export interface FsOptions {
    defaultJsonIndent: string | number;
}
declare const Fs: ({ defaultJsonIndent }: FsOptions) => Fs;
export default Fs;
