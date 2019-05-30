import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../store/actions/users";
import styles from "./Users.module.css";
import { NavLink } from "react-router-dom";
import ErrorCode from "../ErrorCode/ErrorCode";

function mapStateToProps(state) {
  return {
    users: state.usersReducer.users,
    error: state.usersReducer.usersError,
    loading: state.usersReducer.usersLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers())
  };
}

class Users extends Component {
  componentDidMount() {
    if (!this.props.users.length) {
      this.props.getUsers();
    }
  }

  render() {
    let users = <h2 style={{ textAlign: "center" }}>No users found.</h2>;

    if (this.props.loading) {
      users = <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    } else if (this.props.users.length) {
      users = (
        <Fragment>
          <h1 style={{ textAlign: "center" }}>Users list</h1>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td className={styles.name}>
                    <NavLink to={this.props.match.url + "/" + user.id}>
                      {user.name}
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      );
    } else if (this.props.error) {
      users = <ErrorCode error={this.props.error} />;
    }

    return <div className={styles.users}>{users}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
