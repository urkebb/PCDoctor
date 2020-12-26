import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>Svi korisnici</NavLink>
    </li>
    <li>
      <NavLink to="/u1/postovi">Moji postovi</NavLink>
    </li>
    <li>
      <NavLink to="/post/new">Dodaj post</NavLink>
    </li>
    <li>
      <NavLink to="/auth">Autentifikacija</NavLink>
    </li>
  </ul>
};

export default NavLinks;