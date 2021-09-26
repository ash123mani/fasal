import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { addUserFasal } from "../../utils/firebaseUtils";
import AddFasal from "../../components/add-fasal-new";

const EditFasal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const { state } = location;

  const handleSubmit = (data) => {
    setIsLoading(true)
    addUserFasal(state.fasalId, data).then(() => {
      setIsLoading(false)
      history.push("/")
    })
  };

  return (
    <AddFasal
      handleSubmit={handleSubmit}
      fasal={state}
      isEditing
      isLoading={isLoading}
    />
  );
};

export default EditFasal;
