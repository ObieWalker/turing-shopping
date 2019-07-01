import React from 'react';
import { Drawer, Table, Empty, Button
} from 'antd';

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Size',
    dataIndex: 'attributes',
    key: 'attributes',
    render: (attributes) =>  (
      <span>
        {getAttribute(attributes, 0)}
      </span>
    )
  },
  {
    title: 'Color',
    dataIndex: 'attributes',
    key: 'attributes',
    render: (attributes) =>  (
      <span>
        {getAttribute(attributes, 1)}
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
];

const getAttribute = (attributes, attributeIndex) => {
  return attributes.split(',')[attributeIndex]
}

const getTotalPrice = (cartItems) => 
  cartItems.reduce((a, b) => a + parseFloat(b.price), 0).toFixed(2)

const CartDrawer = ({ visible, onClose, cartItems, openCheckoutModal }) => {

  return (
    <Drawer
      width={500}
      placement="right"
      onClose={onClose}
      visible={visible}
    >
    { 
      !cartItems.length ?
      <Empty
        image="http://pinnaclebooks.in/assets/images/emptycart.png"
        imageStyle={{
          height: 100,
          width: 400
        }}
        description={
          <span>
            Cart is Empty
          </span>
        }
      >
      </Empty>
      :
      <>
        <Table 
          dataSource={cartItems} 
          columns={columns}
          rowKey='id'
        />

        <h3>Total = ${getTotalPrice(cartItems)}</h3>
        <Button onClick={openCheckoutModal} type="primary" style={{ textAlign: 'center', margin: '5%'}}>Checkout</Button>
      </>
    }
    </Drawer>
  )
}

export default CartDrawer;