import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, Table, Empty, Select, Icon, Button, notification } from 'antd';
import StripeCheckout from 'react-stripe-checkout';
import {
  createOrder, makePayment, removeItem, deleteCart
} from '../../actions/cartActionCreators';
import { logo } from '../../assets/turingshoppingimg.png';

const { Option } = Select;

const renderColumns = (props) => {
  return [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Size',
      dataIndex: 'attributes',
      key: 'attributes1',
      render: (attributes) =>  (
        <span>
          {props.getAttribute(attributes, 0)}
        </span>
      )
    },
    {
      title: 'Color',
      dataIndex: 'attributes',
      key: 'attributes2',
      render: (attributes) =>  (
        <span>
          {props.getAttribute(attributes, 1)}
        </span>
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) =>  (
        <span>
          {`$${price}`}
        </span>
      )
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <span>
          <Icon type="delete"
            onClick={(e) => {props.removeItem(e, record.item_id)}} />
        </span>
      ),
    },
  ];
}

class CartDrawer extends React.Component {

  state = {
    region: null,
    cartTotal: 0,
    regionPrice: 0
  }

  componentDidMount = () => {
    const { shipping_region_id } = this.props.shipping.shippingDetails;
    const { shipping_regions } = this.props.shipping;
    if (!shipping_regions.length && shipping_region_id !== 1){
      this.props.getShippingRegions(shipping_region_id);
    }
  }

  getTotalPrice = (cartItems) => cartItems.reduce((a, b) => a + parseFloat(b.price), 0).toFixed(2)

  getAttribute = (attributes, attributeIndex) => {
    return attributes.split(',')[attributeIndex]
  }

  onOpened = () => {
    const { cartId } = this.props.cart;
    const { region } = this.state
    this.props.createOrder(cartId, region, 2)
   }

  onToken = async(token, addresses) => {
    const response = await this.props.makePayment(
      token.id,
      this.props.cart.orderId,
      "test",
      parseInt(this.getTotalWithShipping(this.props.cartItems) * 100),
      "USD"
    )
    if (response.type === "ADD_TO_CART_SUCCESS") {
      notification.open({
        message: 'Payment Successful',
      });
    }
  };

  showShippingRegions = (region) => {
    return (
      <Option
        key={region.shipping_id}
        value={region.shipping_id}
      >{region.shipping_type}
      </Option>
    )
  }

  removeItem = (e, id) => {
    e.preventDefault();
    this.props.removeItem(id)
  }

  regionOnChange = (value) => {
    const { shipping_regions } = this.props.shipping;

    const selectedRegionPrice = shipping_regions.filter(region => {
      return region.shipping_id == value
    })

    this.setState({
      region: value,
      regionPrice: parseFloat(selectedRegionPrice[0].shipping_cost)
    })
  }

  getTotalWithShipping = (cartItems) => {
    return parseFloat(this.getTotalPrice(cartItems)) + this.state.regionPrice
  }

  deleteCart = async(cartId) => {
    const response = await this.props.deleteCart(cartId);
    if (response.type === 'ADD_TO_CART_SUCCESS'){
      notification.open({
        message: 'Your cart has been emptied.',
      });
    }
  }

  render() {
    const { visible, onClose, cartItems, email, cartId } = this.props
    const { shipping_region_id } = this.props.shipping.shippingDetails;
    const { shipping_regions } = this.props.shipping;

    return (
      <Drawer
        width={500}
        placement="right"
        onClose={onClose}
        visible={visible}
        destroyOnClose
      >
      { 
        !cartItems.length ?
        <Empty
          image="http://pinnaclebooks.in/assets/images/emptycart.png"
          className="cart__empty-cart"
          description={
            <span>
              Cart is Empty
            </span>
          }
        >
        </Empty>
        :
        <>
          <Button type='danger' onClick={(e)=>{this.deleteCart(cartId)}}> Delete Cart<Icon type="delete" /> </Button>
          <Table 
            dataSource={this.props.cartItems} 
            columns={renderColumns(this)}
            rowKey={record => record.item_id}
          />
          {!this.state.region ? 
            <h3>Total = ${this.getTotalPrice(cartItems)}
            </h3> :
            
            <h3>
              Total = ${parseFloat(parseFloat(this.getTotalPrice(cartItems)) + this.state.regionPrice).toFixed(2)}
            </h3>
          }
          { (!shipping_region_id || shipping_region_id === 1) ? 
            <p>Please fill in your address details <Link to="/profile">here</Link></p>
            :
            <>
              <Select
                placeholder="Select delivery method"
                className="cart__delivery-select"
                onChange={this.regionOnChange}
                defaultValue={this.state.region ? this.state.region : undefined
                }
              >{shipping_regions.map(region => (
                  this.showShippingRegions(region)
                ))}
              </Select>
              <br /><br />
              {
                this.state.region &&
                  <StripeCheckout
                    token={this.onToken}
                    email={email}
                    allowRememberMe={false}
                    stripeKey="pk_test_NcwpaplBCuTL6I0THD44heRe"
                    amount={parseFloat((this.getTotalWithShipping(cartItems) * 100).toFixed(2))}
                    label="Pay with 💳"
                    panelLabel="Make payment for {{amount}}"
                    opened={this.onOpened}
                    image={logo}
                  />
              }
            </>
          }
        </>
      }
      </Drawer>
    )
  }
}

const mapStateToProps = ({ shipping, cart }) => ({
  shipping,
  cart
})
export default connect(mapStateToProps, 
  { 
    createOrder,
    makePayment,
    removeItem,
    deleteCart
  }
)(CartDrawer);