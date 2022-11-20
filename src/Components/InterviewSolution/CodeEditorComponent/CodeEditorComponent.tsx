import React, { FC, useContext, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { TaskSolutionInfosContext } from "../../../Models/TaskSolution/TaskSolutionInfosContext";
import { TaskSolutionInfo } from "../../../Models/TaskSolution/TaskSolutionInfo";
import './CodeEditorComponent.less';

export const CodeEditorComponent: React.FC = React.memo(() => {
    const context = useContext(TaskSolutionInfosContext);
    const currentTask = useMemo(() => context?.taskSolutionsInfos[context.chosenTask] as TaskSolutionInfo, [context?.chosenTask]);
    const startCode = useMemo(() => currentTask.startCode, [context?.chosenTask]);
    
    return <Editor className="editorWrapper" height="90vh" defaultLanguage="csharp" value={startCode}/>
})