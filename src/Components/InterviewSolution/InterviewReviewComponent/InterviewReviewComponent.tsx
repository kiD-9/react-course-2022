import React, { useState } from "react"
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom"
import { TaskTextComponent } from "../TaskTextComponent/TaskTextComponent";
import { TaskSolutionInfo } from "../../../Models/TaskSolution/TaskSolutionInfo";
import "./InterviewReviewComponent.less";
import { TaskSolutionInfosContext } from "../../../Models/TaskSolution/TaskSolutionInfosContext";
import { TaskChooserComponent } from "../TaskChooserComponent/TaskChooserComponent";
import { CodeEditorComponent } from "../CodeEditorComponent/CodeEditorComponent";
import { getTaskSolutionsInfos } from "../../../Routes/Queries";

export const InterviewReviewComponent = React.memo(() => {
    const { id } = useParams();
    const [taskSolutionsInfos, setTaskSolutionsInfos] = useState<TaskSolutionInfo[]>([]);
    const [chosenTask, setChosenTask] = useState<number>(0);
    // const interviewSolutionInfoResponse = useQuery(['interviewSolution', id], () => { return fetchInterviewSolutionInfo(id) }, {onSuccess: () => {  } })
    const taskSolutionsInfosResponse = useQuery(['taskSolutions', id], () => { return getTaskSolutionsInfos(id) }, {onSuccess: setTaskSolutionsInfos })
    if (taskSolutionsInfosResponse.isLoading) return <div>Loading</div>

    return <div className="interviewReview">
        <Link to='/cards' className="back">Back</Link>
        <TaskSolutionInfosContext.Provider value={{taskSolutionsInfos, setTaskSolutionsInfos, chosenTask, setChosenTask}}>
            <TaskChooserComponent/>
            <TaskTextComponent/>
            <CodeEditorComponent/>
        </TaskSolutionInfosContext.Provider>
    </div>
})