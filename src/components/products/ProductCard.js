import React from 'react';
import { Card, Button } from 'antd';

const { Meta } = Card;

const ProductCard = ({ product_id, name, description, price, discounted_price, thumbnail, onClick }) => {

  return (
    <div>
      <Card
        hoverable
        className="products__card"
        onClick={() => onClick(product_id)}
        cover={<img alt={name} className="products__card-image" src={`https://backendapi.turing.com/images/products/${thumbnail}`} />}
      >
      <span className="products__details">
        <Meta className="products__title" title={name}/>
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