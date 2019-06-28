import React from 'react';
import { connect } from 'react-redux';
import {
  Layout, Menu, Breadcrumb, Icon, Progress, Spin, Input
} from 'antd';
import { getAllProducts, getProduct, getProductReviews } from '../../actions/productsActionCreator'
import Categories from '../sidebar/Categories';
import Products from '../products/index';
import ProductModal from '../products/ProductModal';
import logo from '../../assets/turingshoppingimg.png';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

class Main extends React.Component {
  state = {
    department: '',
    page: 1,
    visible: false
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
      visible: !this.state.visible
    });
  }

  toggleModalVisibility = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const { products, product, reviews } = this.props;

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
            float: 'left', fontSize: '20px', fontWeight: 'bold', backgroundColor: '#001529'
            }}>
            Turing Shopping
          </Menu.Item>
          <Menu.Item onClick={this.changeCategory} value="regional" key="1">Regional</Menu.Item>
          <Menu.Item onClick={this.changeCategory} value="nature" key="2">Nature</Menu.Item>
          <Menu.Item onClick={this.changeCategory} value="seasonal" key="3">Seasonal</Menu.Item>
          <Menu.Item key="" style={{ float: 'right'}}>
            <Search
              placeholder="search for a product..."
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
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
        visible={this.state.visible}
        handleCancel={this.toggleModalVisibility}
        product={product}
        reviews={reviews}
      />
      <Footer style={{ textAlign: 'center' }}>Turing Shopping ©2019</Footer>
    </Layout>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  products,
  product: products.product,
  reviews: products.reviews
})
export default connect(mapStateToProps, 
  { getAllProducts, getProduct, getProductReviews }
)(Main);