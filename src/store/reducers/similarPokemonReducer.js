import {GET_SIMILAR_POKEMONS_REQUEST, GET_SIMILAR_POKEMONS_SUCCESS, GET_SIMILAR_POKEMONS_FAIL} from '../actions/types'

const initialState = {
  isLoading: false,
  similarPokemonList: [],
  isError: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SIMILAR_POKEMONS_REQUEST:
      return {
        ...state,
        similarPokemonList: [],
        isLoading: true,
        isError: false
      }
    case GET_SIMILAR_POKEMONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        similarPokemonList: [...action.payload],
        isError: false
      }
    case GET_SIMILAR_POKEMONS_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      return state
  }
}