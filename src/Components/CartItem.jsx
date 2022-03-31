import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Cart.css';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  decreaseQuantity = () => {
    const { quantity } = this.state;
    this.setState({
      quantity: (quantity - 1),
    });
  }

  increaseQuantity = () => {
    const { quantity } = this.state;
    this.setState({
      quantity: (quantity + 1),
    });
  }

  render() {
    const { quantity } = this.state;
    const { product } = this.props;
    return (
      <div className="container-cart-product">
        <button
          type="button"
          className="cart-button"
          // onClick={ (event) => this.removeCartItem(event) }
        >
          X
        </button>
        <div className="cart-product-info">
          <h4
            data-testid="shopping-cart-product-name"
            className="product-title"
          >
            { product.title }
          </h4>
          <div className="cart-product-image-price">
            <img
              src={ product.thumbnail }
              alt={ product.title }
              className="cart-image"
            />
            <span>
              {`R$: ${product.price}`}
            </span>
          </div>
        </div>
        <div className="cart-quantity-info">
          <button
            type="button"
            data-testid="product-decrease-quantity"
            onClick={ (event) => this.decreaseQuantity(event) }
            className="cart-button"

          >
            -
          </button>
          <p
            data-testid="shopping-cart-product-quantity"
            className="cart-quantity-number"
          >
            {quantity}
          </p>
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ (event) => this.increaseQuantity(event) }
            className="cart-button"

          >
            +
          </button>
        </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  product: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default CartItem;
