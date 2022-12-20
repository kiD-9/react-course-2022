export interface InterviewContest {
    id: string;
    vacancy: string;
    interviewText: string;
    interviewDurationMs: number;
    startTimeMs: number;
    endTimeMs: number;
    isStarted: number
    isSubmittedByCandidate: number;
    programmingLanguage: string;
    isSynchronous: boolean;
}