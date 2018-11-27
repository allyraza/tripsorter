import React from 'react';
import './styles.css';
import Logo from '../Logo';
import Button from '../Button';
import {
  SORTBY_FASTEST,
  SORTBY_CHEAPEST,
} from '../../helpers.js';

const Header = ({
  handleToChange, 
  handleFromChange, 
  handleSortByChange, 
  handleSubmit, 
  origin,
  destination,
  sortBy,
  options
}) => {

	return (
		<header className="app__header header">
      <div className="header__logo">
  	    <Logo/>
      </div>

      <div className="header__search">
        <form className="search" onSubmit={handleSubmit}>
          <select className="search__input" name="form" value={origin} onChange={handleFromChange}>
            <option value="" disabled>From</option>
            {!!options && options.map((o, i) => <option value={o} key={i}>{o}</option>)}
          </select>
          <select className="search__input" name="to" value={destination} onChange={handleToChange} placeholder="To">
            <option value="" disabled>To</option>
            {!!options.length && options.map((o, i) => <option value={o} key={i}>{o}</option>)}
          </select>
          
          <input type="radio" name="sortby" id="cheapest" onChange={handleSortByChange} value="cheapest" checked={SORTBY_CHEAPEST === sortBy}/>
          <label htmlFor="cheapest">Cheapest</label>
          <input type="radio" name="sortby" id="fastest" onChange={handleSortByChange} value="fastest" checked={SORTBY_FASTEST === sortBy}/>
          <label htmlFor="fastest">Fastest</label>
          <Button className="button--block search__button" text="Search"/>
        </form>
      </div>
		</header>
	);
};

export default Header;
