import React, {Component} from 'react';
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
  cheapest,
  SORTBY_CHEAPEST,
} from '../../helpers.js';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cheapGraph: [],
      fastGraph: [],
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
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const {deals, currency} = response;
    const options = deals.reduce(reduceOptions, []).filter(filterOptions);

    this.setState({
      cheapGraph: makeGraph(deals, cheapest),
      fastGraph: makeGraph(deals, fastest),
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
    this.setState(({departure, arrival, sortBy, fastGraph, cheapGraph}) => {
      const graph = SORTBY_CHEAPEST === sortBy ? cheapGraph : fastGraph;
      console.log(cheapGraph, fastGraph);return;
      const {path, total} = shortestPath(graph, departure,  arrival);

      return {
        items: path,
        total: total,
        isLoading: false,
      };
    });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {items, currency, options, departure, arrival, sortBy, total, isLoading} = this.state;
    const {handleChange, handleSubmit} = this;

    return (
      <div className="app container">
        <Header 
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          departure={departure}
          arrival={arrival}
          sortBy={sortBy}
          options={options}
        />
        <main className="app__main">
          <List items={items} total={total} currency={currency} isLoading={isLoading}/>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
