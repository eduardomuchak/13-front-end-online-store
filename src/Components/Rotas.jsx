import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CardDetails from '../pages/CardDetails';
import Carrinho from '../pages/Carrinho';
import Checkout from '../pages/Checkout';
import Home from '../pages/Home';

class Rotas extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/Carrinho" component={ Carrinho } />
        <Route path="/cardDetails/:id" component={ CardDetails } />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    );
  }
}
export default Rotas;

// Requisito 1 - Eduardo Muchak e Renan Aizawa
// Requisito 2 - Tamiris Shigaki, Hanna Bacelar e João Victor
// Requisito 3 - Hanna Bacelar
// Requisito 4 - Renan Aizawa e João Victor
// Requisito 5 - Eduardo Muchak e Tamiris Shigaki
// Requisito 6 - Eduardo Muchak, Renan Aizawa, João Victor e Tamiris Shigaki
// Requisito 7 - Tamiris Shigaki e Hanna Bacelar
// Requisito 8 - Eduardo Muchak, Tamiris Shigaki, Renan Aizawa e Hanna Bacelar
// Requisito 9 - Eduardo Muchak
// Requisito 10 - Eduardo Muchak
// Requisito 11 - Eduardo Muchak e Tamiris Shigaki
// Conflitos de merge feito em grupo
