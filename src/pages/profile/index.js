import React from "react";
import { Input, Button } from "antd";

import { getUserData, setUserData } from "../../utils/firebaseUtils";

import Loader from '../../components/loader'

import "./_style.scss";

class Profile extends React.Component {
  state = {
    userData: {},
    name: "",
    thana: "",
    post: "",
    village: "",
    district: "",
    isUpdating: false,
    isLoading: false,
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    this.setState({ isLoading: true });
    getUserData().then((res) => {
      this.setState({ userData: res });
    }).finally(() => this.setState({ isLoading: false }))
  };

  handleInputChange = ({ target: { value, id } }) => {
    this.setState({ [id]: value });
  };

  updateProfile = () => {
    const { name, village, thana, post, district, userData } = this.state;
    const { uid } = userData;
    const sendData = {
      phoneNum: userData.phoneNum,
      name: name || userData.name || '',
      village: village || userData.village || '',
      thana: thana || userData.thana || '',
      post: post || userData.post || '',
      district: district || userData.district || '',
    }
    this.setState({ isUpdating: true });
    setUserData(uid, sendData).then(() => {
      this.setState({ isUpdating: false })
    })
  };


  render() {
    const { userData, isUpdating, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="profile-loader">
          <Loader />
        </div>
      )
    }

    const { name, village, thana, district, phoneNum } = userData;
    console.log("userData", userData)
    const showUpdateButton = !name || !village || !thana || !district;

    return (
      <div className="profile">
        <div className="profile__input">
          <div className="profile__label">Phone Number</div>
          <Input defaultValue={phoneNum} size="large" disabled />
        </div>

        <div className="profile__input">
          <div className="profile__label">Name</div>
          <Input
            defaultValue={name}
            size="large"
            id="name"
            onChange={this.handleInputChange}
          />
        </div>

        <div className="profile__input">
          <div className="profile__label">Village</div>
          <Input
            defaultValue={village}
            size="large"
            id="village"
            onChange={this.handleInputChange}
          />
        </div>

        <div className="profile__input">
          <div className="profile__label">Thana</div>
          <Input
            defaultValue={thana}
            size="large"
            id="thana"
            onChange={this.handleInputChange}
          />
        </div>

        <div className="profile__input">
          <div className="profile__label">District</div>
          <Input
            defaultValue={district}
            size="large"
            id="district"
            onChange={this.handleInputChange}
          />
        </div>

        {showUpdateButton && (
          <div className="profile__submit">
            <Button
              onClick={this.updateProfile}
              type="primary"
              loading={isUpdating}
            >
              Update Profile
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
