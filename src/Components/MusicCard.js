import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    return (
      <div>
        {
          musics.map((music) => (
            <div key={ music.trackid }>
              <p>{music.trackName}</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
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
