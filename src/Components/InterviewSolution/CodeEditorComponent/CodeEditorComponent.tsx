import React, { FC, useContext, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { TaskSolutionInfosContext } from "../../../Models/TaskSolution/TaskSolutionInfosContext";
import { TaskSolutionInfo } from "../../../Models/TaskSolution/TaskSolutionInfo";
import './CodeEditorComponent.less';
import { executeCode } from "../../../Routes/Queries";
import { useQuery } from "react-query";
import { EntryPoint } from "../../../Models/CodeExecution/EntryPoint";
import { CodeExecutionResultResponse } from "../../../Models/CodeExecution/CodeExecutionResultResponse";

export const CodeEditorComponent: React.FC = React.memo(() => {
    const entryPoint: EntryPoint = {namespaceName: 'CodeRev', className: 'Program', methodName: 'Main'};

    const context = useContext(TaskSolutionInfosContext);
    const currentTask = useMemo(() => context?.taskSolutionsInfos[context.chosenTask] as TaskSolutionInfo, [context?.chosenTask]);
    const [code, setCode] = useState<string>(currentTask.startCode);
    const [executionResult, setExecutionResult] = useState<CodeExecutionResultResponse>();

    const runCode = () => {
        const data = executeCode(code, entryPoint).then(response => {
            setExecutionResult(response)
        });
    }
    
    return <div className="editorWrapper">
        <button className="runBtn" onClick={runCode}>Run</button>
        <Editor height="90vh" defaultLanguage="csharp" value={code} onChange={(value) => {setCode(value)}}/>
        {executionResult?.output.length !== 0 && (
            <span className="executionResult">{executionResult?.output}</span>
        )}
    </div>
})