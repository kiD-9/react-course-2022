import React, { FC, useMemo, useRef, useState, useEffect } from "react";
import { CardComponent, CardInfo } from "../Card/CardComponent";
import "./CardListComponent.less";

export type FiltersContextType = {
    isDoneFilter: boolean;
    isInProcessFilter: boolean;
    isNotStartedFilter: boolean;
    isNotDoneFilter: boolean;
}

export const FiltersContext = React.createContext<FiltersContextType | undefined>(undefined);

export const CardListComponent = React.memo(() => {
    const [cardInfos, setCardInfos] = useState<CardInfo[]>();
    const [isDoneFilter, setIsDoneFilter] = useState<boolean>(false);
    const [isInProcessFilter, setIsInProcessFilter] = useState<boolean>(false);
    const [isNotStartedFilter, setIsNotStartedFilter] = useState<boolean>(false);
    const [isNotDoneFilter, setIsNotDoneFilter] = useState<boolean>(false);

    useEffect(() => {
        fetch('https://localhost:5001/api/cards')
        .then(result => result.json())
        .then(setCardInfos)         
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>, setFilterValue: React.Dispatch<React.SetStateAction<boolean>>) => {
        setFilterValue(event.target.checked);
    };

    const cards = cardInfos?.map((cardInfo) => {
        return <FiltersContext.Provider value={{isDoneFilter, isInProcessFilter, isNotStartedFilter, isNotDoneFilter}}>
            <CardComponent {...cardInfo}/>
        </FiltersContext.Provider>
    });

    return <div className='cardListComponent'>
        <div className="filters">
            <div className="filterWrapper">
                <input type="checkbox" id="doneFilter" name="doneFilter" className="filter" checked={isDoneFilter} onChange={(e) => {handleFilterChange(e, setIsDoneFilter)}}></input>
                <label htmlFor="doneFilter">Выполнено</label>
            </div>
            <div className="filterWrapper">
                <input type="checkbox" id="inProcessFilter" name="inProcessFilter" className="filter" checked={isInProcessFilter} onChange={(e) => {handleFilterChange(e, setIsInProcessFilter)}}></input>
                <label htmlFor="inProcessFilter">В процессе</label>
            </div>
            <div className="filterWrapper">
                <input type="checkbox" id="notStartedFilter" name="notStartedFilter" className="filter" checked={isNotStartedFilter} onChange={(e) => {handleFilterChange(e, setIsNotStartedFilter)}}></input>
                <label htmlFor="notStartedFilter">Не начато</label>
            </div>
            <div className="filterWrapper">
                <input type="checkbox" id="notDoneFilter" name="notDoneFilter" className="filter" checked={isNotDoneFilter} onChange={(e) => {handleFilterChange(e, setIsNotDoneFilter)}}></input>
                <label htmlFor="notDoneFilter">Не выполнено</label>
            </div>
        </div>
        <div className="cardList">
            {cards}
        </div>
    </div>
})

export const FiltersComponent = React.memo(() => {
    return <div className="filters">
        <input type="checkbox" className=""></input>
    </div>
})