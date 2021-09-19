import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { addUserFasal } from "../../utils/firebaseUtils";
import AddFasal from "../../components/add-fasal";

const EditFasal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const { state } = location;

  const handleSubmit = (data) => {
    const {
      name,
      area,
      datePlanted,
      firstProduceDate,
      firstProduceQuantity,
      secondProduceDate,
      secondProduceQuantity,
    } = data;

    const sendData = {
      name,
      area,
      datePlanted,
      firstProduce: {
        date: firstProduceDate,
        quantity: firstProduceQuantity,
      },
      secondProduce: {
        date: secondProduceDate,
        quantity: secondProduceQuantity,
      },
    };
    setIsLoading(true)
    addUserFasal(state.fasalId, sendData).then(() => {
      setIsLoading(false)
      history.push("/")
    })
  };

  return (
    <AddFasal
      handleSubmit={handleSubmit}
      state={state}
      isEditing
      isLoading={isLoading}
    />
  );
};

export default EditFasal;
