import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import { uuidv4 } from "../../utils/utils";
import { addUserFasal } from "../../utils/firebaseUtils";

import AddFasalNew from '../../components/add-fasal-new'
import Loader from '../../components/loader'

import "./_style.scss";

class AddNewFasal extends PureComponent {
  state = {
    isLoading: false,
  };

  handleSubmit = (sendData) => {
    const fasalId = uuidv4();
    this.setState({ isLoading: true });
    console.log("sendData", sendData)
    addUserFasal(fasalId, sendData).then(() => {
      const { history } = this.props;
      this.setState({ isLoading: true });
      history.push("/");
    });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <React.Fragment>
        <AddFasalNew handleSubmit={this.handleSubmit} isLoading={isLoading} />
        {isLoading && <Loader withOverlay />}
      </React.Fragment>
    )
  }
}

export default withRouter(AddNewFasal);
