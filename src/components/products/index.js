import React from 'react';
import { Pagination, Row, Col} from 'antd';
import ProductCard from './ProductCard';

const Products = ({ products, page, onChange, onClick, total }) => {

  return (
    <div>
      <Pagination
        current={page}
        onChange={onChange}
        hideOnSinglePage={true}
        total={products.totalProducts}
        pageSize={20}
      />
      <Row type="flex" justify="space-between">
          { products.rows.map((product, key) => 
            <Col
              key={product.product_id}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
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