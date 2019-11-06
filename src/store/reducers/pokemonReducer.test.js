import pokemonReducer from "./pokemonReducer";
import {getPokemonsRequested, getPokemonsSucceed, getPokemonsFailed} from "../actions/pokemonActions";
import {initialState} from "./pokemonReducer";
import {mockPokemonsList} from "../../__mocks__/mockData";

describe('Pokemon Reducer Testing', () => {
  describe('getPokemonsSucceed reducer testing', () => {
    
    const action = getPokemonsSucceed(1, mockPokemonsList.cards)
    const newState = pokemonReducer(initialState, action)
    
    test('fetched pokemons length should be 200 items', () => {
      expect(newState.pokemonList.length).toEqual(200)
    });
    
    test('third pokemon id equals ex8-26', () => {
      expect(newState.pokemonList[2].id).toEqual('ex8-26')
    });

    test('8th pokemon supertype equals Trainer', () => {
      expect(newState.pokemonList[7].supertype).toEqual('Trainer')
    });
  })
  
  describe('getPokemonsRequested action testing', () => {
    
    const action = getPokemonsRequested()
    const newState = pokemonReducer(initialState, action)
    
    test('isLoading should be true', () => {
      expect(newState.isLoading).toEqual(true)
    });
  })
  
  describe('getPokemonsFailed action testing', () => {
    
    const action = getPokemonsFailed()
    const newState = pokemonReducer(initialState, action)
    
    
    test('isLoading should be false', () => {
      expect(newState.isLoading).toEqual(false)
    });
  
    test('isError should be true', () => {
      expect(newState.isError).toEqual(true)
    });
  })
})