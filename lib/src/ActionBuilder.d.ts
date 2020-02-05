import Action, { StepFn } from "./Action";
export declare type InputDeserializer<TDeserialized> = (input: string) => TDeserialized | null;
interface ActionBuilder<TInputs> {
    input: <TName extends keyof TInputs>(name: TName, deserializer: InputDeserializer<TInputs[TName]>) => ActionBuilder<TInputs>;
    syntheticInput: <TName extends keyof TInputs>(name: TName, deserializer: (inputs: Partial<TInputs>) => TInputs[TName]) => ActionBuilder<TInputs>;
    step: (message: string, fn: StepFn<TInputs>) => ActionBuilder<TInputs>;
    build: () => Action;
}
declare const ActionBuilder: <TInputs>() => ActionBuilder<TInputs>;
export default ActionBuilder;
