import React, { useContext, useState } from "react";
import "./FiltersComponent.less";


export type FiltersContextType = {
    isDone: boolean;
    setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
    isInProcess: boolean;
    setIsInProcess: React.Dispatch<React.SetStateAction<boolean>>;
    isNotStarted: boolean;
    setIsNotStarted: React.Dispatch<React.SetStateAction<boolean>>;
    isNotDone: boolean;
    setIsNotDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FiltersContext = React.createContext<FiltersContextType | undefined>(undefined);

export const FiltersComponent = React.memo(() => {
    const filters = useContext(FiltersContext);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>, setFilterValue: React.Dispatch<React.SetStateAction<boolean>>) => {
        setFilterValue(event.target.checked);
    };

    return <div className="filters">
        <div className="filterWrapper">
            <input type="checkbox" id="doneFilter" name="doneFilter" className="filter" checked={filters!.isDone} onChange={(e) => handleFilterChange(e, filters!.setIsDone)}></input>
            <label htmlFor="doneFilter">Выполнено</label>
        </div>
        <div className="filterWrapper">
            <input type="checkbox" id="inProcessFilter" name="inProcessFilter" className="filter" checked={filters!.isInProcess} onChange={(e) => handleFilterChange(e, filters!.setIsInProcess)}></input>
            <label htmlFor="inProcessFilter">В процессе</label>
        </div>
        <div className="filterWrapper">
            <input type="checkbox" id="notStartedFilter" name="notStartedFilter" className="filter" checked={filters!.isNotStarted} onChange={(e) => handleFilterChange(e, filters!.setIsNotStarted)}></input>
            <label htmlFor="notStartedFilter">Не начато</label>
        </div>
        <div className="filterWrapper">
            <input type="checkbox" id="notDoneFilter" name="notDoneFilter" className="filter" checked={filters!.isNotDone} onChange={(e) => handleFilterChange(e, filters!.setIsNotDone)}></input>
            <label htmlFor="notDoneFilter">Не выполнено</label>
        </div>
    </div>
})