import React, { useContext, useEffect, useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { TaskSolutionInfosContext } from "../../../Models/TaskSolution/TaskSolutionInfosContext";
import { TaskSolutionInfo } from "../../../Models/TaskSolution/TaskSolutionInfo";
import './CodeEditorComponent.less';
import { executeCode } from "../../../Routes/Queries";
import { EntryPoint } from "../../../Models/CodeExecution/EntryPoint";
import { CodeExecutionResultResponse } from "../../../Models/CodeExecution/CodeExecutionResultResponse";

export interface CodeEditorProps {
    isReadonly: boolean;
}

export const CodeEditorComponent = React.memo((props: CodeEditorProps) => {
    const entryPoint: EntryPoint = {namespaceName: 'CodeRev', className: 'Program', methodName: 'Main'};

    const context = useContext(TaskSolutionInfosContext);
    const [currentTask, setCurrentTask] = useState<TaskSolutionInfo>(context?.taskSolutionsInfos[context.chosenTask] as TaskSolutionInfo)

    const getCodeForTask = () => {
        let code: string = localStorage.getItem(currentTask.id);
        if (!code)
            code = currentTask.startCode;
        return code;
    }
    
    const [code, setCode] = useState<string>(getCodeForTask());
    const [executionResult, setExecutionResult] = useState<CodeExecutionResultResponse>();

    useEffect(() => {
        localStorage.setItem(currentTask.id, code);
        setCurrentTask(context?.taskSolutionsInfos[context.chosenTask] as TaskSolutionInfo)
    }, [context?.chosenTask])

    useEffect(() => {
        setCode(getCodeForTask());
    }, [currentTask])

    const runCode = () => {
        const data = executeCode(code, entryPoint).then(response => {
            setExecutionResult(response)
        });
    }

    return <div className="editorWrapper">
        <button className="runBtn" onClick={runCode}>Run</button>
        <Editor height="70vh" defaultLanguage="csharp" value={code} onChange={(value) => setCode(value)} options={{readOnly: props.isReadonly}}/>
        <div className="executionResult">
            {!!executionResult && (executionResult.success
            ? (
                <span className="success">
                    {executionResult.output.map(line => <span>
                        {line} <br />
                    </span>)}
                </span>
            )
            : (
                <span className="errors">
                    {executionResult.errors.map(e => <span>
                        {`(${e.startLine + 1}, ${e.startChar + 1}): [${e.errorCode}] ${e.message}`} <br />
                    </span>
                    )}
                </span>
            ))}
        </div>
    </div>
})