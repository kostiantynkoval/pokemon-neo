import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import {
  GET_POKEMONS_REQUEST, GET_POKEMONS_SUCCESS, GET_POKEMONS_FAIL,
  GET_SINGLE_POKEMON_REQUEST, GET_SINGLE_POKEMON_SUCCESS, GET_SINGLE_POKEMON_FAIL,
} from './types'
import {fetchUrl, pageSize} from '../../constants'
import {mockPokemonsList, mockSinglePokemonDetails} from "../../__mocks__/mockData";
import {fetchPokemons, fetchSinglePokemon} from "./pokemonActions";
import {initialState} from "../reducers/pokemonReducer";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })
  
  describe('success async actions', () => {
    
    it('creates GET_POKEMONS_SUCCESS when fetching pokemons has been done', () => {
      fetchMock.getOnce(`${fetchUrl}?pageSize=${pageSize}&page=1`, {
        body: mockPokemonsList,
        headers: {'content-type': 'application/json'}
      })
      
      const expectedActions = [
        {type: GET_POKEMONS_REQUEST},
        {type: GET_POKEMONS_SUCCESS, payload: {pokemonList: mockPokemonsList.cards, page: 1}}
      ]
      const store = mockStore(initialState)
      
      return store.dispatch(fetchPokemons(1))
        .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      }).catch(() => {expect(store.getActions()).toEqual(expectedActions)})
    })
    
    it('creates GET_SINGLE_POKEMON_SUCCESS when fetching single pokemon details has been done', () => {
      fetchMock.getOnce(`${fetchUrl}/${'xy7-27'}`, {
        body: mockSinglePokemonDetails,
        headers: {'content-type': 'application/json'}
      })
      
      const expectedActions = [
        {type: GET_SINGLE_POKEMON_REQUEST},
        {type: GET_SINGLE_POKEMON_SUCCESS, payload: mockSinglePokemonDetails.card}
      ]
      const store = mockStore(initialState)
      
      return store.dispatch(fetchSinglePokemon('xy7-27')).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
  
  describe('failed async actions', () => {
    const initialState = {
      isLoading: false,
      pokemonList: [],
      singlePokemonDetails: {},
      page: 0,
      isError: false,
      isFetchingSinglePokemonError: false,
    }
    
    it('creates GET_POKEMONS_FAIL when fetching pokemons has been done unsuccessfully', () => {
      fetchMock.mock(`${fetchUrl}?pageSize=${pageSize}&page=1`, 500)
      
      const expectedActions = [
        {type: GET_POKEMONS_REQUEST},
        {type: GET_POKEMONS_FAIL}
      ]
      const store = mockStore(initialState)
      
      return store.dispatch(fetchPokemons(1)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
    
    it('creates GET_SINGLE_POKEMON_FAIL when fetching single pokemon details has been done', () => {
      fetchMock.getOnce(`${fetchUrl}/${'xy7-27WWWWW'}`, {
        body: {status: 404, error: "Not Found"},
        headers: {'content-type': 'application/json'}
      })
      
      const expectedActions = [
        {type: GET_SINGLE_POKEMON_REQUEST},
        {type: GET_SINGLE_POKEMON_FAIL}
      ]
      const store = mockStore(initialState)
      
      return store.dispatch(fetchSinglePokemon('xy7-27WWWWW')).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
  
})