import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchPokemons} from '../../store/actions/pokemonActions'
import {Navbar, Spinner} from 'react-bootstrap'
import Card from '../common/Card'
import './styles.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderedPokemonList: [],
      currentBlock: 1,
      totalBlocks: 1
    }
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.props.fetchPokemons(1)
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  handleScroll = () => {
    /* -100 means height when we make a request */
    let domRect = document.body.getBoundingClientRect()
    if ((Math.abs(domRect.top) + window.innerHeight > domRect.height - 100) && !this.props.isLoading) {
      this.addItems()
    }
  }
  
  openDetails = id => {
    this.props.history.push(`/details/${id}`)
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.pokemonList !== this.props.pokemonList) {
      this.addItems()
    }
  }
  
  addItems = () => {
    const pokemonListCount = this.props.pokemonList.length
    const totalBlocks = Math.ceil(pokemonListCount / 20)
  
    if(pokemonListCount && !this.state.renderedPokemonList.length) {
      return this.setState({
        renderedPokemonList: this.props.pokemonList.slice(0, pokemonListCount > 20 * this.state.currentBlock ? 20 : pokemonListCount),
        totalBlocks
      })
    } else if(this.state.currentBlock < totalBlocks) {
      return this.setState(pS => {
        const increasedBlock = pS.currentBlock + 1
        return {
          currentBlock: increasedBlock,
          renderedPokemonList: this.props.pokemonList.slice(0, pokemonListCount > 20 * increasedBlock ? 20 * increasedBlock : pokemonListCount),
        }
      })
    } else if(this.state.currentBlock === totalBlocks && !this.props.isLastPage) {
      return this.props.fetchPokemons(+this.props.page + 1)
    }
  }
  
  render() {
    return (
      <div className="Dashboard">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            NeoPOKEDEX
          </Navbar.Brand>
        </Navbar>
        <div className="grid-container">
          {
            this.state.renderedPokemonList.map(pokemonCard => (
              <Card
                key={pokemonCard.id}
                onClicked={this.openDetails}
                pokemonCard={pokemonCard}
              />
            ))
          }
        </div>
        {
          this.props.isLoading && (
            <div className="Dashboard_Spinner">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
            
          )
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    pokemonList: state.PokemonReducer.pokemonList,
    isLoading: state.PokemonReducer.isLoading,
    isLastPage: state.PokemonReducer.isLastPage,
    page: state.PokemonReducer.page,
  }),
  dispatch => ({
    fetchPokemons: page => dispatch(fetchPokemons(page))
  })
)(Dashboard);