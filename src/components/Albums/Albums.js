import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAlbums } from '../../store/actions/albums';
import styles from './Albums.module.css';
import ErrorCode from '../ErrorCode/ErrorCode';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    albums: state.albumsReducer.albums,
    error: state.albumsReducer.albumsError,
    loading: state.albumsReducer.albumsLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAlbums: (userId) => dispatch(getAlbums(userId))
  };
}

class Albums extends Component {
  handleAlbumClick = (ev, albumId) => {
    ev.preventDefault();

    this.props.history.push('/albums/' + albumId);
  }

  componentDidMount() {
    const userId = parseInt(this.props.match.params.id, 10);

    if (userId && !isNaN(userId) && userId > 0 && userId < 11) {
      if (
        (this.props.albums.length && !this.props.albums.every(album => album.userId === userId)) ||
        !this.props.albums.length
      ) {
        this.props.getAlbums(userId);
      }
    } else {
      if (
          !this.props.albums.length ||
          this.props.albums.reduce((prev, curr) => {
            if (!prev.includes(curr.userId)) {
              prev.push(curr.userId);
            }

            return prev;
          }, []).length === 1
        ) {
        this.props.getAlbums();
      }
    }
  }

  render() {
    let albums = <h3 style={{textAlign: 'center'}}>No albums found.</h3>;

    if (this.props.loading) {
      albums = <h3 style={{textAlign: 'center'}}>Loading...</h3>;
    } else if (this.props.albums.length) {
      albums =
        <Fragment>
          <h2 style={{textAlign: 'center'}}>Albums list</h2>
          <div className={styles.tiles}>
            {this.props.albums.map(album =>
              <a key={album.id} className={styles.tile} href="#0" onClick={(ev) => this.handleAlbumClick(ev, album.id)}>
                <h4 className={styles.id}>{album.id}</h4>
                <p className={styles.title}>{album.title}</p>
              </a>
            )}
          </div>
        </Fragment>;
    } else if (this.props.error) {
      albums = <ErrorCode error={this.props.error} />;
    }

    return (
      <div className={styles.albums}>
        {albums}
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(Albums));
