import React from 'react'
import { Spin } from 'antd'
import { Loading3QuartersOutlined } from '@ant-design/icons'

const Loader = () => {
  const antIcon = <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />
  
  return  <Spin indicator={antIcon} size="large"/>
}

export default Loader
