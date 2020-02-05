export declare type ParserWithDefaultValue<TParsed> = (defaultValue?: TParsed) => Parser<TParsed>;
export declare type Parser<TParsed> = (v: string, defaultValue?: TParsed) => TParsed | null;
export declare const string: ParserWithDefaultValue<string>;
export declare const stringarray: ParserWithDefaultValue<string[]>;
export declare const object: <TParsed>(defaultValue?: TParsed | undefined) => Parser<TParsed>;
export declare const array: ParserWithDefaultValue<unknown>;
export declare const boolean: ParserWithDefaultValue<boolean>;
export declare const date: ParserWithDefaultValue<Date>;
