import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Layout, Menu, Icon, Badge, Divider, Button
} from 'antd';
import { getRegions, getUserDetails, updateAddress } from '../../actions/shippingActionCreators';
import { updateInfo } from '../../actions/authActionCreators';
import ProfileForm from './ProfileForm';
import AddressForm from './AddressForm';
import logo from '../../assets/turingshoppingimg.png';

const { Header, Content, Footer } = Layout;

class Profile extends React.Component {
  state = {

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

  render() {
    const {  user, cart, shipping } = this.props;

    const loggedInUser = Object.keys(user).length ? true : ''
    return (
      <div>
          <Layout className="layout">
          <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px', textAlign: 'center' }}
        >
          <Menu.Item key="logo" style={{ float: 'left'}}>
            <NavLink to="/">
              <img src={logo} alt="ShoppingTuring"/>
            </NavLink>
          </Menu.Item>
          <Menu.Item onClick={this.changeCategory} value="all" key="brand" style={{
            float: 'left', fontSize: '20px', fontWeight: 'bold'
            }}><NavLink to="/">
              Turing Shopping
            </NavLink>
          </Menu.Item>
          
          <Menu.Item key="auth" style={{ float: 'right'}}>
            <Button onClick={loggedInUser ? this.logout : this.openAuthModal}
              style={{ float: 'right', marginTop: '20%'}}
              type={loggedInUser ? 'danger' : 'primary' }>
                { loggedInUser ? 'Logout' : 'Sign In'}
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
    <Content style={{ padding: '0 50px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
      <h2>Hey {user.name}</h2>
        <ProfileForm
          user={user}
          updatePersonalInfo={this.updatePersonalInfo}
        />
        <br />
        <Divider></Divider>
        <br />
        <AddressForm 
          regions={shipping.shippingRegions}
          userAddress={shipping.shippingDetails}
          updateAddress={this.updateAddress}
        />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Turing Shopping ©{new Date().getFullYear()}</Footer>
  </Layout>
      </div>
    );
  }
}

const mapStateToProps = ({ users, shipping, cart }) => ({
  user: users.user,
  cart,
  shipping
})
export default connect(mapStateToProps, 
  {
    getRegions,
    getUserDetails,
    updateInfo,
    updateAddress
  }
)(Profile);