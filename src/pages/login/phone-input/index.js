import React, { useState, useEffect } from 'react';
import { func } from 'prop-types';
import { Input, Button } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

import firebase from '../../../firebase'

import './_style.scss'

const PhoneInput = ({ setParentState }) => {
  const [phoneNum, setPhoneNum] = useState('')
  const [isSendingOtp, setIsSendingOtp] = useState(false)

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        console.log("Success")
      },
      'expired-callback': () => {
        console.log("expired-callback")
      }
    });
  }, [])

  const handlePhoneNumChange = ({ target: { value } }) => {
    setPhoneNum(value)
  }

  const handlePhoneSubmit = () => {
    setIsSendingOtp(true)
    firebase.auth().signInWithPhoneNumber(`+91${phoneNum}`, window.recaptchaVerifier)
      .then((confirmationResult) => {
        console.log("confirmationResult", confirmationResult)
        window.confirmationResult = confirmationResult;
        setIsSendingOtp(false)
        setParentState({ screen: 'otp', phoneNum })
      }).catch((error) => {
        setParentState({ isError: true, errorMessage: 'Otp cpould not be sent' })
      });
  }

  return (
    <div className="phone-input">
      <div className="phone-input__title">
        We will send otp,
        <br />
        entre Your Phone Number
      </div>
      <Input
        size="large"
        placeholder="Phone Number"
        prefix={<PhoneOutlined />}
        onChange={handlePhoneNumChange}
        value={phoneNum}
      />
      <Button
        size="large"
        type="primary"
        className="phone-input__submit"
        onClick={handlePhoneSubmit}
        id="sign-in-button"
        loading={isSendingOtp}
      >
        Enter
      </Button>
    </div>
  )
}

PhoneInput.propTypes = {
  setParentProps: func,
}

PhoneInput.defaultProps = {
  setParentProps() {},
}

export default PhoneInput
