import React from 'react';
import { connect } from 'react-redux';
import {
  Layout, Menu, Badge, Icon,  Input, Button, notification
} from 'antd';
import { getAllProducts, getProduct, getProductReviews } from '../../actions/productsActionCreators'
import { signInUser, registerUser, logoutUser, generateUniqueId } from '../../actions/authActionCreators';
import { addToCart } from '../../actions/cartActionCreators'
import Categories from '../sidebar/Categories';
import Products from '../products/index';
import CartDrawer from '../cart/CartDrawer';
import ProductModal from '../products/ProductModal';
import AuthModal from '../auth/AuthModal';
import logo from '../../assets/turingshoppingimg.png';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

class Main extends React.Component {
  state = {
    department: '',
    page: 1,
    productModalVisible: false,
    signInModalVisible: false,
    cartVisible: false
  }

  componentDidMount = () => {
    this.props.getAllProducts()
  }

  changeCategory = (e) => {
    this.setState({ department: e.item.props.value})
  }

  pageChange = (page) => {
    this.setState({
      page
    })
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
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />
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

  render() {
    const { products, product, reviews, user, cart } = this.props;

    const loggedInUser = Object.keys(user).length ? true : ''
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
          <Menu.Item onClick={this.changeCategory} value="all" key="" style={{
            float: 'left', fontSize: '20px', fontWeight: 'bold'
            }}>
            Turing Shopping
          </Menu.Item>
          <Menu.Item onClick={this.changeCategory} value="regional" key="1">Regional</Menu.Item>
          <Menu.Item onClick={this.changeCategory} value="nature" key="2">Nature</Menu.Item>
          <Menu.Item onClick={this.changeCategory} value="seasonal" key="3">Seasonal</Menu.Item>
          <Menu.Item disabled='false' key="" style={{ float: 'right'}}>
            <Button onClick={loggedInUser ? this.logout : this.openAuthModal}
              style={{ float: 'right', marginTop: '20%'}}
              type={loggedInUser ? 'danger' : 'primary' }>
                { loggedInUser ? 'Logout' : 'Sign In'}
            </Button>
          </Menu.Item>
          <Menu.Item key="" 
          style={{ 
            position: 'relative'
          }}
          >
            <Search
              placeholder="search for a product..."
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </Menu.Item>
          <Menu.Item style={{ float:'right', }}>
            
            <Badge count={cart.cartItems.length}><Icon onClick={this.openCart} style={{ fontSize: '30px'}} type="shopping-cart" /></Badge>
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
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Products
              products={products}
              page={this.state.page}
              onChange={this.pageChange}
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
      />
      <AuthModal
        visible={this.state.signInModalVisible}
        handleCancel={this.toggleSignInModalVisibility}
        signInUser={this.signInUser}
        registerUser={this.registerUser}
        generateUniqueId={this.generateUniqueId}
      />
      <CartDrawer 
        onClose={this.onClose}
        visible={this.state.cartVisible}
        cartItems={cart.cartItems}
      />

      <Footer style={{ textAlign: 'center' }}>Turing Shopping ©2019</Footer>
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
    addToCart
  }
)(Main);