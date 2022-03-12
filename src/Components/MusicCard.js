import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: [],
    };
  }

  async componentDidMount() {
    this.savedMusics();
  }

favoriteMusic = async (event) => {
  const { musics } = this.props;
  const favorito = musics
    .find((objFavorite) => objFavorite.trackId === +event.target.value); // verifica se os id do objeto é igual o id/valor do value, se for retorna meu objeto de music
  this.setState((preview) => ({
    loading: true,
    checked: [...preview.checked, +event.target.value], // mantenho a lista de favoritos e add outra
  }));
  await addSong(favorito); // add meu favorito na aPI
  this.setState({
    loading: false,
  });
}

savedMusics = async () => {
  const favoriteSong = await getFavoriteSongs(); // lista com musicas salvas
  const idSavedMusic = favoriteSong.map((song) => song.trackId); // pega os id das musicas salvas
  this.setState({
    checked: idSavedMusic,
  });
}

render() {
  const { musics } = this.props;
  const { loading, checked } = this.state;
  return (
    <div>
      {
        loading ? <Loading />
          : musics.map((music) => (
            <div key={ music.trackId }>
              <p>{music.trackName}</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <br />

              <label htmlFor="favorita">
                Favorita
                <input
                  type="checkbox"
                  id="favorita"
                  value={ music.trackId }
                  data-testid={ `checkbox-music-${music.trackId}` }
                  checked={ checked.some((id) => id === music.trackId) } // verifico se tem o id dentro do checked e retorna um bolleano, habilitando o botão se for true
                  onChange={ this.favoriteMusic }
                />
              </label>
            </div>))
      }

    </div>
  );
}
}

MusicCard.propTypes = {
  musics: PropTypes.array,
}.isRequired;

export default MusicCard;
