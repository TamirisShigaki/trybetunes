import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      viewAlbum: [{}],
      completeAlbum: [],
    };
  }

  // retorna a API getMusics o album com a lista de musica
  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const listAlbum = await getMusics(id);
    this.setState({
      viewAlbum: listAlbum[0],
    });
  }

  render() {
    const { viewAlbum, completeAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h3 data-testid="artist-name">{ viewAlbum.artistName }</h3>
          <p data-testid="album-name">{ viewAlbum.collectionName }</p>
          <MusicCard musics={ completeAlbum } />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  id: propTypes.string,
}.isRequired;

export default Album;
