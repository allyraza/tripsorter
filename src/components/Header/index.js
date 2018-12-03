import React from 'react';
import './styles.css';
import Logo from '../Logo';
import Button from '../Button';
import {
  SORTBY_FASTEST,
  SORTBY_CHEAPEST,
} from '../../Helpers';

const Header = ({
  handleChange,
  handleSubmit,
  departure,
  arrival,
  sortBy,
  options
}) => {

  const icon = <svg className="button__icon icon icon--search" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.4 19.6l-4.8-4.8c.9-1.4 1.4-3 1.4-4.8 0-5-4-9-9-9s-9 4-9 9 4 9 9 9c1.8 0 3.4-.5 4.8-1.4l4.8 4.8c.4.4.9.6 1.4.6 1.1 0 2-.9 2-2 0-.6-.2-1.1-.6-1.4zM5 10c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z"/></svg>

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

          <Button className="button--block search__button" icon={icon} text="Search"/>
        </form>
      </div>
		</header>
	);
};

export default Header;
