import React, { useEffect } from 'react';
import { Table } from 'antd';
import moment from 'moment';
moment('2019-07-04T10:41:08.000').format('ll')

const columns = [
  {
    title: 'Order Id',
    dataIndex: 'order_id',
    key: 'order_id',
  },
  {
    title: 'Purchase date',
    dataIndex: 'created_on',
    key: 'created_on',
    render: (created_on) => (
      <span>{moment(created_on).format('ll')}</span>
    )
  },
  {
    title: 'Amount',
    dataIndex: 'total_amount',
    key: 'total_amount',
    render: (total_amount) => (
      <span>${total_amount}</span>
    )
  },
  {
    title: 'Staus',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <span>{status === 0 && 'Pending'}</span>
    )
  },
  {
    title: 'Billing Customer Name',
    dataIndex: 'name',
    key: 'name',
  }
];


const OrdersTable = ({ getOrders, orders, orderTableLoading }) => {

  useEffect(() => {
    getOrders();
  }, [getOrders])

  return (
    <Table
      columns={columns}
      dataSource={orders}
      loading={orderTableLoading}
      rowKey={record => record.order_id}
      pagination={{ pageSize: 5 }}
    />
  )
}

export default OrdersTable;