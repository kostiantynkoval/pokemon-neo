import {
  GET_POKEMONS_REQUEST, GET_POKEMONS_SUCCESS, GET_POKEMONS_FAIL,
  GET_SINGLE_POKEMON_REQUEST, GET_SINGLE_POKEMON_SUCCESS, GET_SINGLE_POKEMON_FAIL,
  CLEAR_SINGLE_POKEMON_ERROR
} from '../actions/types'

export const initialState = {
  isLoading: false,
  pokemonList: [],
  singlePokemonDetails: {},
  page: 0,
  isError: false,
  isFetchingSinglePokemonError: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case GET_POKEMONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pokemonList: [...state.pokemonList, ...action.payload.pokemonList],
        page: action.payload.page,
        isError: false
      }
    case GET_POKEMONS_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case GET_SINGLE_POKEMON_REQUEST:
      return {
        ...state,
        singlePokemonDetails: {},
        isLoading: true,
        isFetchingSinglePokemonError: false
      }
    case GET_SINGLE_POKEMON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFetchingSinglePokemonError: false,
        singlePokemonDetails: action.payload
      }
    case GET_SINGLE_POKEMON_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetchingSinglePokemonError: true
      }
    case CLEAR_SINGLE_POKEMON_ERROR:
      return {
        ...state,
        isFetchingSinglePokemonError: false
      }
    default:
      return state
  }
}