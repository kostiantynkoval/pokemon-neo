import {
  GET_SIMILAR_POKEMONS_REQUEST, GET_SIMILAR_POKEMONS_SUCCESS, GET_SIMILAR_POKEMONS_FAIL
} from './types'
import {fetchUrl} from '../../constants'

export const getSimilarPokemonsRequested = () => ({
  type: GET_SIMILAR_POKEMONS_REQUEST
})

export const getSimilarPokemonsSucceed = (pokemonList) => ({
  type: GET_SIMILAR_POKEMONS_SUCCESS,
  payload: pokemonList
})

export const getSimilarPokemonsFailed = (error) => ({
  type: GET_SIMILAR_POKEMONS_FAIL,
  payload: error
})

export const fetchSimilarPokemons = (queries, curItemId) => dispatch => {
  dispatch(getSimilarPokemonsRequested())
  const fetch1 = new Promise((resolve,reject) => {
    fetch(`${fetchUrl}${queries[0] ? queries[0] :''}`)
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
  
  const fetch2 = new Promise((resolve,reject) => {
    fetch(`${fetchUrl}${queries[1] ? queries[1] :''}`)
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
  
  return Promise.all([fetch1, fetch2])
    .then(res => {
      const ids = res[0].cards.map(item => item.id)
      const sameItems = res[1].cards.filter(item => ids.includes(item.id) && item.id !== curItemId).slice(0,3)
      dispatch(getSimilarPokemonsSucceed(sameItems))
    })
    .catch(err => dispatch(getSimilarPokemonsFailed(err)))
}