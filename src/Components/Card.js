import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { result } = this.props;
    const { title, thumbnail, price, id } = result;
    return (
      <div data-testid="product">
        <h3>
          {title}
        </h3>
        <img src={ thumbnail } alt={ title } />
        <br />
        <span>
          R$:
          {price}
        </span>
        <br />
        <Link
          to={ `/cardDetails/${id}` }
          data-testid="product-detail-link"
        >
          Detalhes do Produto
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default Card;
