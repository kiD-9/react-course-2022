import React, { useMemo, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { CardInfo, CardInfoWithStatus, GetCardInfosWithStatuses } from "../../../Models/CardInfo";
import { CardStatus } from "../../../Models/CardStatus";
import { getCards } from "../../../Routes/Queries";
import { CardComponent } from "../Card/CardComponent";
import { FiltersComponent, FiltersContext } from "../Filters/FiltersComponent";
import "./CardListComponent.less";

export const CardListComponent = React.memo(() => {
    const [cardInfos, setCardInfos] = useState<CardInfo[]>();

    const { isLoading, data } = useQuery('cards', getCards, {onSuccess: setCardInfos });

    const cardInfosWithStatuses: CardInfoWithStatus[] | undefined = useMemo(() => GetCardInfosWithStatuses(cardInfos), [cardInfos, isLoading])

    const [isDone, setIsDone] = useState<boolean>(true);
    const [isInProcess, setIsInProcess] = useState<boolean>(false);
    const [isNotStarted, setIsNotStarted] = useState<boolean>(false);
    const [isNotDone, setIsNotDone] = useState<boolean>(false);


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

    return <div className='cardListComponent'>
        <FiltersContext.Provider value={{isDone, setIsDone, isInProcess, setIsInProcess, isNotStarted, setIsNotStarted, isNotDone, setIsNotDone}}>
            <FiltersComponent></FiltersComponent>
        </FiltersContext.Provider>
        {isLoading
            ? <div>Loading</div>
            : (<div className="cardList">
                {cardInfosWithStatuses?.filter(cardInfo => isShown(cardInfo.cardStatus)).map(cardInfo => <CardComponent {...cardInfo} key={cardInfo.interviewSolutionId}/>)}
            </div>)
        }
    </div>
})