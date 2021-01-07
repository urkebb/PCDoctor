import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import {AuthContext} from '../../context/auth-context';


import './NavLinks.css';

const NavLinks = props => {
const auth = useContext(AuthContext);

  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>Svi korisnici</NavLink>
    </li>
    {auth.isLoggedIn && (
    <li>
      <NavLink to="/u1/postovi">Moji postovi</NavLink>
    </li>
    )}
    {auth.isLoggedIn && (
    <li>
      <NavLink to="/post/new">Dodaj post</NavLink>
    </li>
     )}
      {!auth.isLoggedIn && (
    <li>
      <NavLink to="/auth">Autentifikacija</NavLink>
    </li>
     )}
     {auth.isLoggedIn &&(
       <li>
        <button className="logout" onClick={auth.logout}>Logout</button>
        </li> 
     )}
     
  </ul>
};

export default NavLinks;