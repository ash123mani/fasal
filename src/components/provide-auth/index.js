import React, { Fragment } from 'react'
import { Spin } from 'antd'
import { Loading3QuartersOutlined } from '@ant-design/icons'

import useProvideAuth from '../../hooks/useProvideAuth'
import authContext from './context.js'
import Header from '../header'

import './_style.scss'

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth() || {}

  const { isLoading } = auth
  const antIcon = <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />

  if(isLoading) {
    return (
        <Fragment>
            {/* <Header />  */}
            <div className="base-loader">
              <Spin indicator={antIcon} size="large"/>
            </div>
        </Fragment>
    )
  }
  

  return (
  <authContext.Provider value={auth}>
    {children}
  </authContext.Provider>
  )
}

export default ProvideAuth
