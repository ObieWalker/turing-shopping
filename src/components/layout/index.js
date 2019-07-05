import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Layout, Menu, Badge, Icon,  Input, Button, notification
} from 'antd';
import {
  getAllProducts,
  getProduct,
  getProductReviews,
  getProductsByDepartment,
  getProductsByCategory,
  search
} from '../../actions/productsActionCreators'
import {
  signInUser, registerUser, logoutUser, generateUniqueId
} from '../../actions/authActionCreators';
import { addToCart } from '../../actions/cartActionCreators';
import { getShippingRegions } from '../../actions/shippingActionCreators';
import Categories from '../sidebar/Categories';
import Products from '../products/index';
import CartDrawer from '../cart/CartDrawer';
import ProductModal from '../products/ProductModal';
import AuthModal from '../auth/AuthModal';
import logo from '../../assets/turingshoppingimg.png';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

export class Main extends React.Component {
  state = {
    department: null,
    category: null,
    page: 1,
    productModalVisible: false,
    signInModalVisible: false,
    cartVisible: false,
    checkoutVisible: false,
    searchValue: ''
  }

  componentDidMount = () => {
    this.props.getAllProducts();
  }

  resetProducts = () => {
    this.setProductsState();
    this.props.getAllProducts();
  }

  changeDepartment = (e) => {
    this.setProductsState(e.item.props.value);
    this.props.getProductsByDepartment(e.item.props.value);
  }

  clickProduct = (id) => {
    this.props.getProduct(id);
    this.props.getProductReviews(id)
    this.setState({
      productModalVisible: true
    });
  }

  toggleModalVisibility = () => {
    this.setState({
      productModalVisible: !this.state.productModalVisible
    });
  }

  toggleSignInModalVisibility = () => {
    this.setState({
      signInModalVisible: !this.state.signInModalVisible
    });
  }

  openAuthModal = () => {
    this.setState({
      signInModalVisible: true
    });
  }

  signInUser = async(user) => {
    return await this.props.signInUser(user);
  }

  registerUser = async(user) => {
    return await this.props.registerUser(user);
  }

  logout = async() => {
    const response = await this.props.logoutUser();
    if (response.type === 'LOGOUT_USER'){
      notification.open({
        message: 'You have successfully logged out!!!',
        icon: <Icon type="smile" className="layout__icon-style"/>
      });
    }
  }

  openCart = () => {
    this.setState({
      cartVisible: true
    });
  }

  onClose = () => {
    this.setState({
      cartVisible: false,
    });
  };

  generateUniqueId = () => {
    this.props.generateUniqueId();
  }

  addToCart = async(product) => {
    return await this.props.addToCart(product);
  }

  chooseCategory = (value) => {
    this.setProductsState(this.state.department, value.key, '')
    this.props.getProductsByCategory(value.key);
  }

  searchForProduct = (value) => {
    if (value){
      this.setProductsState(null, null, value)
      this.props.search(value);
    }
  }

  openCheckoutModal = () => {
    this.setState({
      checkoutVisible: true
    });
  }

  handleVisibility = () => {
    this.setState({
      checkoutVisible: false
    });
  }

  setProductsState = (department = null, category = null, searchValue = '') => {
    this.setState({
      department,
      category,
      searchValue
    })
  }

  changePage = (page) => {
    this.setState({
      page
    });
    if (this.state.category){
      this.props.getProductsByCategory(this.state.category, page);
    } else if (this.state.department) {
      this.props.getProductsByDepartment(this.state.department, page);
    } else if (this.state.searchValue){
      this.props.search(this.state.searchValue, page)
    } else {
      this.props.getAllProducts(page)

    }
  }

  render() {
    const { products, product, reviews, user, cart } = this.props;

    const loggedInUser = Object.keys(user).length ? true : false
    return (
      <Layout>
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          className="layout__header-menu"
        >
          <Menu.Item onClick={this.resetProducts} key="logo"
            className="layout__menu-logo">
            <img src={logo} alt="ShoppingTuring"/>
          </Menu.Item>
          <Menu.Item 
            onClick={this.resetProducts} value="all" key="brand"
            className="layout__menu-brand"
          >
            Turing Shopping
          </Menu.Item>
          <Menu.Item onClick={this.changeDepartment} value={1} key="1">Regional</Menu.Item>
          <Menu.Item onClick={this.changeDepartment} value={2} key="2">Nature</Menu.Item>
          <Menu.Item onClick={this.changeDepartment} value={3} key="3">Seasonal</Menu.Item>
          <Menu.Item key="auth" className="layout__auth-button">
            <Button onClick={loggedInUser ? this.logout : this.openAuthModal}
              type={loggedInUser ? 'danger' : 'primary' }>
                { loggedInUser ? 'Logout' : 'Sign In'}
            </Button>
          </Menu.Item>
          <Menu.Item key="search">
            <Search
              placeholder="search for a product..."
              onSearch={value => this.searchForProduct(value)}
              className="layout__search-bar"
            />
          </Menu.Item>
          { 
            loggedInUser &&
              <Menu.Item className="layout__profile-button">
                <NavLink to="/profile">
                  <Icon className="layout__header-icon"
                    style={{ fontSize: '30px'}} type="user"
                  />
                  {user.name}
                </NavLink>
              </Menu.Item>
          }
          { 
            loggedInUser &&
            <Menu.Item className="layout__cart-button">
              <Badge count={cart.cartItems.length}>
                <Icon onClick={this.openCart}
                  style={{ fontSize: '30px' }} type="shopping-cart" />
              </Badge>
            </Menu.Item>
          }
        </Menu>
      </Header>
      <Content className="layout__container">
        <Layout className="layout__main">
          <Sider width={200} className="layout__sider">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              className="layout__sider-menu"
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
                chooseCategory={this.chooseCategory}
              />
              </SubMenu>
            </Menu>
          </Sider>
          <Content className="layout__products">
            <Products
              products={products}
              page={this.state.page}
              onChange={this.changePage}
              onClick={this.clickProduct}
            />
          </Content>
        </Layout>
      </Content>
      <ProductModal
        visible={this.state.productModalVisible}
        handleCancel={this.toggleModalVisibility}
        product={product}
        reviews={reviews}
        cartId={cart.cartId}
        addToCart={this.addToCart}
        loggedInUser={loggedInUser}
        openLoginModal={this.openAuthModal}
        productLoading={products.productLoading}
      />
      <AuthModal
        visible={this.state.signInModalVisible}
        handleCancel={this.toggleSignInModalVisibility}
        signInUser={this.signInUser}
        registerUser={this.registerUser}
        generateUniqueId={this.generateUniqueId}
      />
      <CartDrawer 
        email={user.email}
        onClose={this.onClose}
        visible={this.state.cartVisible}
        cartItems={cart.cartItems}
        cartId={cart.cartId}
        openCheckoutModal={this.openCheckoutModal}
        getShippingRegions={this.props.getShippingRegions}
      />
      <Footer className="layout__footer">Turing Shopping ©{new Date().getFullYear()}</Footer>
    </Layout>
    );
  }
}

const mapStateToProps = ({ users, products, cart }) => ({
  products,
  product: products.product,
  reviews: products.reviews,
  user: users.user,
  cart
})
export default connect(mapStateToProps, 
  { 
    getAllProducts,
    getProduct,
    getProductReviews,
    signInUser,
    registerUser,
    logoutUser,
    generateUniqueId,
    addToCart,
    getProductsByDepartment,
    getProductsByCategory,
    search,
    getShippingRegions
  }
)(Main);