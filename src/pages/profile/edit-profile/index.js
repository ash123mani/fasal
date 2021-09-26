import React from "react";
import { Input, Button, Radio, Checkbox } from "antd";

import { vehicleOptions, freqOptions } from '../../../config/fasal'

import "./_style.scss";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const userData = props.userData || {};
    this.state = {
      name: userData.name || "",
      gender: userData.gender || "",
      frequency: userData.frequency || [],
      phoneNum: userData.phoneNum || "",
      vehicle: userData.vehicle || [],
    };
  }
  
  handleInputChange = ({ target: { value, id, name } }) => {
    this.setState({ [id || name]: value });
  };

  submitProfile = () => {
    const { name, gender, frequency, vehicle } = this.state;
    console.log("this.state", this.state)
    const { onSubmit, userData } = this.props;
    const { uid } = userData;
    

    const sendData = {
      ...userData,
      name: name,
      uid,
      gender,
      frequency,
      vehicle,
    };
    // console.log("sendData", sendData)

    onSubmit(sendData);
  };

  render() {
    const { phoneNum, name, gender, frequency, vehicle } = this.state;
    const { showUpdateButton = true, isLoading } = this.props;

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

        <div className="profile__gender">
          <div className="profile__gender-label">Gender:</div>
          <Radio.Group
            onChange={this.handleInputChange}
            name="gender"
            value={gender}
          >
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </div>

        <div className="profile__input">
          <div className="profile__gender-label">Frequency to Mandi:</div>
          <Checkbox.Group
            options={freqOptions}
            defaultValue={frequency}
            onChange={(valuesArr) => this.setState({ frequency: valuesArr })}
          />
        </div>

        <div className="profile__input">
          <div className="profile__gender-label">Vehicle for Mandi:</div>
          <Checkbox.Group
            options={vehicleOptions}
            defaultValue={vehicle}
            onChange={(valuesArr) => this.setState({ vehicle: valuesArr })}
          />
        </div>

        {showUpdateButton && (
          <div className="profile__submit">
            <Button
              onClick={this.submitProfile}
              type="primary"
              loading={isLoading}
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
