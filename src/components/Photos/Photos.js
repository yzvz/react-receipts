import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhotos } from '../../store/actions/photos';
import { NavLink } from 'react-router-dom';
import styles from './Photos.module.css';
import ErrorCode from '../ErrorCode/ErrorCode';

function mapStateToProps(state) {
  return {
    photos: state.photosReducer.photos,
    error: state.photosReducer.photosError,
    loading: state.photosReducer.photosLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPhotos: () => dispatch(getPhotos())
  };
}

class Photos extends Component {
  componentDidMount() {
    if (
      !this.props.photos.length ||
      this.props.photos.reduce((prev, curr) => {
        if (!prev.includes(curr.albumId)) {
          prev.push(curr.albumId);
        }

        return prev;
        }, []).length === 1
      ) {
      this.props.getPhotos();
    }
  }

  render() {
    let photos = <h2 style={{textAlign: 'center'}}>No photos found.</h2>;

    if (this.props.loading) {
      photos = <h2 style={{textAlign: 'center'}}>Loading...</h2>;
    } else if (this.props.photos.length) {
      photos = this.props.photos.map(photo =>
        <NavLink to={this.props.match.url + '/' + photo.id} className={styles.photo}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
        </NavLink>
      )
    } else if (this.props.error) {
      photos = <ErrorCode error={this.props.error} />;
    }

    return (
      <div className={styles.photos}>
        {photos}
      </div>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Photos);
