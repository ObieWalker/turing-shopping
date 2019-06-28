import React from 'react';
import {
  Modal, Carousel, Select, Button, Icon, Input, Rate, List, Comment
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const ProductModal = ({ visible, handleCancel, product, addToCart, submitReview, reviews }) => {

  const { product_id, name, description, price, discounted_price, image, image_2, thumbnail } = product;
  return (
    <Modal
      visible={visible}
      closable={true}
      onCancel={handleCancel}
      footer={null}
      width={700}
    >
      <div>
      <div style={{ width: '30%', float: 'left'}}>
        <Carousel>
          <div>
          <img alt={name} 
            style={{ height: '130px', width: '150px', margin: 'auto'}}
            src={`https://backendapi.turing.com/images/products/${image}`} />
          </div>
          <div>
            <img alt={name} 
              style={{ height: '130px', width: '150px', margin: 'auto'}}
              src={`https://backendapi.turing.com/images/products/${image_2}`} />
          </div>
          <div>
            <img alt={name} 
              style={{ height: '130px', width: '150px', margin: 'auto'}}
              src={`https://backendapi.turing.com/images/products/${thumbnail}`} />
          </div>
        </Carousel>
      </div>
      <div style={{ width: '60%', float: 'right'}}>
        <h4>{name}</h4>
        <span className='modal-prices'>
          <h6><strike>{`$${price}`}</strike></h6>
          <h4>{`$${discounted_price}`}</h4>
        </span>
        <h5>{description}</h5>
        <Select
          placeholder="Select a Color"
          style={{ width: '30%'}}
        >
          <Option value="black">Black</Option>
          <Option value="white">White</Option>
          <Option value="blue">Blue</Option>
          <Option value="red">Red</Option>
          <Option value="yellow">Yellow</Option>
          <Option value="green">Green</Option>
        </Select>

        <Select
          placeholder="Select a Size"
          style={{ width: '30%',  margin: '5%'}}
        >
          <Option value="s">S</Option>
          <Option value="m">M</Option>
          <Option value="l">L</Option>
          <Option value="xl">XL</Option>
          <Option value="xxl">XXL</Option>
        </Select>
        <br />
        <Button key="add"
        type="primary"
        onClick={addToCart}
        className="add-to-cart-button"
        >
        Add to cart<Icon type="shopping-cart" />
      </Button>
      </div>
      <br style={{clear: 'both'}}/>
      <br />

      <hr />
      <h4 style={{ textAlign: 'center', marginTop: '2%'}}>Leave a review</h4>
      <TextArea rows={4} style={{ width: '50%'}}/>
      <Rate style={{margin: '5%'}}/>
      </div>
      <br /><br />
      <Button key="submit"
        type="primary" ghost
        onChange={submitReview}
        >
        Submit Review
      </Button>
      <br /><br />
        <hr />
        <div style={{ height: '300px', width: '60%', margin: 'auto', overflow: 'scroll'}}>
        <h4 style={{ textAlign: 'center'}}>Reviews</h4>
        <List
          dataSource={reviews}
          itemLayout="horizontal"
          renderItem={review =>
          <div style={{ border: '2px outset lightgrey', borderRadius: '5px'}}>
          <Comment 
            author={<h3><b>{review.name}</b></h3>}
          />
          <Rate style={{ fontSize: 10, marginLeft: '15px' }} disabled value={review.rating}/>
          <Comment 
            content={review.review}
          />
          </div>
        }
        />
        </div>
    </Modal>
  )
}

export default ProductModal;