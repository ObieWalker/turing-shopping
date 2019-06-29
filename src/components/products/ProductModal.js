import React, { useState } from 'react';
import {
  Modal, Carousel, Select, Button, Icon, Input, Rate, List, Comment, Divider, notification
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const ProductModal = ({ visible, handleCancel, product, addToCart, submitReview, reviews, cartId }) => {

  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [cartError, setCartError] = useState("");
  const { product_id, name, description, price, discounted_price, image, image_2, thumbnail } = product;
  
  const sizeOnChange = (value) => {
    setSize(value);
  }

  const colorOnChange = (value) => {
    setColor(value);
  }

  const addProductToCart = async() => {
    if (!size || !color){
      setCartError("Please pick a size and color");
    } else {
      setCartError("");
      let product =
        {
          cart_id: cartId,
          product_id,
          attributes: `${size}, ${color}`
        }
        const response = await addToCart(product);
        handleResponse(response);
    }
  }

  const handleResponse = (response) => {
    if (response.type === 'ADD_TO_CART_SUCCESS'){
      handleCancel();
      notification.open({
        message: 'Added to cart',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />
      });
    }
  }

  const clearState = () => {
    setColor(null);
    setSize(null);
  }

  return (
    <Modal
      visible={visible}
      closable={true}
      onCancel={handleCancel}
      footer={null}
      width={700}
      afterClose={clearState}
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
          placeholder="Color"
          style={{ width: '30%'}}
          onChange={colorOnChange}
          value={color ? color : undefined}
        >
          <Option value="black">Black</Option>
          <Option value="white">White</Option>
          <Option value="blue">Blue</Option>
          <Option value="red">Red</Option>
          <Option value="yellow">Yellow</Option>
          <Option value="green">Green</Option>
        </Select>

        <Select
          placeholder="Size"
          style={{ width: '30%',  margin: '5%'}}
          onChange={sizeOnChange}
          value={size ? size : undefined}
        >
          <Option value="s">S</Option>
          <Option value="m">M</Option>
          <Option value="l">L</Option>
          <Option value="xl">XL</Option>
          <Option value="xxl">XXL</Option>
        </Select>
        {cartError && <span style={{ color: 'red', fontSize: '10px'}}><br />{cartError}</span>}
        <br />
        <Button key="add"
        type="primary"
        onClick={addProductToCart}
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
      <h4><Divider>Reviews</Divider></h4>
        <div style={{ height: '300px', width: '60%', margin: 'auto', overflow: 'scroll'}}>
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