import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Progress, Spin } from 'antd';

const { Header } = Layout;

class HeaderComp extends React.Component {
  render(){
    const { loadingPercent } = this.props
    return (
      <Layout>
      <Header 
      >
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"> <NavLink to="/">|Insurance</NavLink></Menu.Item>
          <Menu.Item key="2">|About</Menu.Item>
          <Menu.Item key="3">|FAQs</Menu.Item>
        </Menu>
      </Header>
    </Layout>
    )
  }
}

const mapStateToProps = () => ({ 
 });

export default connect(mapStateToProps, null)(HeaderComp);