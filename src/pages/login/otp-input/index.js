import React, { useState } from 'react';
import { func } from 'prop-types';
import { Input, Button } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

import { setUserData } from '../../../utils/firebaseUtils'

const OtpInput = ({ setParentState, phoneNum }) => {
  const [otp, setOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOtpChange = ({ target: { value }}) => {
    setOtp(value)
  }

  const handlePhoneSubmit = () => {
    setIsSubmitting(true)
    window.confirmationResult.confirm(otp).then((result) => {
      const user = result.user;
      const userId = user.uid;
      setUserData(userId, {
        phoneNum,
        phoneCode: '+91',
      })
    }).catch((error) => {
      console.log("error whle otp", error)
      setParentState({ isError: true, errorMessage: 'Entered Otp is wrong' })
    });
  }

  return (
    <div className="phone-input">
      <div className="phone-input__title">
        Otp has been sent,
        <br />
        enter that otp
      </div>
      <Input
        size="large"
        placeholder="Otp"
        prefix={<PhoneOutlined />}
        onChange={handleOtpChange}
        value={otp}
      />
      <Button
        size="large"
        type="primary"
        className="phone-input__submit"
        onClick={handlePhoneSubmit}
        id="sign-in-button"
        loading={isSubmitting}
      >
        Enter
      </Button>
    </div>
  )
}

OtpInput.propTypes = {
  setParentState: func,
}

OtpInput.defaultProps = {
  setParentState() {}
}


export default OtpInput
