import React from 'react';
import styles from './Nav.module.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <NavLink activeClassName={styles.current} to="/home">Home</NavLink>
      <NavLink activeClassName={styles.current} to="/users">Users</NavLink>
      <NavLink activeClassName={styles.current} to="/albums">Albums</NavLink>
    </nav>
  );
};

export default Nav;
