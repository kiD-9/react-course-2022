import React, { useContext } from "react"
import { TaskSolutionInfo } from "../../../Models/TaskSolution/TaskSolutionInfo";
import { TaskSolutionInfosContext } from "../../../Models/TaskSolution/TaskSolutionInfosContext";

export const TaskTextComponent = React.memo(() => {
    const context = useContext(TaskSolutionInfosContext);
    const task: TaskSolutionInfo = context?.taskSolutionsInfos[context?.chosenTask] as TaskSolutionInfo;

    return <div className="textComponent">
        <p className="text">{task.taskText}</p>
    </div>
})