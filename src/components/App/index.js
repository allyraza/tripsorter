import React, { Component } from 'react';
import './styles.css';
import response from '../../fixtures/response.json';
import Header from '../Header';
import Footer from '../Footer';
import List from '../List';
import {
  reduceOptions, 
  filterOptions
} from '../../helpers.js';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      options: [],
      currency: "$",
      isLoading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let {deals, currency} = response;
    var options = deals.reduce(reduceOptions, []).filter(filterOptions);

    this.setState({
      items: deals, 
      options: options,
      currency: currency,
      isLoading: false
    });
  }

  handleSubmit(e) {
    // body...
  }

  handleError(response) {
    if (!response.ok) {
      this.setState({isLoading: false});

      const error = Object.assign({}, response, {
        status: response.status,
        statusText: response.statusText,
      });

      return Promise.reject(error);
    }

    return response;
  }

  handleChange(e) {
    e.preventDefault()

    this.setState({username: e.target.value});
  }

  render() {
    var {items, currency, options} = this.state;

    return (
      <div className="app container">
        <Header handleSubmit={this.handleSubmit} handleChange={this.handleChange} options={options}/>
        <main className="app__main">
          <List items={items.slice(0, 10)} currency={currency} isLoading={this.state.isLoading}/>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
