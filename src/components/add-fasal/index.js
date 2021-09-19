import React, { PureComponent } from 'react'
import { Input, DatePicker, Button, Alert } from 'antd'
import { withRouter } from "react-router-dom";
import moment from "moment";

import './_style.scss'

const format = 'DD-MM-YYYY'

class AddFasal extends PureComponent {
  constructor(props) {
    super(props)
    const { state = {} } = this.props
    const { firstProduce = {}, secondProduce = {} } = state

    this.state={
      name: state.name || '',
      area: state.area || '',
      datePlanted: state.datePlanted || '',
      firstProduceDate: firstProduce.date || '',
      firstProduceQuantity: firstProduce.quantity || '',
      secondProduceDate: secondProduce.date || '',
      secondProduceQuantity: secondProduce.quantity || '',
      error: '',
    }
  }

  handleInputChange = ({ target: { value, id } }) => {
    this.setState({ [id]: value })
  }

  handleSubmit = () => {
    const { handleSubmit } = this.props
    const { name, area, datePlanted } = this.state
    if(!name || !area || !datePlanted) {
      this.setState({ error: 'Name, Area and DatePlanted are mandatory fields' })
      return
    }
    handleSubmit(this.state)
  }

  render() {
    const {
      name,
      area,
      datePlanted,
      firstProduceDate,
      firstProduceQuantity,
      secondProduceDate,
      secondProduceQuantity,
      error,
    } = this.state
    const { isEditing, isLoading } = this.props

    return (
      <div className="add-fasal">
        {error && <Alert
         message="Error"
         description={error}
         type="error"
         closable
         onClose={() => this.setState({ error: '' })}
        />}

        <div>
          <div className="label">Name of Fasal</div>
          <Input 
            // placeholder="Name of fasal" 
            size="large"
            id="name"
            onChange={this.handleInputChange}
            value={name}
          />
        </div>
        <div className="add-fasal__area">
          <div className="add-fasal__capacity">
            <div className="label">Area(in kattha)</div>
            <Input 
              // placeholder="Area" 
              size="large"
              id="area"
              type="number"
              onChange={this.handleInputChange}
              value={area}
            />
          </div>

          <div className="add-fasal__date">
            <div className="label">Date Planted</div>
            <DatePicker 
              size="large"
              id="datePlanted"
              format={format}
              defaultValue={datePlanted && moment(datePlanted, format)}
              onChange={(date, dateStr) => this.setState({ datePlanted: dateStr })}
            />
          </div>
        </div>

        <div className="add-fasal__area">
          <div className="add-fasal__capacity">
            <div className="label">1st Produce Quantity</div>
            <Input 
              // placeholder="Quantity" 
              size="large"
              id="firstProduceQuantity"
              type="number"
              onChange={this.handleInputChange}
              value={firstProduceQuantity}
            />
          </div>

          <div className="add-fasal__date">
            <div className="label">1st Produce Date</div>
            <DatePicker
              size="large"
              id="firstProduceDate"
              format={format}
              defaultValue={firstProduceDate && moment(firstProduceDate, format)}
              onChange={(date, dateStr) => this.setState({ firstProduceDate: dateStr })}
            />
          </div>
        </div>

        <div className="add-fasal__area">
          <div className="add-fasal__capacity">
            <div className="label">2nd Produce Quantity</div>
            <Input 
              // placeholder="Name of fasal" 
              size="large"
              id="secondProduceQuantity"
              type="number"
              onChange={this.handleInputChange}
              value={secondProduceQuantity}
            />
          </div>

          <div className="add-fasal__date">
            <div className="label">2nd Produce Date</div>
            <DatePicker
              size="large"
              id="secondProduceDate"
              format={format}
              defaultValue={secondProduceDate && moment(secondProduceDate, format)}
              onChange={(date, dateStr) => this.setState({ secondProduceDate: dateStr })}
            />
          </div>
        </div>
        <div className="add-fasal__button">
          <Button
            type="primary"
            // size="large"
            onClick={this.handleSubmit}
            loading={isLoading}
          >
            {isEditing ? 'Update' : 'Save'}
          </Button>
        </div>
      </div>
    )
  }
}

export default withRouter(AddFasal)
