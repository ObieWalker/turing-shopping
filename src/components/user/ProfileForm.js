import React from 'react';
import { Form, Input, Icon, Button, notification } from 'antd';

const iconStyle = {
  color: 'rgba(0,0,0,.25)',
  marginTop: '5px',
};

const ProfileForm = ({ user, form, updatePersonalInfo }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        const response = await updatePersonalInfo(values);
        handleNotification(response);
      }
    });
  }

  const compareToFirstPassword = (rule, value, callback) => {
    if (value !== form.getFieldValue('password')) {
      callback('The passwords do not match!');
    } else {
      callback();
    }
  }

  const handleNotification = (response) => {
    if (response.type === 'SIGNING_IN_SUCCESS'){
      notification.open({
        message: 'Your personal information has been updated',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />
      });
    }
}
  
  const { getFieldDecorator } = form;

  return (
    <div style={{ width: '50%', margin: 'auto', backgroundColor: 'grey', padding: '5%'}}>
      <h3 style={{ textAlign: 'center'}}>Personal Information.</h3>
      <Form onSubmit={handleSubmit}
        style={{ width: '90%', margin: 'auto'}}
      >
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
            initialValue: user.name
          })(
            <Input prefix={<Icon type="user" style={iconStyle} />} placeholder="Name" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
            initialValue: user.email
          })(
            <Input disabled prefix={<Icon type="mail" style={iconStyle} />} placeholder="Email Address" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input prefix={<Icon type="lock" style={iconStyle} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: compareToFirstPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm"/>
          )}
        </Form.Item>

          <Button type="primary" htmlType="submit">
            Update Information
          </Button>
      </Form>
    </div>
  )
}

export default Form.create()(ProfileForm);
