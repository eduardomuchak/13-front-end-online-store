import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Evaluation from '../Components/Evaluation';
import { getProductsDetails } from '../services/api';

class CardDetails extends Component {
  constructor() {
    super();
    this.state = {
      thumbnail: '',
      title: '',
      price: 0,
      attributes: [],
      assessments: [],
      email: '',
      comment: '',
      star: 0,
      localStorageReviews: [],
      cartItems: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const { thumbnail, title, price, attributes } = await getProductsDetails(id);
    this.setState({
      thumbnail,
      title,
      price,
      attributes,
    }, () => (this.getLocalStorage()));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, comment, star } = this.state;
    const newEvaluation = { email, comment, star };
    this.setState((prevState) => ({
      assessments: [...prevState.assessments, newEvaluation],
      email: '',
      comment: '',
      star: 0,
    }), () => this.addLocalStorage());
  }

  renderStars = () => {
    const { star } = this.state;
    const maxNumberOfStars = 5;
    const arrayOfStars = [];
    for (let index = 1; index <= maxNumberOfStars; index += 1) {
      arrayOfStars.push(
        <label htmlFor={ `${index}-star` } key={ `${index}-key` }>
          <input
            onChange={ (event) => this.handleChange(event) }
            type="checkbox"
            value={ index }
            data-testid={ `${index}-rating` }
            id={ `${index}-star` }
            name="star"
            checked={ star >= index }
          />
          <BsStar />
        </label>
        ,
      );
    }
    return <div>{arrayOfStars}</div>;
  }

  addLocalStorage = () => {
    const { assessments } = this.state;
    localStorage.setItem('Reviews', JSON.stringify(assessments));
  }

  getLocalStorage = async () => {
    const reviews = await JSON.parse(localStorage.getItem('Reviews'));
    this.setState({
      localStorageReviews: reviews,
    });
  }

  addCarrinho = () => {
    const { cartItems } = this.state;
    localStorage.setItem('Carrinho', JSON.stringify(cartItems));
  }

  handleClick = () => {
    const { match } = this.props;
    const { id } = match.params;
    const infoProducts = JSON.parse(localStorage.getItem('infoProducts'));
    const productResult = infoProducts.find((product) => product.id === id);
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, productResult],
    }), () => this.addCarrinho());
  }

  render() {
    const {
      thumbnail,
      title,
      price,
      attributes,
      email,
      comment,
      assessments,
      localStorageReviews,
    } = this.state;

    return (
      <div>
        <div>
          <img src={ thumbnail } alt={ title } />
          <p data-testid="product-detail-name">{ title }</p>
          <p>
            R$:
            { price }
          </p>
        </div>
        <div>
          {
            attributes.map(({ name, value_name: valueName }) => (
              <p key={ name }>
                {`${name}: ${valueName}`}
              </p>
            ))
          }
        </div>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ (event) => this.handleClick(event) }
          title={ title }
        >
          Adiciona ao Carrinho
        </button>
        <Link
          data-testid="shopping-cart-button"
          to="/Carrinho"
        >
          Carrinho de Compras

        </Link>

        <form>
          <fieldset>

            {this.renderStars()}

            <label htmlFor="emailInput">
              <input
                type="email"
                data-testid="product-detail-email"
                id="emailInput"
                placeholder="Email"
                onChange={ (event) => this.handleChange(event) }
                value={ email }
                name="email"
              />
            </label>
            <textarea
              data-testid="product-detail-evaluation"
              placeholder="Digite aqui seu comentário"
              onChange={ (event) => this.handleChange(event) }
              value={ comment }
              name="comment"
            />
            <button
              type="submit"
              data-testid="submit-review-btn"
              onClick={ (event) => this.handleSubmit(event) }
            >
              Avaliar
            </button>
          </fieldset>
        </form>
        <Evaluation
          assessments={ assessments }
        />
        <div>
          {
            localStorageReviews
          && localStorageReviews.map((review, index) => (
            <div key={ index }>
              <p>
                { review.email }
              </p>
              <p>
                { review.comment }
              </p>
              <p>
                { review.star }
                <BsStar />
              </p>
            </div>
          ))
          }
        </div>
      </div>
    );
  }
}

CardDetails.propTypes = {
  id: PropTypes.string,
  addCarrinho: PropTypes.func,
}.isRequired;

export default CardDetails;
