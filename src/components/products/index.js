import React from 'react';
import { Pagination, Row, Col} from 'antd';
import ProductCard from './ProductCard';

const Products = ({ products, page, onChange, onClick }) => {

  return (
    <div>
      <Pagination current={page} onChange={onChange} total={50} />
      <Row type="flex" justify="space-between">
          { products.rows.map((product) => 
            <Col 
            // xs={{ span: 6, offset: 6 }} 
            // lg={{ 
              span={8}
            //  }}
             >
              <ProductCard
                product_id={product.product_id}
                name={product.name}
                description={product.description}
                price={product.price}
                discounted_price={product.discounted_price}
                thumbnail={product.thumbnail}
                onClick={onClick}
              />
            </Col>
          )}
        </Row>
    </div>
  );
}

export default Products;