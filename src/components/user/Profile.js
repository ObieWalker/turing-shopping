import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Layout, Menu, Button
} from 'antd';
import { getRegions, getUserDetails, updateAddress } from '../../actions/shippingActionCreators';
import { updateInfo } from '../../actions/authActionCreators';
import { getOrders } from '../../actions/cartActionCreators'; 
import ProfileForm from './ProfileForm';
import AddressForm from './AddressForm';
import OrdersTable from './OrdersTable';
import logo from '../../assets/turingshoppingimg.png';

const { Header, Content, Footer, Sider } = Layout;

class Profile extends React.Component {
  state = {
    sideTabValue: 1
  }

  componentDidMount = () => {
    this.props.getRegions();
    this.props.getUserDetails();
  }

  updatePersonalInfo = async(values) => {
    return await this.props.updateInfo(values);
  }

  updateAddress = async(values) => {
    return await this.props.updateAddress(values)
  }

  changeTab = (value) => {
    this.setState({
      sideTabValue: parseInt(value.key)
    })
  }

  render() {
    const {  user, cart, shipping } = this.props;
    const { sideTabValue } = this.state

    const loggedInUser = Object.keys(user).length ? true : ''
    return (
      <div>
        <Layout className="layout">
          <Header className="header">
            <Menu
              theme="dark"
              mode="horizontal"
              className="profile__profile-menu"
            >
              <Menu.Item key="logo" className="profile__profile-item">
                <NavLink to="/">
                  <img src={logo} alt="ShoppingTuring"/>
                </NavLink>
              </Menu.Item>
              <Menu.Item onClick={this.changeCategory} value="all" key="brand" 
                className="profile__menu-item-main"><NavLink to="/">
                  Turing Shopping
                </NavLink>
              </Menu.Item>
              
              <Menu.Item key="auth" className="profile__auth-button-container">
                <Button onClick={loggedInUser ? this.logout : this.openAuthModal}
                  type={loggedInUser ? 'danger' : 'primary' }>
                    { loggedInUser ? 'Logout' : 'Sign In'}
                </Button>
              </Menu.Item>
            </Menu>
          </Header>
          <Content className="profile__profile-content">
            <h4>You look good today {user.name}.</h4>
            <Layout className="profile__layout-container">
              <Sider className="profile__sider-container" width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                >
                  <Menu.Item onClick={this.changeTab} key="1">Personal Info</Menu.Item>
                  <Menu.Item onClick={this.changeTab} key="2">Address</Menu.Item>
                  <Menu.Item onClick={this.changeTab} key="3">Order History</Menu.Item>
                </Menu>
              </Sider>
              <Content className="profile__sidebar-content">
                {
                  sideTabValue === 1 ? 
                  <ProfileForm
                    user={user}
                    updatePersonalInfo={this.updatePersonalInfo}
                  />
                  : sideTabValue === 2 ? 
                  <AddressForm 
                    regions={shipping.shippingRegions}
                    userAddress={shipping.shippingDetails}
                    updateAddress={this.updateAddress}
                  />
                  :
                  <OrdersTable
                    orders={cart.orders}
                    getOrders={this.props.getOrders}
                    orderTableLoading={cart.orderTableLoading}
                  />
                }
              </Content>
            </Layout>
          </Content>
          <Footer className="profile__profile-footer">Turing Shopping ©{new Date().getFullYear()}</Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = ({ users, shipping, cart }) => ({
  user: users.user,
  cart,
  shipping,
})
export default connect(mapStateToProps, 
  {
    getRegions,
    getUserDetails,
    updateInfo,
    updateAddress,
    getOrders
  }
)(Profile);