import React, { useState } from 'react';
import {
  Modal,
  Carousel,
  Select,
  Button,
  Icon,
  Input,
  Rate,
  List,
  Comment,
  Divider,
  notification,
  Skeleton
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const ProductModal = ({
  visible,
  handleCancel,
  product,
  addToCart,
  submitReview,
  reviews,
  cartId,
  loggedInUser,
  openLoginModal,
  productLoading
}) => {

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
        icon: <Icon type="smile" className="productmodal__icon-style"/>
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
      { productLoading ? 
        <Skeleton active paragraph={{ rows: 8 }}/> :
        <>
          <div className="productmodal__container">
            <Carousel>
              <div>
                <img alt={name} 
                  className="productmodal__carousel-image"
                  src={`https://backendapi.turing.com/images/products/${image}`} />
              </div>
              <div>
                <img alt={name} 
                  className="productmodal__carousel-image"
                  src={`https://backendapi.turing.com/images/products/${image_2}`} />
              </div>
              <div>
                <img alt={name} 
                  className="productmodal__carousel-image"
                  src={`https://backendapi.turing.com/images/products/${thumbnail}`} />
              </div>
            </Carousel>
          </div>
          <div className="productmodal__modal-details">
            <h4>{name}</h4>
            <span>
              <h6><strike>{`$${price}`}</strike></h6>
              <h4>{`$${discounted_price}`}</h4>
            </span>
            <h5>{description}</h5>
            { loggedInUser ?
              <>
                <Select
                  placeholder="Color"
                  className="productmodal__color-select"
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
                  className="productmodal__size-select"
                  onChange={sizeOnChange}
                  value={size ? size : undefined}
                >
                  <Option value="s">S</Option>
                  <Option value="m">M</Option>
                  <Option value="l">L</Option>
                  <Option value="xl">XL</Option>
                  <Option value="xxl">XXL</Option>
                </Select>
                {cartError && <span className="productmodal__cart-error"><br />{cartError}</span>}
                <br />
                <Button key="add"
                  type="primary"
                  onClick={addProductToCart}
                  className="productmodal__add-to-cart"
                >
                  Add to cart<Icon type="shopping-cart" />
                </Button>
                </>
                :
                <h3>Sign in to add to cart or review 
                  <span
                    className="productmodal__signin-link"
                    onClick={()=>{ handleCancel(); openLoginModal() }}
                  > here.
                  </span>
                </h3>
              }
            </div>
            <br style={{clear: 'both'}}/>
            <br />
            {
              loggedInUser &&
              <>
              <hr />
              <h4 className="productmodal__review-header">Leave a review</h4>
              <TextArea rows={4} className="productmodal__review-textarea"/>
              <Rate className="productmodal__rate-value"/>
              <br /><br />
              <Button key="submit"
                type="primary" ghost
                onChange={submitReview}
                >
                Submit Review
              </Button>
            </>
          }
          <br /><br />
          <h4><Divider>Reviews</Divider></h4>
          <div className="productmodal__review-list">
            <List
              dataSource={reviews}
              itemLayout="horizontal"
              renderItem={review =>
                <div className="productmodal__review-items">
                  <Comment 
                    author={<h3><b>{review.name}</b></h3>}
                  />
                  <Rate className="productmodal__rate-button" disabled value={review.rating}/>
                  <Comment 
                    content={review.review}
                  />
                </div>
              }
            />
          </div>
        </>
      }
    </Modal>
  )
}

export default ProductModal;