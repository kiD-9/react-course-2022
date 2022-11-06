import React, { FC, useMemo, useRef, useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { CardComponent } from "../Card/CardComponent";
import { CardInfo, CardInfoWithStatus, GetCardInfosWithStatuses } from "../Card/CardInfo";
import { CardStatus } from "../Card/CardStatus";
import { FiltersComponent, FiltersContext, FiltersContextType } from "../Filters/FiltersComponent";
import "./CardListComponent.less";

export const CardListComponent = React.memo(() => {
    const [cardInfos, setCardInfos] = useState<CardInfo[]>();
    const [cardInfosWithStatuses, setCardInfosWithStatuses] = useState<CardInfoWithStatus[]>();

    const [isDone, setIsDone] = useState<boolean>(true);
    const [isInProcess, setIsInProcess] = useState<boolean>(false);
    const [isNotStarted, setIsNotStarted] = useState<boolean>(false);
    const [isNotDone, setIsNotDone] = useState<boolean>(false);

    useEffect(() => {
        fetch('https://localhost:5001/api/cards')
        .then(result => result.json())
        .then(setCardInfos)

        setCardInfosWithStatuses(GetCardInfosWithStatuses(cardInfos));
    }, []);

    const isShown = (status: CardStatus) => {
        switch (status) {
            case CardStatus.isDone:
                return isDone;
            case CardStatus.isInProcess:
                return isInProcess;
            case CardStatus.isNotStarted:
                return isNotStarted;
            case CardStatus.isNotDone:
                return isNotDone;
            default:
                return true;
        }
    }

    const cards = cardInfosWithStatuses?.filter(cardInfo => isShown(cardInfo.cardStatus)).map(cardInfo => <CardComponent {...cardInfo}/>);

    return <div className='cardListComponent'>
        <FiltersContext.Provider value={{isDone, setIsDone, isInProcess, setIsInProcess, isNotStarted, setIsNotStarted, isNotDone, setIsNotDone}}>
            <FiltersComponent></FiltersComponent>
        </FiltersContext.Provider>
        <div className="cardList">
            {cards}
        </div>
    </div>
})