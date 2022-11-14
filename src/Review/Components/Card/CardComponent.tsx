import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CardInfoWithStatus } from "../../../Models/CardInfo";
import "./CardComponent.less";

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
    interviewResult,
    cardStatus
} : CardInfoWithStatus) => {
    const { pathname } = useLocation();

    return <div className='card'>
        <span className='fullName'>{fullName}</span><br />
        <span className='vacancy'>{vacancy}</span><br />
        <div>
            <span className='time'>{startTimeMs}</span><br />
            <span className='time'>{timeToCheckMs}</span><br />
        </div>
        <div className='tasksCount'>
            <span>{doneTasksCount}/{tasksCount}</span>
        </div>
        <Link to={`${ pathname }/${ interviewSolutionId }`}>
            <button className='reviewButton'>Проверить</button>
        </Link>
    </div>
})