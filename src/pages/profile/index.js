import React, { Fragment } from "react";

import { getUserData, setUserData } from "../../utils/firebaseUtils";

import Loader from "../../components/loader";
import ProfileForm from "./edit-profile";

import "./_style.scss";

class Profile extends React.Component {
  state = {
    isLoading: false,
    userData: {}
  };

  componentDidMount() {
    this.getUser();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { userData } = this.state
  //   if(prevState.userData !== userData) {
  //     this.setState({ userData })
  //   }
  // }

  getUser = () => {
    this.setState({ isLoading: true });
    getUserData()
      .then((res) => {
        this.setState({ userData: res, isLoading: false });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  updateProfile = (data) => {
    const { uid } = data;
    this.setState({ isUpdating: true });
    setUserData(uid, data).then(() => {
      this.setState({ isUpdating: false });
    });
  };

  render() {
    const { userData, isUpdating, isLoading } = this.state;
    const isFetching = isLoading;

    if(isFetching) {
      return <Loader withOverlay />
    }

    return (
      <Fragment>
        <ProfileForm userData={userData} onSubmit={this.updateProfile} isLoading={isUpdating} />
      </Fragment>
    );
  }
}

export default Profile;
