import React from "react";
import { Card } from "../Card/Card";
import "./index.css";

export const CardList = ({cards}) => {


    return (
    <div className="cards">
        {cards.map((item) => {
        return <Card key={item.name} {...item} product={item} />;
        })}
    </div>
    );
};
