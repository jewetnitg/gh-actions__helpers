import * as core from "@actions/core";
import Action, { StepFn } from "./Action";

export type InputDeserializer<TDeserialized> = (
    input: string,
) => TDeserialized | null;

interface ActionBuilder<TInputs> {
    input: <TName extends keyof TInputs>(
        name: TName,
        deserializer: InputDeserializer<TInputs[TName]>,
    ) => ActionBuilder<TInputs>;
    syntheticInput: <TName extends keyof TInputs>(
        name: TName,
        deserializer: (inputs: Partial<TInputs>) => TInputs[TName],
    ) => ActionBuilder<TInputs>;
    step: (message: string, fn: StepFn<TInputs>) => ActionBuilder<TInputs>;
    build: () => Action;
}

const ActionBuilder = <TInputs>(): ActionBuilder<TInputs> => {
    const steps: [string, StepFn<TInputs>][] = [];
    const inputDeserializers: [
        keyof TInputs,
        InputDeserializer<TInputs[keyof TInputs]>,
    ][] = [];
    const syntheticInputDeserializers: [
        keyof TInputs,
        (inputs: Partial<TInputs>) => TInputs[keyof TInputs],
    ][] = [];

    const getInputs = (): TInputs =>
        syntheticInputDeserializers.reduce(
            (inputs, [key, deserialize]) => ({
                ...inputs,
                [key]: deserialize(inputs),
            }),
            inputDeserializers.reduce(
                (inputs, [key, deserialize]) => ({
                    ...inputs,
                    [key]: deserialize(core.getInput(key as string)),
                }),
                {},
            ) as TInputs,
        );

    const builder: ActionBuilder<TInputs> = {
        input: (name, deserializer) => {
            inputDeserializers.push([name, deserializer]);
            return builder;
        },
        syntheticInput: (name, deserializer) => {
            syntheticInputDeserializers.push([name, deserializer]);
            return builder;
        },
        step: (message, fn) => {
            steps.push([message, fn]);
            return builder;
        },
        build: () => Action(steps, getInputs),
    };

    return builder;
};

export default ActionBuilder;
