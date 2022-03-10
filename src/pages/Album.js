import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      viewAlbum: [],
      completeMusics: [],
    };
  }

  // retorna a API getMusics o album com a lista de musica - Ajuda do Danillo e Do Pedrin
  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const listAlbum = await getMusics(id);
    const completeMusics = listAlbum.filter((_music, index) => index !== 0); // Ignora a primeira posição e "pega"só as musicas
    this.setState({
      viewAlbum: listAlbum[0], // pega as informações do album usadas na linhas 35 e 36
      completeMusics,
    });
  }

  render() {
    const { viewAlbum, completeMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h3 data-testid="artist-name">{ viewAlbum.artistName }</h3>
          <p data-testid="album-name">{ viewAlbum.collectionName }</p>
          <MusicCard musics={ completeMusics } />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  id: propTypes.string,
}.isRequired;

export default Album;
