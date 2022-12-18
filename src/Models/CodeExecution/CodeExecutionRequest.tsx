import { EntryPoint } from "./EntryPoint";

export interface CodeExecutionRequest {
    code: string;
    entryPoint: EntryPoint;
}