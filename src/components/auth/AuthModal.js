import React from 'react';
import {
  Modal, Form, Input, Icon, Button, Tabs, notification
} from 'antd';

const { TabPane } = Tabs;


class AuthModal extends React.Component {

  signIn = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if (!err) {
        const response =  await this.props.signInUser(values);
        if (response.type === 'SIGNING_IN_SUCCESS') {
          this.props.handleCancel();
          notification.open({
            message: 'Sign In...',
            description: 'Success!!!',
            icon: <Icon type="smile" className="auth__success-icon" />
          });
          this.props.generateUniqueId();
        }
      }
    });
  }

  register = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if (!err) {
        const response =  await this.props.registerUser(values);
        if (response.type === 'REGISTER_SUCCESS') {
          this.props.handleCancel();
          notification.open({
            message: 'Registration Attempt',
            description: 'Success!!!',
            icon: <Icon type="smile" className="auth__success-icon" />
          });
          this.props.generateUniqueId();
        }
      }
    });
  }

  render() {
    const { visible, handleCancel } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        visible={visible}
        closable={true}
        onCancel={handleCancel}
        footer={null}
      >
        <Tabs type="card">
          <TabPane tab="Sign In" key="1">
            <Form onSubmit={this.signIn}>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email!' }],
                })(
                  <Input prefix={<Icon type="mail" className="auth__icon-style"/>} placeholder="Email Address" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                })(
                  <Input prefix={<Icon type="lock" className="auth__icon-style" />} type="password" placeholder="Password" />
                )}
              </Form.Item>
                <Button type="primary" htmlType="submit">
                  Log in
                </Button>
            </Form>
          </TabPane>
          <TabPane tab="Register" key="2">
            <Form onSubmit={this.register}>
            <Form.Item>
                {getFieldDecorator('name', {
                  // rules: [{ required: true, message: 'Please input your name!' }],
                })(
                  <Input prefix={<Icon type="user" className="auth__icon-style"/>} placeholder="Name" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email!' }],
                })(
                  <Input prefix={<Icon type="mail" className="auth__icon-style"/>} placeholder="Email Address" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                })(
                  <Input prefix={<Icon type="lock" className="auth__icon-style"/>} type="password" placeholder="Password" />
                )}
              </Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
            </Form>
          </TabPane>
        </Tabs>
        
      </Modal>
    )
  }
}

export default AuthModal = Form.create({ name: 'auth__form' })(AuthModal)