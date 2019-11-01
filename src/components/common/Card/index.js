import React from 'react';
import './styles.css'

const Card = ({pokemonCard, onClicked}) => {
  return (
    <div onClick={() => typeof onClicked === 'function' ? onClicked(pokemonCard.id) : {}} className="Item">
      <img src={pokemonCard[window.innerWidth > 450 ? 'imageUrl' : 'imageUrlHiRes']} alt={pokemonCard.name}/>
      <span className="Item__name">
        {pokemonCard.name}
      </span>
      <span className="Item__description">
        {pokemonCard.supertype}
      </span>
  
    </div>
  );
};

export default Card;