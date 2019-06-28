import React from 'react';
import { Card, Button } from 'antd';

const { Meta } = Card;

const ProductCard = ({ product_id, name, description, price, discounted_price, thumbnail, onClick }) => {

  return (
    <div>
      <Card
        hoverable
        style={{ width: 300, margin: '2%', height: 300 }}
        onClick={() => onClick(product_id)}
        cover={<img alt={name} style={{ height: '100px', width: '100px', margin: 'auto', marginTop: '5%'}} src={`https://backendapi.turing.com/images/products/${thumbnail}`} />}
      >
      <span style={{ fontSize: '10px'}}>
        <Meta style={{ textAlign: 'center'}} title={name}/>
        <strike><Meta title={`$${price}`}/></strike>
        <Button type="primary" size='small'>
          <Meta title={`$${discounted_price}`}/>
        </Button><br /><br />
        <Meta description={description}/>
        </span>
      </Card>
    </div>
  );
}

export default ProductCard;