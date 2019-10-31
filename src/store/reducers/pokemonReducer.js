import {GET_POKEMONS_REQUEST, GET_POKEMONS_SUCCESS, GET_POKEMONS_FAIL} from '../actions/types'

const initialState = {
  isLoading: false,
  pokemonList: [],
  page: 0,
  isLastPage: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case GET_POKEMONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pokemonList: [...state.pokemonList, ...action.payload.pokemonList],
        page: action.payload.page,
        isLastPage: action.payload.pokemonList.length < 100
      }
    case GET_POKEMONS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}