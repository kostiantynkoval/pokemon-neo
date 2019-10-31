import React from 'react';
import './styles.css'

const Card = ({pokemonCard, onClicked}) => {
  return (
    <div onClick={() => onClicked(pokemonCard.id)} className="Item">
      <img src={pokemonCard[window.innerWidth > 799 ? 'imageUrl' : 'imageUrlHiRes']} alt={pokemonCard.name}/>
      <h4>
        {pokemonCard.name}
      </h4>
      <h5>
        {pokemonCard.supertype}
      </h5>
  
    </div>
  );
};

export default Card;