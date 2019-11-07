import pokemonReducer from "./pokemonReducer";
import {
  getPokemonsRequested,
  getPokemonsSucceed,
  getPokemonsFailed,
  getSinglePokemonRequested,
  getSinglePokemonSucceed,
  getSinglePokemonFailed,
  clearSinglePokemonError
} from "../actions/pokemonActions";
import {initialState} from "./pokemonReducer";
import {mockPokemonsList, mockSinglePokemonDetails} from "../../__mocks__/mockData";

describe('Pokemon Reducer Testing', () => {
  
  describe('getPokemonsRequested reducer testing', () => {
  
    const action = getPokemonsRequested(1, mockPokemonsList.cards)
    const newState = pokemonReducer(initialState, action)
  
    test('isLoading should be true', () => {
      expect(newState).toEqual({
        ...initialState,
        isLoading: true,
      })
    });
    
  })
  
  describe('getPokemonsSucceed reducer testing', () => {
    const oneStepBeforeState = {
      ...initialState,
      isLoading: true
    }
    const action = getPokemonsSucceed(2, mockPokemonsList.cards)
    const newState = pokemonReducer(oneStepBeforeState, action)
  
    test('fetched pokemons new state object', () => {
      expect(newState).toEqual({
        ...oneStepBeforeState,
        page: 2,
        pokemonList: mockPokemonsList.cards,
        isLoading: false
      })
    });
    
    test('fetched pokemons length should be 12 items', () => {
      expect(newState.pokemonList.length).toEqual(12)
    });
    
    test('third pokemon id equals ex8-26', () => {
      expect(newState.pokemonList[2].id).toEqual('ex8-26')
    });

    test('8th pokemon supertype equals Trainer', () => {
      expect(newState.pokemonList[7].supertype).toEqual('Trainer')
    });
  })
  
  describe('getPokemonsFailed action testing', () => {
  
    const oneStepBeforeState = {
      ...initialState,
      isLoading: true
    }
    const action = getPokemonsFailed()
    const newState = pokemonReducer(oneStepBeforeState, action)
    
    test('isLoading should be false and is Error should be true', () => {
      expect(newState).toEqual({
        ...oneStepBeforeState,
        isLoading: false,
        isError: true,
      })
    });
    
  })
  
  describe('getSinglePokemonRequested reducer testing', () => {
    
    const action = getSinglePokemonRequested()
    const newState = pokemonReducer(initialState, action)
    
    test('isLoading should be true, singlePokemonDetails should be empty object, isFetchingSinglePokemonError should be false', () => {
      expect(newState).toEqual({
        ...initialState,
        singlePokemonDetails: {},
        isLoading: true,
        isFetchingSinglePokemonError: false
      })
    });
    
  })
  
  describe('getSinglePokemonSucceed reducer testing', () => {
    
    const oneStepBeforeState = {
      ...initialState,
      isLoading: true
    }
    const action = getSinglePokemonSucceed(mockSinglePokemonDetails.card)
    const newState = pokemonReducer(oneStepBeforeState, action)
    
    test('fetched pokemon new state object', () => {
      expect(newState).toEqual({
        ...oneStepBeforeState,
        isLoading: false,
        isFetchingSinglePokemonError: false,
        singlePokemonDetails: mockSinglePokemonDetails.card
      })
    });
  })
  
  describe('getSinglePokemonFailed action testing', () => {
    const oneStepBeforeState = {
      ...initialState,
      isLoading: true
    }
    const action = getSinglePokemonFailed()
    const newState = pokemonReducer(oneStepBeforeState, action)
    
    test('isLoading should be false and is isFetchingSinglePokemonError should be true', () => {
      expect(newState).toEqual({
        ...oneStepBeforeState,
        isLoading: false,
        isFetchingSinglePokemonError: true
      })
    });
  })
  
  describe('clearSinglePokemonError action testing', () => {
    const oneStepBeforeState = {
      ...initialState,
      isFetchingSinglePokemonError: true
    }
    const action = clearSinglePokemonError()
    const newState = pokemonReducer(oneStepBeforeState, action)
    
    test('isLoading should be false and is isFetchingSinglePokemonError should be false', () => {
      expect(newState).toEqual({
        ...oneStepBeforeState,
        isFetchingSinglePokemonError: false
      })
    });
  })
})