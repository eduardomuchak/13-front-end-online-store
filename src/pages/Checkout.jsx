import React, { Component } from 'react';

class Checkout extends Component {
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

  render() {
    const { cartLocalStorage } = this.state;
    return (
      <div>
        <fieldset>
          <h3>Revise seus Produtos</h3>
          {
            (
              cartLocalStorage.map((product, index) => (
                <div className="cart-product-info" key={ index }>
                  <img
                    src={ product.thumbnail }
                    alt={ product.title }
                    className="cart-image"
                  />
                  <span
                    className="product-title"
                  >
                    { product.title }
                  </span>
                  <span>
                    {`R$: ${product.price}`}
                  </span>
                </div>
              ))
            )
          }
        </fieldset>
        <fieldset>
          <h3>Informações da Pessoa Compradora</h3>
          <label htmlFor="name-input">
            <input
              id="name-input"
              placeholder="Nome Completo"
              data-testid="checkout-fullname"
            />
          </label>
          <label htmlFor="cpf-input">
            <input
              id="cpf-input"
              placeholder="CPF"
              data-testid="checkout-cpf"
            />
          </label>
          <label htmlFor="email-input">
            <input
              id="email-input"
              placeholder="Email"
              data-testid="checkout-email"
            />
          </label>
          <label htmlFor="phone-input">
            <input
              id="phone-input"
              placeholder="Telefone"
              data-testid="checkout-phone"
            />
          </label>
          <label htmlFor="cep-input">
            <input
              id="cep-input"
              placeholder="CEP"
              data-testid="checkout-cep"
            />
          </label>
          <label htmlFor="address-input">
            <input
              id="address-input"
              placeholder="Endereço"
              data-testid="checkout-address"
            />
          </label>
        </fieldset>
        <fieldset>
          <h3>Método de Pagamento</h3>
          <label htmlFor="payment-boleto">
            <input
              type="radio"
              id="payment-boleto"
              name="payment"
            />
            Boleto
          </label>
          <label htmlFor="payment-credit">
            <input
              type="radio"
              id="payment-credit"
              name="payment"
            />
            Cartão de Crédito
          </label>
          <label htmlFor="payment-debit">
            <input
              type="radio"
              id="payment-debit"
              name="payment"
            />
            Cartão de Débito
          </label>
          <label htmlFor="payment-pix">
            <input
              type="radio"
              id="payment-pix"
              name="payment"
            />
            PIX
          </label>
        </fieldset>
        <button type="submit">
          Comprar
        </button>
      </div>
    );
  }
}

export default Checkout;
