import React from "react";
import { TaskSolutionInfo } from "./TaskSolutionInfo";

export type TaskSolutionInfosContextType = {
    taskSolutionsInfos: TaskSolutionInfo[];
    setTaskSolutionsInfos: React.Dispatch<React.SetStateAction<TaskSolutionInfo[]>>;
    chosenTask: number;
    setChosenTask: React.Dispatch<React.SetStateAction<number>>;
}

export const TaskSolutionInfosContext = React.createContext<TaskSolutionInfosContextType | undefined>(undefined);