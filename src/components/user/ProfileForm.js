import React from 'react';
import { Form, Input, Icon, Button, notification } from 'antd';

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
        icon: <Icon type="smile" className="profileform__icon-smile"/>
      });
    }
  }
  
  const { getFieldDecorator } = form;

  return (
    <div className="profileform__container">
      <h3 className="profileform__form-header">Personal Information.</h3>
      <Form onSubmit={handleSubmit}
        className="profileform__form"
      >
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
            initialValue: user.name
          })(
            <Input prefix={<Icon type="user" className="profileform__icon-style"/>} placeholder="Name" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
            initialValue: user.email
          })(
            <Input disabled prefix={<Icon type="mail" className="profileform__icon-style"/>} placeholder="Email Address" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input prefix={<Icon type="lock" className="profileform__icon-style"/>} type="password" placeholder="Password" />
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
