import { CardStatus } from "./CardStatus";

export interface CardInfo {
    userId: string;
    interviewSolutionId: string;
    firstName: string;
    surname: string;
    vacancy: string;
    startTimeMs: number;
    endTimeMs: number;
    timeToCheckMs: number;
    averageGrade: number;
    reviewerComment: string;
    doneTasksCount: number;
    tasksCount: number;
    interviewResult: number;
    IsSubmittedByCandidate: boolean;
    IsSolutionTimeExpired: boolean;
    HasReviewerCheckResult: boolean;
    HasHrCheckResult: boolean;
    ProgrammingLanguage: string;
}

export interface CardInfoWithStatus extends CardInfo {
    cardStatus: CardStatus
}

export function GetCardInfosWithStatuses(cardInfos: CardInfo[] | undefined) {
    return cardInfos?.map(cardInfo => ({...cardInfo, cardStatus: getCardStatus(cardInfo)} as CardInfoWithStatus));
}

function getCardStatus(cardInfo: CardInfo) {
    let currentDateTimeInMs = Date.now();

    if (cardInfo.startTimeMs === -1) {
        return CardStatus.isNotStarted;
    } 
    if (cardInfo.startTimeMs === 1) {
        return CardStatus.isInProcess
    } // todo доделать логику
    if (cardInfo.startTimeMs === 0) {
        return CardStatus.isNotDone
    }
    return CardStatus.isDone;
};