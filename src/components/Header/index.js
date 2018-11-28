import React from 'react';
import './styles.css';
import Logo from '../Logo';
import Button from '../Button';
import {
  SORTBY_FASTEST,
  SORTBY_CHEAPEST,
} from '../../helpers.js';

const Header = ({
  handleChange,
  handleSubmit,
  departure,
  arrival,
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
          <select className="search__input" name="departure" value={departure} onChange={handleChange}>
            <option value="" disabled>From</option>
            {!!options && options.map((o, i) => <option value={o} key={i}>{o}</option>)}
          </select>
          <select className="search__input" name="arrival" value={arrival} onChange={handleChange} placeholder="To">
            <option value="" disabled>To</option>
            {!!options.length && options.map((o, i) => <option value={o} key={i}>{o}</option>)}
          </select>

          <div className="button-group search__switch">
            <label className={"search__label button button--small " + (SORTBY_CHEAPEST === sortBy ? "" : "button--outline")} htmlFor="cheapest">
              <input className="search__radio" type="radio" name="sortBy" id="cheapest" onChange={handleChange} value="cheapest" checked={SORTBY_CHEAPEST === sortBy}/>
              Cheapest
            </label>
            <label className={"search__label button button--small " + (SORTBY_FASTEST === sortBy ? "" : "button--outline")} htmlFor="fastest">
              <input className="search__radio" type="radio" name="sortBy" id="fastest" onChange={handleChange} value="fastest" checked={SORTBY_FASTEST === sortBy}/>
              Fastest
            </label>
          </div>

          <Button className="button--block search__button" text="Search"/>
        </form>
      </div>
		</header>
	);
};

export default Header;
