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
  SORTBY_CHEAPEST,
} from '../../helpers.js';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      options: [],
      currency: "$",
      origin: '',
      destination: '',
      sortBy: SORTBY_CHEAPEST,
      isLoading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({isLoading: true});
    setTimeout(this.handleReponse, Math.max(100, Math.random()*500));
  }

  handleReponse() {
    const {deals} = response;
    this.setState(state => ({
      items: shortestPath(deals, state.origin, state.destination, state.sortBy),
      isLoading: false,
    }));
  }

  handleToChange(e) {
    e.preventDefault();
    this.setState({destination: e.target.value});
  }

  handleFromChange(e) {
    e.preventDefault();
    this.setState({origin: e.target.value});
  }

  handleSortByChange(e) {
    e.preventDefault();
    this.setState({sortBy: e.target.value});
  }

  render() {
    var {items, currency, options, origin, destination, sortBy} = this.state;

    return (
      <div className="app container">
        <Header 
          handleSubmit={this.handleSubmit}
          handleToChange={this.handleToChange}
          handleFromChange={this.handleFromChange}
          handleSortByChange={this.handleSortByChange}
          origin={origin}
          destination={destination}
          sortBy={sortBy}
          options={options}
        />
        <main className="app__main">
          <List items={items.slice(0, 10)} currency={currency} isLoading={this.state.isLoading}/>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
