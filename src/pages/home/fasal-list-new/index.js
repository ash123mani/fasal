import React from 'react'
import { Table } from 'antd'
import { EditTwoTone } from "@ant-design/icons";
import { Link, useHistory } from 'react-router-dom' 




const FasalListNew = ({ fasals }) => {
  const history = useHistory()

  const handleFasalClick = (fasal) => {
    console.log("history", history);
    console.log("fasal", fasal)
    history.push({
      pathname: `/fasal/${fasal.fasalId}`,
      state: fasal,
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fasalName',
      key: 'fasalName',
    },
    {
      title: 'Name',
      dataIndex: 'fasalArea',
      key: 'fasalArea',
    },
    {
      title: 'Date',
      dataIndex: 'fasalPlantedDate',
      key: 'fasalPlantedDate'
    },
    {
      title: 'Edit',
      key: 'fasalId',
      render: (text, record) => {
        return <EditTwoTone onClick={() => handleFasalClick(record)} />
      },
    }
  ]

  return (
    <Table columns={columns} dataSource={fasals}  pagination={false}/>
  )
}

export default FasalListNew
