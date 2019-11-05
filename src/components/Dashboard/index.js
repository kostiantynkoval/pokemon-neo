import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {fetchPokemons} from '../../store/actions/pokemonActions'
import {Navbar, Spinner, Alert} from 'react-bootstrap'
import Card from '../common/Card'
import ErrorAlert from '../common/ErrorAlert'
import Loading from '../common/Loading'
import './styles.css'
import Details from "../Details";
import {blockSize, pageSize} from "../../constants";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderedPokemonList: [],
      currentBlock: 1,
      totalBlocks: 1,
      isAlertOpen: false,
      areAllItemsFetched: false
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
  
  componentDidUpdate(prevProps, prevState, s) {
    if(prevProps.pokemonList !== this.props.pokemonList) {
      this.addItems()
      if(this.props.pokemonList.length - prevProps.pokemonList.length < pageSize) {
        this.setState({areAllItemsFetched: true})
      }
    }
    if(!prevProps.isError && this.props.isError && !prevState.isAlertOpen) {
      this.setState({isAlertOpen: true})
    }
  }
  
  addItems = () => {
    const pokemonListCount = this.props.pokemonList.length
    const totalBlocks = Math.ceil(pokemonListCount / blockSize)
  
    if(pokemonListCount && !this.state.renderedPokemonList.length) {
      return this.setState({
        renderedPokemonList: this.props.pokemonList.slice(0, pokemonListCount > blockSize * this.state.currentBlock ? blockSize : pokemonListCount),
        totalBlocks
      })
    } else if(this.state.currentBlock < totalBlocks) {
      return this.setState(pS => {
        const increasedBlock = pS.currentBlock + 1
        return {
          currentBlock: increasedBlock,
          renderedPokemonList: this.props.pokemonList.slice(0, pokemonListCount > blockSize * increasedBlock ? blockSize * increasedBlock : pokemonListCount),
        }
      })
    } else if(this.state.currentBlock === totalBlocks && !this.state.isAlertOpen && !this.state.areAllItemsFetched) {
      return this.props.fetchPokemons(+this.props.page + 1)
    }
  }
  
  closeAlert = () => this.setState({isAlertOpen: false})
  
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
            <Loading/>
          )
        }
        {
          this.state.isAlertOpen && (
            <ErrorAlert closeAlert={this.closeAlert} />
          )
        }
        <Route path="/details/:id" component={Details}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    pokemonList: state.PokemonReducer.pokemonList,
    isLoading: state.PokemonReducer.isLoading,
    page: state.PokemonReducer.page,
    isError: state.PokemonReducer.isError,
  }),
  dispatch => ({
    fetchPokemons: page => dispatch(fetchPokemons(page))
  })
)(Dashboard);