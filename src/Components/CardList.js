import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from './Card';

class CardList extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    this.getProductsFromLocalStorage();
  }

  getProductsFromLocalStorage = async () => {
    const products = await JSON.parse(localStorage.getItem('Carrinho'));
    if (products) {
      this.setState({
        cartItems: products,
      });
    }
  }

  addCarrinho = () => {
    const { cartItems } = this.state;
    localStorage.setItem('Carrinho', JSON.stringify(cartItems));
  }

  handleClick = async ({ target: { id } }) => {
    const { queryOrCategoryResult } = this.props;
    const productResult = queryOrCategoryResult.find((product) => product.id === id);
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, productResult],
    }), () => this.addCarrinho());
  }

  render() {
    const { cartItems } = this.state;
    const { queryOrCategoryResult } = this.props;
    return (
      <div>
        {
          queryOrCategoryResult.length > 0
            ? (
              queryOrCategoryResult.map((result, index) => (
                <div key={ index }>
                  <Card
                    key={ result.id }
                    result={ result }
                    cartItems={ cartItems }
                  />
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ (event) => this.handleClick(event) }
                    title={ result.title }
                    id={ result.id }
                  >
                    Adiciona ao Carrinho
                  </button>
                </div>
              )))
            : <h1>Nenhum produto foi encontrado</h1>
        }
      </div>
    );
  }
}

CardList.propTypes = {
  queryInput: PropTypes.string,
  cardList: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default CardList;
