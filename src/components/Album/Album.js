import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Album.module.css';
import { getAlbum } from '../../store/actions/albums';
import { getPhotos } from '../../store/actions/photos';
import ErrorCode from '../ErrorCode/ErrorCode';

function mapStateToProps(state) {
  return {
    albums: state.albumsReducer.albums,
    album: state.albumsReducer.album,
    error: state.albumsReducer.albumError,
    loading: state.albumsReducer.albumLoading,

    photos: state.photosReducer.photos,
    photosError: state.photosReducer.photosError,
    photosLoading: state.photosReducer.photosLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAlbum: (albumId) => dispatch(getAlbum(albumId)),
    getPhotos: (albumId) => dispatch(getPhotos(albumId))
  };
}

class Album extends Component {
  state = {
    album: null
  }

  handlePhotoClick = (ev, photoId) => {
    ev.preventDefault();

    this.props.history.push('/photos/' + photoId);
  }

  componentDidMount() {
    const albumId = parseInt(this.props.match.params.id, 10);

    if (isNaN(albumId)) {
      return;
    }

    const albumInAlbums = this.props.albums.find(album => album.id === albumId);

    if (!this.state.album) {
      if (albumInAlbums) {
        this.setState({ album: albumInAlbums });
      } else {
        this.props.getAlbum(albumId);
      }
    }

    const isSet = this.props.photos.length !== 0;
    const isEvery = this.props.photos.every(p => p.albumId === albumId);

    if (!isEvery || !isSet) {
      this.props.getPhotos(albumId);
    }
  }

  render() {

    const returnAlbumMarkup = (album, photos) => <div className={styles.card}>
      <div className={styles.id}>{album.id}</div>
      <div className={styles.photos}>
        {photos}
      </div>
    </div>;

    let photos = <h2 style={{textAlign: 'center'}}>No photos found.</h2>;

    if (this.props.photosLoading) {
      photos = <h3 style={{textAlign: 'center'}}>Loading...</h3>;
    } else if (this.props.photos.length) {
      photos = this.props.photos.map(p =>
        <a href="#0" onClick={(ev) => this.handlePhotoClick(ev, p.id)} key={p.id} className={styles.photo}>
          <img src={p.thumbnailUrl} alt={p.title} />
        </a>
      )
    } else if (this.props.photosError) {
      photos = <ErrorCode error={this.props.photosError} />;
    }

    let album = <h2 style={{textAlign: 'center'}}>No album found.</h2>;

    if (this.props.loading) {
      album = <h2 style={{textAlign: 'center'}}>Loading...</h2>;
    } else if (this.state.album) {
      album = returnAlbumMarkup(this.state.album, photos);
    } else if (this.props.album) {
      album = returnAlbumMarkup(this.props.album, photos);
    } else if (this.props.error) {
      album = <ErrorCode error={this.props.error} />;
    }

    return (
      <div className={styles.album}>
        {album}
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Album);
