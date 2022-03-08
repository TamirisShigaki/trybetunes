import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artName: '',
      btnDisable: true,
    };
  }

  // verifica se o input name tem mais de 2 caráter e habilita o botão.
  handleChange = (event) => {
    const min = 2;

    this.setState(() => ({
      artName: event.target.value,
      btnDisable: event.target.value.length < min,
    }));
  }

  render() {
    const { artName, btnDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="name-input">
            <input
              type="text"
              data-testid="search-artist-input"
              value={ artName }
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ btnDisable }
          >
            Pesquisar
          </button>
        </form>

      </div>
    );
  }
}

export default Search;
