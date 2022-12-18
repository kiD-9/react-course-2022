import { CompilationError } from "./CompilationError";

export interface CodeExecutionResultResponse {
    success: boolean;
    output: string[];
    errors: CompilationError[];
}