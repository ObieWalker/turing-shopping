import React from 'react';
import {
  Layout, Menu, Breadcrumb, Icon, Progress, Spin, Input
} from 'antd';
import Categories from '../sidebar/Categories';
import logo from "../../assets/turingshoppingimg.png"

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

class Main extends React.Component {
  state = {
    department: ''
  }
  render() {
    return (
      <Layout>
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px', textAlign: 'center' }}
        >
          <Menu.Item key="" style={{ float: 'left'}}>
            <img src={logo} alt="ShoppingTuring"/>
          </Menu.Item>
          <Menu.Item key="" style={{ float: 'left', fontSize: '20px', fontWeight: 'bold'}}>
            Turing Shopping
          </Menu.Item>
          <Menu.Item key="1">Regional</Menu.Item>
          <Menu.Item key="2">Nature</Menu.Item>
          <Menu.Item key="3">Seasonal</Menu.Item>
          <Menu.Item key="" style={{ float: 'right'}}>
            <Search
              placeholder="search for a product..."
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
            {/* <Search placeholder="search for product..." onSearch={value => console.log(value)} enterButton /> */}
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="shop" />
                    Categories
                  </span>
                }
              >
              <Categories
                state={this.state.department}
              />
                {/* <RenderConditionallyWithSate 
                  state={this.state.department}
                >
                  <Menu.Item key="1">French</Menu.Item>
                  <Menu.Item key="2">Italian</Menu.Item>
                  <Menu.Item key="3">Irish</Menu.Item>
                  <Menu.Item key="4">Animal</Menu.Item>
                  <Menu.Item key="5">Flower</Menu.Item>
                  <Menu.Item key="6">Christmas</Menu.Item>
                  <Menu.Item key="7">Valentines</Menu.Item>
                </RenderConditionallyWithSate> */}
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Turing Shopping ©2019</Footer>
    </Layout>
    );
  }
}

export default Main;