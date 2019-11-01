import {combineReducers} from 'redux'
import pokemonReducer from './pokemonReducer'
import similarPokemonReducer from './similarPokemonReducer'

export default combineReducers({
  PokemonReducer: pokemonReducer,
  SimilarPokemonReducer: similarPokemonReducer,
})