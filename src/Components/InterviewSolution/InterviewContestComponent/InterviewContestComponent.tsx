import React, { useState } from "react"
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom"
import { TaskTextComponent } from "../TaskTextComponent/TaskTextComponent";
import { TaskSolutionInfo } from "../../../Models/TaskSolution/TaskSolutionInfo";
import "./InterviewContestComponent.less";
import { TaskSolutionInfosContext } from "../../../Models/TaskSolution/TaskSolutionInfosContext";
import { TaskChooserComponent } from "../TaskChooserComponent/TaskChooserComponent";
import { CodeEditorComponent } from "../CodeEditorComponent/CodeEditorComponent";
import { getTaskSolutionsInfos } from "../../../Routes/Queries";

export const InterviewContestComponent = React.memo(() => {
    const { interviewSolutionId } = useParams();

    const [taskSolutionsInfos, setTaskSolutionsInfos] = useState<TaskSolutionInfo[]>([]);
    const [chosenTask, setChosenTask] = useState<number>(0);
    const taskSolutionsInfosResponse = useQuery(['taskSolutions', interviewSolutionId], () => { return getTaskSolutionsInfos(interviewSolutionId) }, {onSuccess: setTaskSolutionsInfos })
    if (taskSolutionsInfosResponse.isLoading) return <div>Loading</div>
    console.log(taskSolutionsInfos);

    return <div className="interviewContest">
        <TaskSolutionInfosContext.Provider value={{taskSolutionsInfos, setTaskSolutionsInfos, chosenTask, setChosenTask}}>
            <TaskChooserComponent/>
            <TaskTextComponent/>
            <CodeEditorComponent/>
        </TaskSolutionInfosContext.Provider>
    </div>
})