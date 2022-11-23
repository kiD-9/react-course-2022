import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CardInfoWithStatus } from "../../../Models/CardInfo";
import "./CardComponent.less";

export const CardComponent = React.memo((cardProps: CardInfoWithStatus) => {
    const { pathname } = useLocation();

    return <div className='card'>
    <span className='name'>{cardProps.surname}</span><br />
        <span className='name'>{cardProps.firstName}</span><br />
        <span className='vacancy'>{cardProps.vacancy}</span><br />
        <div>
            <span className='time'>{cardProps.startTimeMs}</span><br />
            <span className='time'>{cardProps.timeToCheckMs}</span><br />
        </div>
        <div className='tasksCount'>
            <span>{cardProps.doneTasksCount}/{cardProps.tasksCount}</span>
        </div>
        <Link to={`${ pathname }/${ cardProps.interviewSolutionId }`}>
            <button className='reviewButton'>Проверить</button>
        </Link>
    </div>
})