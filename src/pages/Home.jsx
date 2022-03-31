import React from 'react';
import { Link } from 'react-router-dom';
import CardList from '../Components/CardList';
import { getCategories, getItemsFromCategory, getItemsFromQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      queryOrCategoryResult: [],
      queryInput: '',
      categoryId: '',
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleChange({ target }) {
    this.setState({
      queryInput: target.value,
    });
  }

  handleSubmit= async (event) => {
    const { queryInput } = this.state;
    event.preventDefault();
    const query = await getItemsFromQuery(queryInput);
    this.setState({
      queryOrCategoryResult: query.results,
    });
  }

  handleCategory = ({ target }) => {
    const { categories } = this.state;
    const singleCategory = categories.find(
      (category) => category.id === target.value,
    );
    this.setState({
      categoryId: singleCategory.id,
    }, () => (this.pushCategoryResult()));
  }

  pushCategoryResult = async () => {
    const { categoryId } = this.state;
    const categoryProducts = await getItemsFromCategory(categoryId);
    this.setState({ queryOrCategoryResult: categoryProducts.results });
    localStorage.setItem('infoProducts', JSON.stringify(categoryProducts.results));
  }

  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const {
      queryOrCategoryResult,
      queryInput,
      categories,
    } = this.state;
    // console.log(queryOrCategoryResult);
    return (
      <>
        <header>
          <Link
            data-testid="shopping-cart-button"
            to="/Carrinho"
          >
            Carrinho de Compras

          </Link>
        </header>
        <aside>
          <div>
            <h5>
              Lista de Categorias
            </h5>
            <div>
              {categories.map(({ id, name }) => (
                <button
                  type="button"
                  key={ id }
                  data-testid="category"
                  onClick={ (event) => this.handleCategory(event) }
                  value={ id }
                >
                  { name }
                </button>
              ))}
            </div>
          </div>
        </aside>
        <main>
          <form>
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            <label htmlFor="query-input">
              <input
                type="text"
                data-testid="query-input"
                id="query-input"
                value={ queryInput }
                onChange={ (event) => this.handleChange(event) }
              />
              <button
                type="submit"
                data-testid="query-button"
                onClick={ (event) => this.handleSubmit(event) }
              >
                Pesquisar
              </button>
            </label>
          </form>
          <CardList
            queryOrCategoryResult={ queryOrCategoryResult }
          />
        </main>
      </>
    );
  }
}

export default Home;
