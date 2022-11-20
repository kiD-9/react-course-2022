export const fetchCards = async () => {
    return await fetch('https://localhost:5001/api/cards').then(res => res.json());
};

export const fetchInterviewSolutionInfo = async (interviewSolutionId: string | undefined) => {
    return await fetch(`https://localhost:5001/api/interviews/solution?id=${ interviewSolutionId }`).then(res => res.json());
}

export const fetchTaskSolutionsInfos = async (interviewSolutionId: string | undefined) => {
    return await fetch(`https://localhost:5001/api/contest/task-slns-info?id=${ interviewSolutionId }`).then(res => res.json());
}