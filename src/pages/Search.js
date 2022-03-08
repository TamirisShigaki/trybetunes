import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from './Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artName: '',
      btnDisable: true,
      loading: false,
      albumSearch: [],
      resultSearch: false,
      searchArtist: '',
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

  // faz a requisição/pesquisa do album na API e exibe na tela, enquanto estiver aguardando a resposta da searchAlbumsAPIs, exibe apenas a mensagem de Carregando...
  btnSearch = (event) => {
    event.preventDefault();

    const { artName } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      const albumSearch = await searchAlbumsAPIs(artName);
      this.setState({
        loading: false,
        searchArtist: artName,
        artName: '',
        albumSearch,
        resultSearch: true,
      });
    });
  }

  render() {
    const {
      artName,
      btnDisable,
      loading,
      albumSearch,
      resultSearch,
      searchArtist,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <Loading /> : (
            <div>
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
                  onClick={ this.btnSearch }
                >
                  Pesquisar
                </button>
              </form>
            </div>
          )
        }

        {
          searchArtist && (<p>{`Resultado de álbuns de: ${searchArtist}`}</p>)
        }

        {
          albumSearch.length === 0 && resultSearch
            ? <p>Nenhum álbum foi encontrado</p>
            : albumSearch.map((album) => (
              <div key={ album.collectionId }>
                <Link
                  key={ album.collectionId }
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  Album
                </Link>
                <img
                  src={ album.artworkUrl100 }
                  alt={ `Album ${album.collectionName}` }
                />
                <p>{ album.collectionName }</p>
                <p>{ album.artistName }</p>
              </div>
            ))
        }
      </div>
    );
  }
}

export default Search;
