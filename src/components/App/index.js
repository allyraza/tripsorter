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
  makeResult,
  fastest,
  cheapest,
  SORTBY_CHEAPEST,
} from '../../Helpers';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      options: [],
      currency: "USD",
      departure: '',
      arrival: '',
      cost: 0,
      duration: 0,
      sortBy: SORTBY_CHEAPEST,
      isLoading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReponse = this.handleReponse.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
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
      const {path} = shortestPath(graph, departure,  arrival);
      const {items, cost, duration} = makeResult(response.deals, path, arrival);

      return {
        items: items,
        cost: cost,
        duration: duration,
        isLoading: false,
      };
    });
  }

  handleReset(e) {
    this.setState({
      items: [],
      currency: "USD",
      departure: '',
      arrival: '',
      cost: 0,
      duration: 0,
      sortBy: SORTBY_CHEAPEST,
      isLoading: false,
    });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {items, currency, options, departure, arrival, sortBy, cost, duration, isLoading} = this.state;
    const {handleChange, handleSubmit, handleReset} = this;

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
          <List 
            items={items} 
            cost={cost}
            handleReset={handleReset}
            duration={duration}
            departure={departure}
            arrival={arrival}
            currency={currency} 
            isLoading={isLoading}
          />
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
