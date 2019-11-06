import {
  GET_POKEMONS_REQUEST, GET_POKEMONS_SUCCESS, GET_POKEMONS_FAIL,
  GET_SINGLE_POKEMON_REQUEST, GET_SINGLE_POKEMON_SUCCESS, GET_SINGLE_POKEMON_FAIL,
  CLEAR_SINGLE_POKEMON_ERROR
} from './types'
import {fetchUrl, pageSize} from '../../constants'

export const getPokemonsRequested = () => ({
  type: GET_POKEMONS_REQUEST
})

export const getPokemonsSucceed = (page, pokemonList) => ({
  type: GET_POKEMONS_SUCCESS,
  payload: {pokemonList, page}
})

export const getPokemonsFailed = () => ({
  type: GET_POKEMONS_FAIL
})

export const getSinglePokemonRequested = () => ({
  type: GET_SINGLE_POKEMON_REQUEST
})

export const getSinglePokemonSucceed = pokemonDetails => ({
  type: GET_SINGLE_POKEMON_SUCCESS,
  payload: pokemonDetails
})

export const getSinglePokemonFailed = () => ({
  type: GET_SINGLE_POKEMON_FAIL
})

export const clearSinglePokemonError = () => ({
  type: CLEAR_SINGLE_POKEMON_ERROR,
})

export const fetchPokemons = page => dispatch => {
  dispatch(getPokemonsRequested())
  return fetch(`${fetchUrl}?pageSize=${pageSize}${page ? `&page=${page}`:''}`)
    .then(res => res.json())
    .then(res => dispatch(getPokemonsSucceed(page, res.cards)))
    .catch(err => dispatch(getPokemonsFailed()))
}

export const fetchSinglePokemon = id => dispatch => {
  dispatch(getSinglePokemonRequested())
  return fetch(`${fetchUrl}/${id}`)
    .then(res => res.json())
    .then(res => {
      if(!!res && !!res.card) {
        dispatch(getSinglePokemonSucceed(res.card))
      } else {
        dispatch(getSinglePokemonFailed())
      }
    })
    .catch(err => dispatch(getSinglePokemonFailed(err)))
}