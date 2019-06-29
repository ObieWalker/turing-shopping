import React from 'react';
import { Drawer, Table
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
  },
];

const getAttribute = (attributes, attributeIndex) => {
  return attributes.split(',')[attributeIndex]
}

const CartDrawer = ({ visible, onClose, cartItems }) => {

  return (
    <Drawer
      width={500}
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <Table dataSource={cartItems} columns={columns} />

      <h3>Total</h3>
    </Drawer>
  )
}

export default CartDrawer;