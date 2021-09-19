import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import { uuidv4 } from "../../utils/utils";
import { addUserFasal } from "../../utils/firebaseUtils";

import AddFasal from "../../components/add-fasal";

import "./_style.scss";

class AddNewFasal extends PureComponent {
  state = {
    isLoading: false,
  };

  handleSubmit = (data) => {
    const fasalId = uuidv4();
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
    this.setState({ isLoading: true });
    addUserFasal(fasalId, sendData).then(() => {
      const { history } = this.props;
      this.setState({ isLoading: true });
      history.push("/");
    });
  };

  render() {
    const { isLoading } = this.state;

    return <AddFasal handleSubmit={this.handleSubmit} isLoading={isLoading} />;
  }
}

export default withRouter(AddNewFasal);
