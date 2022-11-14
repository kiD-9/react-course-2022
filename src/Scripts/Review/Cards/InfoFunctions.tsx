import { CardInfo, CardInfoWithStatus } from "../../../Models/CardInfo";
import { CardStatus } from "../../../Models/CardStatus";

export function GetCardInfosWithStatuses(cardInfos: CardInfo[] | undefined) {
    return cardInfos?.map(cardInfo => GetCardInfoWithStatus(cardInfo))
}

export const getCards = async () => {
    const json = await fetch('https://localhost:5001/api/cards').then(res => res.json());
    const cards: CardInfo[] = JSON.parse(json);
    return cards;
};

function GetCardInfoWithStatus(cardInfo: CardInfo) {
    let cardStatus: CardStatus = getCardStatus(cardInfo);
    return {...cardInfo, cardStatus} as CardInfoWithStatus;
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