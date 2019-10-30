import React, {Component} from 'react';

class Dashboard extends Component {
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.windowHeight = window.innerHeight
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  handleScroll() {
    /* -100 means height when we make a request */
    let domRect = document.body.getBoundingClientRect()
    if (Math.abs(domRect.top) + window.innerHeight > domRect.height - 100) {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@пора ререндерить')
    }
  }
  
  render() {
    return (
      <div style={{height: 3000}}>
        Dashboard
      </div>
    );
  }
}

export default Dashboard;