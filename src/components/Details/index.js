import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {fetchSimilarPokemons} from '../../store/actions/similarPokemonActions'
import {Modal, Alert} from "react-bootstrap";
import Card from "../common/Card";
import ErrorAlert from "../common/ErrorAlert";
import Loading from "../common/Loading";
import './styles.css'

class Details extends Component{
  
  constructor(props) {
    super(props)
    this.state = {
      selected: {},
      similarPokemonsList: [],
      isAlertOpen: false
    }
  }
  
  componentDidMount() {
    const selected = this.props.pokemonList.find(pokemonItem => pokemonItem.id === this.props.location.pathname.slice(9))
    if (!!selected) {
      this.setState({
        selected
      }, this.getSimilarPokemons)
    } else {
      this.props.history.push('/not-found')
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
      `?hp=${minus10percent}&types=${types}&rarity=${rarity}`,
      `?hp=${plus10percent}&types=${types}&rarity=${rarity}`
    ], this.state.selected.id)
  }
  
  getTypes = () => this.state.selected.types.reduce((acc,type) => acc += ', ' + type)
  
  getAttacks = () => this.state.selected.attacks.reduce((acc,attack) => { return acc += attack.name + ', '}, '').slice(0,-2)
  
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
    details += !!this.state.selected.rarity ? `Rareness: ${this.state.selected.rarity}` : ''
    return details
  }
  
  componentDidUpdate(prevProps, prevState, s) {
    if(!prevProps.isError && this.props.isError && !prevState.isAlertOpen) {
      this.setState({isAlertOpen: true})
    }
  }
  
  closeAlert = () => this.setState({isAlertOpen: false})
  
  handleClose = () => this.props.history.push('/details')
  
  render() {
    const {selected} = this.state
    return (
      <Fragment>
      <Modal size="lg" show onHide={this.handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <div className="DetailsModal">
            <div className="mainBlock">
              <div className="mainBlock__image">
                <img src={selected.imageUrlHiRes} alt={selected.name}/>
              </div>
              <div className="mainBlock__description">
                <span className='mainBlock__description_name'>Name:</span>
                <span className='mainBlock__description_value'>{selected.name}</span>
                <span className='mainBlock__description_name'>Super type:</span>
                <span className='mainBlock__description_value'>{selected.supertype}</span>
                <span className='mainBlock__description_name'>Id:</span>
                <span className='mainBlock__description_value'>{selected.id}</span>
                <span className='mainBlock__description_name'>Series:</span>
                <span className='mainBlock__description_value'>{selected.series}</span>
                {
                  !!selected && !!selected.types && (
                    <Fragment>
                      <span className='mainBlock__description_name'>Types:</span>
                      <span className='mainBlock__description_value'>{this.getTypes()}</span>
                    </Fragment>
                  )
                }
                {
                  !!selected && !!selected.rarity && (
                    <Fragment>
                      <span className='mainBlock__description_name'>Rarity:</span>
                      <span className='mainBlock__description_value'>{selected.rarity}</span>
                    </Fragment>
                  )
                }
                <span className='mainBlock__description_name'>hp:</span>
                <span className='mainBlock__description_value'>{selected.hp}</span>
                {
                  !!selected && !!selected.attacks && (
                    <Fragment>
                      <span className='mainBlock__description_name'>Attacks:</span>
                      <span className='mainBlock__description_value'>{this.getAttacks()}</span>
                    </Fragment>
                  )
                }
                <span className='mainBlock__details-name'>Details</span>
                <span className='mainBlock__description_details-value'>{this.getDetails()}</span>
              </div>
            </div>
            <div className="similarPokemons_name">
              <span className='mainBlock__details-name' >Similar Pokemons</span>
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
    similarPokemonList: state.SimilarPokemonReducer.similarPokemonList,
    isError: state.SimilarPokemonReducer.isError,
    isLoading: state.SimilarPokemonReducer.isLoading,
  }),
  dispatch => ({
    fetchSimilarPokemons: (queries, curItemId) => dispatch(fetchSimilarPokemons(queries, curItemId))
  })
)(Details);