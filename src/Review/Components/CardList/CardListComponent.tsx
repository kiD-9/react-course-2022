import React, { FC, useMemo, useRef, useState, useEffect } from "react";
import { CardComponent, CardInfo } from "../Card/CardComponent";
import styles from "./CardListComponent.module.css";

export const CardListComponent = React.memo(() => {
    const [cards, setCards] = useState<CardInfo[]>();

    useEffect(() => {
        fetch('https://localhost:5001/api/cards')
        .then(result => result.json())
        .then(setCards)
    }, [])

    return <div>
        {cards?.map(card => <CardComponent {...card}/>)}
    </div>
})