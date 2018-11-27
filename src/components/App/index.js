import React, { Component } from 'react';
import './styles.css';
import response from '../../fixtures/response.json';
import Header from '../Header';
import Footer from '../Footer';
import List from '../List';

import {
  reduceOptions,
  filterOptions,
  shortestPath,
  makeGraph,
  fastest,
  SORTBY_CHEAPEST,
} from '../../helpers.js';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      options: [],
      currency: "$",
      departure: '',
      arrival: '',
      sortBy: SORTBY_CHEAPEST,
      isLoading: false,
      total: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReponse = this.handleReponse.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
  }

  componentDidMount() {
    let {deals, currency} = response;
    var options = deals.reduce(reduceOptions, []).filter(filterOptions);

    this.setState({
      options: options,
      currency: currency,
      isLoading: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({isLoading: true});
    setTimeout(this.handleReponse, Math.max(300, Math.random()*1000));
  }

  handleReponse() {
    const {deals} = response;

    this.setState(state => {
      var res = shortestPath(deals, state.departure, state.arrival, state.sortBy);
      
      return {
        items: res.path,
        total: res.total,
        isLoading: false,
      };
    });
  }

  handleToChange(e) {
    this.setState({arrival: e.target.value});

    console.log( 
      makeGraph(response.deals, fastest)
    );
    
  }

  handleFromChange(e) {
    this.setState({departure: e.target.value});
  }

  handleSortByChange(e) {
    this.setState({sortBy: e.target.value});
  }

  render() {
    var {items, currency, options, departure, arrival, sortBy, total} = this.state;

    return (
      <div className="app container">
        <Header 
          handleSubmit={this.handleSubmit}
          handleToChange={this.handleToChange}
          handleFromChange={this.handleFromChange}
          handleSortByChange={this.handleSortByChange}
          departure={departure}
          arrival={arrival}
          sortBy={sortBy}
          options={options}
        />
        <main className="app__main">
          <List items={items} total={total} currency={currency} isLoading={this.state.isLoading}/>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
