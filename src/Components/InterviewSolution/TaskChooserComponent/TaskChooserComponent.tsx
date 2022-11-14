import React, { useContext } from "react";
import { TaskSolutionInfosContext } from "../../../Models/TaskSolution/TaskSolutionInfosContext";
import "./TaskChooserComponent.less";

export const TaskChooserComponent = React.memo(() => {
    const context = useContext(TaskSolutionInfosContext);
    const chosenTaskId = context?.taskSolutionsInfos[context.chosenTask].id as string;

    const changeTaskSolution = (taskSolutionId: string) => {
        let newChosenIndex = context?.taskSolutionsInfos.findIndex(t => t.id === taskSolutionId) as number;
        if (newChosenIndex >= 0) {
            context?.setChosenTask(newChosenIndex);
        }
    };
    
    return <div className="taskChooser">
        {context?.taskSolutionsInfos.map(t => <button className={`taskButton${t.id === chosenTaskId ? ' chosen' : ''}`} key={t.id} onClick={e => changeTaskSolution(t.id)}>{t.taskOrder}</button>)}
    </div>
})