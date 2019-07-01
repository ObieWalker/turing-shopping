import React from 'react';
import { Form, Input, Icon, Row, Col, Button, Select } from 'antd';

const { Option } = Select;

const iconStyle = {
  color: 'rgba(0,0,0,.25)',
  marginTop: '5px',
};

const AddressForm = ({ userAddress, regions, form, updateAddress }) => {
  
  const {
    address_1,
    address_2,
    city,
    region,
    postal_code,
    country,
    shipping_region_id
  } = userAddress

  const renderRegions = (regions) => {
    return regions.map(region => {
      return <Option
        key={region.shipping_region_id}
        value={region.shipping_region_id}
        >{region.shipping_region}
      </Option>
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        updateAddress(values);
      }
    });
  }
  
  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} style={{ margin: 'auto', width: '60%'}}>
      <h3 style={{ textAlign: 'center' }}>Address Information.</h3>
      <Form.Item>
        {getFieldDecorator('address_1', {
          rules: [{ required: true, message: 'Please input your Street Address!' }],
          initialValue: address_1
        })(
          <Input prefix={<Icon type="home" style={iconStyle} />} placeholder="Address Line 1" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('address_2', {
          initialValue: address_2
        })(
          <Input prefix={<Icon type="home" style={iconStyle} />} placeholder="Address Line 2" />
        )}
      </Form.Item>
      <Row gutter={12}>
        <Col span={8}>
          <Form.Item>
            {getFieldDecorator('city', {
              rules: [{ required: true, message: 'City' }],
              initialValue: city
            })(
              <Input prefix={<Icon type="home" style={iconStyle} />} placeholder="City" />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            {getFieldDecorator('region', {
              rules: [{ required: true, message: 'Region' }],
              initialValue: region
            })(
              <Input prefix={<Icon type="home" style={iconStyle} />} placeholder="Region" />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            {getFieldDecorator('postal_code', {
              rules: [{ required: true, message: 'Zip Code' }],
              initialValue: postal_code
            })(
              <Input prefix={<Icon type="home" style={iconStyle} />} placeholder="Zip Code" />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item>
            {getFieldDecorator('country', {
              rules: [{ required: true, message: 'Country' }],
              initialValue: country
            })(
              <Input prefix={<Icon type="home" style={iconStyle} />} placeholder="Country" />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            {getFieldDecorator('shipping_region_id', {
              rules: [{ required: true, message: 'Shipping Region' }],
              initialValue: shipping_region_id === 1 ? undefined : userAddress.shipping_region_id
            })(
              <Select
                placeholder="Shipping Region"
              >
                {renderRegions(regions)}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
        
      <Button type="primary" htmlType="submit">
        Update Address
      </Button>
    </Form>
  )
}

export default Form.create()(AddressForm);
