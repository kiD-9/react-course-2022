export interface CompilationError {
    errorCode: string;
    message: string;
    startChar: number;
    endChar: number;
    startLine: number;
    endLine: number;
}