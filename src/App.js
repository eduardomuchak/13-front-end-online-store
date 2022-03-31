import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Rotas from './Components/Rotas';

class App extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    );
  }
}

export default App;
