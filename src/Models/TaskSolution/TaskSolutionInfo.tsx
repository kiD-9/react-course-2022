export type TaskSolutionInfo = {
    id: string;
    taskOrder: string;
    taskText: string;
    startCode: string;
    isDone: boolean;
}

export type TaskSolutionInfoForReview = {
    id: string;
    taskId: string;
    interviewSolutionId: string;
    fullName: string;
    taskOrder: string;
    isDone: boolean;
    grade: number;
}