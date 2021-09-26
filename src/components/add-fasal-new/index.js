import React from "react";
import { Form, Input, Button, Space, DatePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";

import { filterNil } from "../../utils/utils";

import "./_style.scss";

const format = "DD-MM-YYYY";

class AddFasalNew extends React.Component {
  convertDateToStr = (date) => {
    return moment(date).format(format);
  };

  convertStrToDate = (dateStr) => {
    return moment(dateStr, format);
  };

  onFinish = (values = {}, isSubmitting = true) => {
    if(!Object.keys(values).length) {
      return {}
    }

    let fasalDate = isSubmitting
      ? this.convertDateToStr(values.fasalPlantedDate)
      : this.convertStrToDate(values.fasalPlantedDate);

    values.fasalPlantedDate = fasalDate;

    if (values.produces && values.produces.length) {
      values.produces = values.produces.map((p) => {
        return {
          ...p,
          date: isSubmitting
            ? this.convertDateToStr(p.date)
            : this.convertStrToDate(p.date),
        };
      });
    }

    if (isSubmitting) {
      this.props.handleSubmit(filterNil(values));
    } else {
      return filterNil(values)
    }
  };

  render() {
    console.log("this.props.fasal ", this.props.fasal);
    const result = this.onFinish(this.props.fasal, false)

    return (
      <Form
        name="dynamic_form_nest_item"
        onFinish={this.onFinish}
        autoComplete="off"
        initialValues={result}
      >
        <Form.Item
          name="fasalName"
          label="Fasal Name"
          tooltip="Name of the Fasal"
          rules={[{ required: true, message: "Fasal Name is required" }]}
        >
          <Input
            size="middle"
            placeholder="Name"
          />
        </Form.Item>

        <div className="row">
          <Form.Item
            name="fasalArea"
            tooltip="Area of the Fasal"
            label="Fasal Area"
            rules={[{ required: true, message: "Fasal Name is required" }]}
          >
            <Input size="middle" placeholder="Area" />
          </Form.Item>

          <Form.Item
            name="fasalPlantedDate"
            label="Date Planted"
            tooltip="Date Planted of the Fasal"
            className="datePlanted"
            rules={[{ required: true, message: "Fasal Name is required" }]}
          >
            <DatePicker
              size="middle"
              format={format}
              placeholder="Date Planted"
            />
          </Form.Item>
        </div>

        <Form.List
          name="produces"
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => {
                return (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                    className="produce"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      fieldKey={[fieldKey, "quantity"]}
                      label="Quantity Cutted"
                      tooltip="Quantity Cutted of the Fasal"
                      className="produce__quantity"
                      rules={[{ required: true, message: "Missing last name" }]}
                    >
                      <Input
                        placeholder="Quantity"
                        size="middle"
                        type="number"
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "date"]}
                      fieldKey={[fieldKey, "date"]}
                      label="Date Cutted"
                      className="produce__cutting-date"
                      tooltip="Date Cutted of the Fasal"
                      rules={[
                        { required: true, message: "Missing first name" },
                      ]}
                    >
                      <DatePicker
                        size="middle"
                        format={format}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                );
              })}

              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Produce
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AddFasalNew;
