import React, {Component} from 'react';
import {connect} from 'react-redux'

class Details extends Component{
  
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    console.log('this.props.location.pathname.slice(9)', this.props.location.pathname.slice(9))
    console.log('this.props.pokemonList', this.props.pokemonList)
    const selected = this.props.pokemonList.find(pokemonItem => pokemonItem.id === this.props.location.pathname.slice(9))
    if (!!selected) {
      this.setState({
        selected
      })
    } else {
      this.props.history.push('/not-found')
    }
  }
  
  render() {
    return (
      <div>
        Details
      </div>
    );
  }
}

export default connect(
  state => ({
    pokemonList: state.PokemonReducer.pokemonList,
  })
)(Details);