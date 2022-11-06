import React, { FC, useMemo, useRef, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchCards } from "../../../Scripts/ReviewQueries";
import { CardComponent } from "../Card/CardComponent";
import { CardInfo, CardInfoWithStatus, GetCardInfosWithStatuses } from "../Card/CardInfo";
import { CardStatus } from "../Card/CardStatus";
import { FiltersComponent, FiltersContext } from "../Filters/FiltersComponent";
import "./CardListComponent.less";

export const CardListComponent = React.memo(() => {
    const [cardInfosWithStatuses, setCardInfosWithStatuses] = useState<CardInfoWithStatus[]>();

    const [isDone, setIsDone] = useState<boolean>(true);
    const [isInProcess, setIsInProcess] = useState<boolean>(false);
    const [isNotStarted, setIsNotStarted] = useState<boolean>(false);
    const [isNotDone, setIsNotDone] = useState<boolean>(false);

    const { isLoading, data } = useQuery('cards', fetchCards, {onSuccess: () => { setCardInfosWithStatuses(GetCardInfosWithStatuses(data)) } })
    console.log(isLoading);

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
        {!isLoading && (
            <div className="cardList">
                {cardInfosWithStatuses?.filter(cardInfo => isShown(cardInfo.cardStatus)).map(cardInfo => <CardComponent {...cardInfo}/>)}
            </div>)
        }
    </div>
})