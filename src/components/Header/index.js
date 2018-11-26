import React from 'react';
import './styles.css';
import Logo from '../Logo';
import Button from '../Button';

const Header = ({handleChange, handleSubmit, options}) => {
	return (
		<header className="app__header header">
      <div className="header__logo">
  	    <Logo/>
      </div>

      <div className="header__search">
        <form className="search" onSubmit={handleSubmit}>
          <select className="search__input" name="form" onChange={handleChange}>
            <option value="" disabled selected>From</option>
            {!!options && options.map((o, i) => <option value={o} key={i}>{o}</option>)}
          </select>
          <select className="search__input" name="to" onChange={handleChange} placeholder="To">
            <option value="" disabled selected>To</option>
            {!!options.length && options.map((o, i) => <option value={o} key={i}>{o}</option>)}
          </select>
          <Button className="button--block search__button" text="Search"/>
        </form>
      </div>
		</header>
	);
};

export default Header;
