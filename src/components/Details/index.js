import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {fetchSimilarPokemons} from '../../store/actions/similarPokemonActions'
import {fetchSinglePokemon, clearSinglePokemonError} from '../../store/actions/pokemonActions'
import {Modal, Alert} from "react-bootstrap";
import Card from "../common/Card";
import ErrorAlert from "../common/ErrorAlert";
import Loading from "../common/Loading";
import ImgLoadingStub from "../common/ImgLoadingStub";
import DescriptionSection from "../common/DescriptionSection";
import './styles.css'

class Details extends Component{
  
  constructor(props) {
    super(props)
    this.state = {
      selected: {},
      similarPokemonsList: [],
      isAlertOpen: false,
    }
  }
  
  componentDidMount() {
    const selected = this.props.pokemonList.find(pokemonItem => pokemonItem.id === this.props.location.pathname.slice(9))
    if (!!selected) {
      this.setState({
        selected
      }, this.getSimilarPokemons)
    } else {
      if(this.props.match.params.id && this.props.match.params.id !== '') {
        this.props.fetchSinglePokemon(this.props.match.params.id)
      } else {
        this.props.history.push('/not-found')
      }
    }
  }
  
  getSimilarPokemons = () => {
    const types = this.state.selected.types ? this.state.selected.types.reduce((acc,type) => {
      return acc += '|' + type
    }) : ''
    const rarity = this.state.selected.rarity ? this.state.selected.rarity : ''
    const minus10percent = this.state.selected.hp && this.state.selected.hp.toLowerCase() !== 'none' ? `gte${+this.state.selected.hp * 0.9}` : ''
    const plus10percent = this.state.selected.hp && this.state.selected.hp.toLowerCase() !== 'none' ? `lte${+this.state.selected.hp * 1.1}` : ''
    this.props.fetchSimilarPokemons([
      `?hp=${minus10percent}&supertype=${this.state.selected.supertype}&types=${types}&rarity=${rarity}&pageSize=50`,
      `?hp=${plus10percent}&supertype=${this.state.selected.supertype}&types=${types}&rarity=${rarity}&pageSize=50`
    ], this.state.selected.id)
  }
  
  getTypes = () => this.state.selected.types.reduce((acc,type) => acc += ', ' + type)
  
  getAttacks = () => this.state.selected.attacks.reduce((acc,attack) => { return acc += attack.name + ', '}, '').slice(0,-2)
  
  getWeaknesses = () => this.state.selected.weaknesses.reduce((acc,weakness) => { return `${acc}${weakness.type}: ${weakness.value}; `}, '').slice(0,-2)
  
  getDetails = () => {
    if (!this.state.selected) {
      return ''
    }
    let details = ''
    details += !!this.state.selected.ability ? this.state.selected.ability.text : ''
    details += !!this.state.selected.attacks ? this.state.selected.attacks.reduce((acc, item) => {
      acc += item.text
      return acc + ' '
    }, '') : ''
    details += !!this.state.selected.rarity ? `Rarity: ${this.state.selected.rarity}` : ''
    return details
  }
  
  componentDidUpdate(prevProps, prevState, s) {
    if(!prevProps.isError && this.props.isError && !prevState.isAlertOpen) {
      this.setState({isAlertOpen: true})
    }
    if(!!prevProps.singlePokemonDetails && !prevProps.singlePokemonDetails.hasOwnProperty('id') && this.props.singlePokemonDetails.hasOwnProperty('id')) {
      this.setState({selected: this.props.singlePokemonDetails}, this.getSimilarPokemons)
    }
  }
  
  closeAlert = () => this.setState({isAlertOpen: false})
  
  handleClose = () => {
    if(this.props.isFetchingSinglePokemonError) {
      this.props.clearSinglePokemonError()
    }
    this.props.history.push('/details')
  }
  
  render() {
    console.log('PROPS DETAILS', this.props)
    const {selected} = this.state
    const details = this.getDetails()
    console.log('details', details)
    return (
      <Fragment>
      <Modal size="lg" show onHide={this.handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          {
            this.props.isFetchingSinglePokemonError ? (
              <ErrorAlert closeAlert={this.handleClose}/>
            ) : (
              <div className="DetailsModal">
                <div className="mainBlock">
                  <div className="mainBlock__image">
                    <ImgLoadingStub/>
                    <img src={selected.imageUrlHiRes} alt={selected.name}/>
                  </div>
                  <div className="mainBlock__description">
                    <DescriptionSection name="Name" value={selected.name}/>
                    <DescriptionSection name="Super type" value={selected.supertype}/>
                    <DescriptionSection name="Subtype" value={selected.subtype}/>
                    <DescriptionSection name="Id" value={selected.id}/>
                    {
                      !!selected && !!selected.types && (
                        <DescriptionSection name="Types" value={this.getTypes()}/>
                      )
                    }
                    <DescriptionSection name="Series" value={selected.series}/>
                    {
                      !!selected && !!selected.rarity && (
                        <DescriptionSection name="Rarity" value={selected.rarity}/>
                      )
                    }
                    {
                      !!selected && !!selected.nationalPokedexNumber && (
                        <DescriptionSection name="National Pokedex Number" value={selected.nationalPokedexNumber}/>
                      )
                    }
                    <DescriptionSection name="Set" value={selected.set}/>
  
                    {
                      !!selected && !!selected.hp && (
                        <DescriptionSection name="hp" value={selected.hp}/>
                      )
                    }
                    {
                      !!selected && !!selected.attacks && (
                        <DescriptionSection name="Attacks" value={this.getAttacks()}/>
                      )
                    }
                    {
                      !!selected && !!selected.weaknesses && (
                        <DescriptionSection name="Weaknesses" value={this.getWeaknesses()}/>
                      )
                    }
                    {
                      !!selected && !!selected.evolvesFrom && (
                        <DescriptionSection name="Evolves from" value={selected.evolvesFrom}/>
                      )
                    }
                  </div>
                </div>
                {
                  !!details.trim() && (
                    <div className="mainBlock__details">
                      <div><span className='mainBlock__details-name'>Details</span></div>
                      <span className='mainBlock__description_details-value'>{details}</span>
                    </div>
                  )
                }
                <div className="similarPokemons_name">
                  <span className='mainBlock__details-name' >
                    {
                      !this.props.similarPokemonList.length && !this.props.isLoading && (
                        <span>No&nbsp;</span>
                      )
                    }
                    Similar Pokemons
                  </span>
                </div>
                <div className="similarPokemonsBlock">
                  {
                    this.props.similarPokemonList.map(item => <Card key={item.id} pokemonCard={item}/>)
                  }
                  {
                    this.props.isLoading && (
                      <Loading/>
                    )
                  }
                </div>
              </div>
            )
          }
          
        </Modal.Body>
        {
          this.state.isAlertOpen && (
            <ErrorAlert closeAlert={this.closeAlert}/>
          )
        }
      </Modal>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    pokemonList: state.PokemonReducer.pokemonList,
    singlePokemonDetails: state.PokemonReducer.singlePokemonDetails,
    isFetchingSinglePokemonError: state.PokemonReducer.isFetchingSinglePokemonError,
    similarPokemonList: state.SimilarPokemonReducer.similarPokemonList,
    isError: state.SimilarPokemonReducer.isError,
    isLoading: state.SimilarPokemonReducer.isLoading,
  }),
  dispatch => ({
    fetchSimilarPokemons: (queries, curItemId) => dispatch(fetchSimilarPokemons(queries, curItemId)),
    fetchSinglePokemon: id => dispatch(fetchSinglePokemon(id)),
    clearSinglePokemonError: () => dispatch(clearSinglePokemonError()),
  })
)(Details);