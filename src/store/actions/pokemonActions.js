import {GET_POKEMONS_REQUEST, GET_POKEMONS_SUCCESS, GET_POKEMONS_FAIL} from './types'
import {fetchUrl} from '../../constants'

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

export const fetchPokemons = (page) => dispatch => {
  console.log('PAGE', page)
  dispatch(getPokemonsRequested())
  return fetch(`${fetchUrl}${page ? `?page=${page}&hp=120`:''}`)
    .then(res => res.json())
    .then(res => dispatch(getPokemonsSucceed(page, res.cards)))
    .catch(err => {
      console.log('Error while fetching data', err)
      dispatch(getPokemonsFailed())
    })
}