import React from 'react';
import './styles.css';
import {formatCurrency} from '../../helpers.js'; 


const Card = ({item, currency, className}) => {
  const cost = formatCurrency(item.cost, currency);
  const {departure, arrival, transport, reference, duration} = item;

  return (
		<article className={"card " + className}>
			<div className="card__body">
        <h3 className="card__title">{departure} > {arrival}</h3>
        <strong className="card__currency">{cost}</strong>
        <p className="card__text">{transport} {reference} for {duration.h}h{duration.m}</p>
			</div>
		</article>
	);
};

export default Card;