import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhoto } from '../../store/actions/photos';
import ErrorCode from '../ErrorCode/ErrorCode';
import styles from './Photo.module.css';

function mapStateToProps(state) {
  return {
    photos: state.photosReducer.photos,
    photo: state.photosReducer.photo,
    error: state.photosReducer.photoError,
    loading: state.photosReducer.photoLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPhoto: (photoId) => dispatch(getPhoto(photoId))
  };
}

class Photo extends Component {
  state = {
    photo: null
  }

  componentDidMount() {
    const photoId = parseInt(this.props.match.params.id, 10);

    if (isNaN(photoId)) {
      return;
    }

    const photoInPhotos = this.props.photos.find(photo => photo.id === photoId);

    if (!this.state.photo) {
      if (photoInPhotos) {
        this.setState({ photo: photoInPhotos });
      } else {
        this.props.getPhoto(photoId);
      }
    }
  }

  render() {
    let photo = <h2 style={{textAlign: 'center'}}>No photo found.</h2>;

    if (this.props.loading) {
      photo = <h2 style={{textAlign: 'center'}}>Loading...</h2>;
    } else if (this.state.photo) {
      photo = <img src={this.state.photo.url} alt={this.state.photo.title} className={styles.photo} />
    } else if (this.props.photo) {
      photo = <img src={this.props.photo.url} alt={this.props.photo.title} className={styles.photo} />
    } else if (this.props.error) {
      photo = <ErrorCode error={this.props.error} />;
    }

    return photo;
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Photo);
