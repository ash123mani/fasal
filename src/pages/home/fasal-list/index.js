import React from "react";
import { EditTwoTone } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import "./_style.scss";

const FasalList = ({ fasals }) => {
  let history = useHistory();

  const handleFasalClick = (fasal) => {
    console.log("history", history);
    history.push({
      pathname: `/fasal/${fasal.fasalId}`,
      state: fasal,
    });
  };

  return (
    <div className="fasal-list">
      <div className="fasal-list__item no-border">
        <div className="fasal-list__table">Name</div>
        <div className="fasal-list__table">Area</div>
        <div className="fasal-list__table">Date Planted</div>
        <div className="fasal-list__table">Edit/More</div>
      </div>

      <div className="fasal-list__items">
        {fasals.map((fasal) => {
          return (
            <div
              className="fasal-list__item"
              onClick={() => handleFasalClick(fasal)}
            >
              <div className="fasal-list__name">{fasal.name}</div>
              <div>{fasal.area}</div>
              <div>{fasal.datePlanted}</div>
              <EditTwoTone />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FasalList;
