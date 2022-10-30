import React, { useContext, useState, useRef, useCallback, useMemo } from "react";
import { FiltersContext } from "../CardList/CardListComponent";
import "./CardComponent.less";
import { CardStatus } from "./CardStatusEnum";

export const CardComponent = React.memo(({
    userId,
    interviewSolutionId,
    fullName,
    vacancy,
    startTimeMs,
    timeToCheckMs,
    averageGrade,
    reviewerComment,
    doneTasksCount,
    tasksCount,
    interviewResult
} : CardInfo) => {
    const filters = useContext(FiltersContext);

    const cardStatus: CardStatus = useMemo(
        () => {
            let currentDateTimeInMs = Date.now();
            if (startTimeMs === -1) {
                return CardStatus.isNotStarted;
            } 
            if (startTimeMs === 1) {
                return CardStatus.isInProcess
            } // todo доделать логику  
            if (startTimeMs === 0) {
                return CardStatus.isNotDone
            }
            return CardStatus.isDone;
        }, [startTimeMs, timeToCheckMs]
    );
    
    const isShown: boolean = useMemo(
        () => {
            switch(cardStatus) {
                case CardStatus.isDone: {
                    return filters!.isDoneFilter;
                }
                case CardStatus.isInProcess: {
                    return filters!.isInProcessFilter;
                }
                case CardStatus.isNotDone: {
                    return filters!.isNotDoneFilter;
                }
                case CardStatus.isNotStarted: {
                    return filters!.isNotStartedFilter;
                }
                default: {
                    return true;
                }
            }
        }, [filters, cardStatus]
    );  

    return <div key={interviewSolutionId} className='card' style={ isShown ? {} : {display: 'none'}}>
        <span className='fullName'>{fullName}</span><br />
        <span className='vacancy'>{vacancy}</span><br />
        <div>
            <span className='time'>{startTimeMs}</span><br />
            <span className='time'>{timeToCheckMs}</span><br />
        </div>
        <div className='tasksCount'>
            <span>{doneTasksCount}/{tasksCount}</span>
        </div>
        <button className='reviewButton'>Проверить</button>
    </div>
})

export interface CardInfo {
    userId: string;
    interviewSolutionId: string;
    fullName: string;
    vacancy: string;
    startTimeMs: number;
    timeToCheckMs: number;
    averageGrade: number;
    reviewerComment: string;
    doneTasksCount: number;
    tasksCount: number;
    interviewResult: number;
}