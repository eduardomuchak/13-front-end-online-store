import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../Components/CartItem';

class Carrinho extends React.Component {
  constructor() {
    super();

    this.state = {
      cartLocalStorage: [],
    };
  }

  componentDidMount() {
    this.getProductsFromLocalStorage();
  }

  getProductsFromLocalStorage = async () => {
    const products = await JSON.parse(localStorage.getItem('Carrinho'));
    this.setState({
      cartLocalStorage: products,
    });
  }

  // filterItem = (id) => {
  //   const { cartLocalStorage } = this.state;
  //   const somaItem = cartLocalStorage.filter((product) => product.id === id);
  //   return somaItem.length;
  // }

  render() {
    const { cartLocalStorage } = this.state;
    return (
      <div className="cart">
        {
          !cartLocalStorage
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              cartLocalStorage.map((item, index) => (
                <CartItem
                  key={ index }
                  product={ item }
                />
              ))
            )
        }
        <div className="submit-purchase">
          <h3>Valor Total: R$ XXX,XX</h3>
          <button
            type="button"
            className="submit-button"
          >
            <Link
              data-testid="checkout-products"
              to="/checkout"
            >
              Finalizar Compra
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Carrinho;
