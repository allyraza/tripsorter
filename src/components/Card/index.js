import React from 'react';
import './styles.css';
// import Badge from '../Badge';
import {formatCurrency} from '../../helpers.js'; 


const Card = ({item, currency, className}) => {
  var cost = formatCurrency(item.cost, currency);

  return (
		<article className={"card " + className}>
			<div className="card__body">
        <div className="card__info">
          <h3 className="card__text"><span>{item}</span> > <span>{item}</span></h3>
          <p>Cost: {cost}</p>
          <p>Duration: {parseInt(item.duration.h)} hours {parseInt(item.duration.m)} minutes</p>
        </div>
			</div>
		</article>
	);
};

export default Card;