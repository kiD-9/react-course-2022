import React, { FC, useMemo, useRef, useState } from "react";
import styles from "./CardComponent.module.css";

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
    return <div key={interviewSolutionId}>
        <span className={styles.fullName}>{fullName}</span>
        <span className={styles.vacancy}>{vacancy}</span>
        <div>
            <span className={styles.time}>{startTimeMs}</span>
            <span className={styles.time}>{timeToCheckMs}</span>
        </div>
        <div className={styles.tasksCount}>
            <span>{doneTasksCount}/{tasksCount}</span>
        </div>
        <div className={styles.reviewButtons}>
            <button>Отказать</button>
            <button>Проверить</button>
        </div>
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