import React from 'react';
import {NavLink} from "react-router-dom";
import './styles.css'

const NotFound = () => {
  return (
    <div className="NotFound">
      <h1>Nothing Found</h1>
      <NavLink to='/details'>Back to Pokemons</NavLink>
    </div>
  );
};

export default NotFound;