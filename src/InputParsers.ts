export type ParserWithDefaultValue<TParsed> = (
    defaultValue?: TParsed,
) => Parser<TParsed>;

export type Parser<TParsed> = (
    v: string,
    defaultValue?: TParsed,
) => TParsed | null;

const parser = <TParsed>(
    inputParser: Parser<TParsed>,
): ParserWithDefaultValue<TParsed> => (defaultValue?: TParsed) => v => {
    const value = inputParser(v, defaultValue);

    if (value == null) {
        if (defaultValue == null) {
            return null;
        }

        return defaultValue;
    }

    return value;
};

export const string = parser((v: string) => v);
export const stringarray = parser(str => str.split("\n").filter(Boolean));
export const object = parser(<TParsed>(v: string, defaultValue?: TParsed) =>
    v ? { ...(defaultValue || {}), ...(JSON.parse(v) as TParsed) } : null,
);
export const array = parser(<TParsed>(v: string) =>
    v ? (JSON.parse(v) as TParsed) : null,
);
export const boolean = parser((v: string) =>
    v ? v === "true" || v === "1" : null,
);
export const date = parser((v: string) => (v ? new Date(v) : null));
