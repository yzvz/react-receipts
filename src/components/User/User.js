import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './User.module.css';
import { getUser } from '../../store/actions/users';
import ErrorCode from '../ErrorCode/ErrorCode';
import Albums from '../Albums/Albums';
import { Route, Link } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    users: state.usersReducer.users,
    user: state.usersReducer.user,
    error: state.usersReducer.userError,
    loading: state.usersReducer.userLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: (userId) => dispatch(getUser(userId))
  }
}

class User extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    const userId = parseInt(this.props.match.params.id, 10);

    if (isNaN(userId) || userId < 0 || userId > 10) {
      return;
    }

    const userInUsers = this.props.users.find(user => user.id === userId);

    if (!this.state.user) {
      if (userInUsers) {
        this.setState({ user: userInUsers });
      } else {
        this.props.getUser(userId);
      }
    }
  }

  render() {
    const returnUserMarkup = (user) =>
      <div className={styles.card}>
        <div className={styles.id}>{user.id}</div>
        <div className={styles.data}>
          <h2 className={styles.name}>{user.name}</h2>
          <h3 className={styles.username}>{user.username}</h3>
          <p className={styles.email}>
            <a href={'mailto:' + user.email}>{user.email}</a>
          </p>
          <p className={styles.phone}>
            <a href={'tel:' + user.phone}>{user.phone}</a>
          </p>
          <p className={styles.albums}>
            <Link to={this.props.match.url + '/albums'}>Albums</Link>
          </p>
        </div>
      </div>;

    let user = <h2 style={{textAlign: 'center'}}>No user found.</h2>;

    if (this.props.loading) {
      user = <h2 style={{textAlign: 'center'}}>Loading...</h2>;
    } else if (this.state.user) {
      user = returnUserMarkup(this.state.user);
    } else if (this.props.user) {
      user = returnUserMarkup(this.props.user);
    } else if (this.props.error) {
      user = <ErrorCode error={this.props.error} />;
    }

    return (
      <div className={styles.user}>
        {user}
        <Route path={'/users/:id/albums'} component={Albums} />
      </div>
    )
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(User);
