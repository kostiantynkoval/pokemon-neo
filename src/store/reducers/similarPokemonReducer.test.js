import similarPokemonReducer from "./similarPokemonReducer";
import {getSimilarPokemonsRequested, getSimilarPokemonsSucceed, getSimilarPokemonsFailed} from "../actions/similarPokemonActions";
import {initialState} from "./similarPokemonReducer";
import {mockPokemonsList} from "../../__mocks__/mockData";

describe('SimilarPokemon Reducer Testing', () => {
  
  describe('getSimilarPokemonsRequested reducer testing', () => {
    
    const action = getSimilarPokemonsRequested()
    const newState = similarPokemonReducer(initialState, action)
    
    test('isLoading should be true, similarPokemonList should be empty array, isError should be false', () => {
      expect(newState).toEqual({
        ...initialState,
        similarPokemonList: [],
        isLoading: true,
        isError: false
      })
    });
  })
  
  describe('getSimilarPokemonsSucceed reducer testing', () => {
    
    const action = getSimilarPokemonsSucceed(mockPokemonsList.cards)
    const newState = similarPokemonReducer(initialState, action)
    
    test('fetched similar pokemons new state object', () => {
      expect(newState).toEqual({
        ...initialState,
        similarPokemonList: mockPokemonsList.cards,
        isLoading: false,
      })
    });
    
    test('fetched similar pokemons length should be 12 items', () => {
      expect(newState.similarPokemonList.length).toEqual(12)
    });
    
    test('third similar pokemon id equals ex8-26', () => {
      expect(newState.similarPokemonList[2].id).toEqual('ex8-26')
    });
    
    test('8th similar pokemon supertype equals Trainer', () => {
      expect(newState.similarPokemonList[7].supertype).toEqual('Trainer')
    });
  })
  
  describe('getSimilarPokemonsFailed action testing', () => {
    
    const action = getSimilarPokemonsFailed()
    const newState = similarPokemonReducer(initialState, action)
    
    test('isLoading should be false and is Error should be true', () => {
      expect(newState).toEqual({
        ...initialState,
        isLoading: false,
        isError: true,
      })
    });
    
  })
})