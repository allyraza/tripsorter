import React from 'react';
import './styles.css';
import Card from '../Card';
import CardEmpty from '../CardEmpty';
import {formatCurrency} from '../../helpers.js'; 

const List = ({
  items, 
  currency, 
  cost, 
  duration, 
  departure, 
  arrival, 
  isLoading, 
  handleReset
}) => {

  const amount = formatCurrency(cost, currency);

  return (
    <section className="list">
      <div className="list__body">
        {!items.length && <CardEmpty text={"Please enter a term to search."} isLoading={isLoading}/>}
        {!!items.length && items.map((item, i) => <Card key={i} currency={currency} className="list__card" item={item}/>)}
      </div>

      {!!departure && !!arrival && !!cost && !!duration && <footer className="list__footer">
        <article className="card">
          <div className="card__body">
            <strong>Total</strong> 
            <span>{duration.h}h{!!duration.m && duration.m}</span>
            <strong>{amount}</strong>
          </div>
        </article>
      </footer>}

      {!!items.length && <div className="card">
      <button className="button button--block" onClick={handleReset}>
        <svg className="button__icon icon icon--refresh" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.3 3.7l-1.9 1.9c-3.5-3.5-9.2-3.5-12.7 0s-3.5 9.2 0 12.7c1.7 1.8 4 2.7 6.3 2.7s4.6-.9 6.4-2.6c.8-.8.8-2 0-2.8s-2-.8-2.8 0c-1.9 2-5.1 1.9-7.1 0-1-1-1.5-2.3-1.5-3.6s.5-2.6 1.5-3.5c1.9-2 5.1-2 7.1 0l-1.8 1.8c-.6.6-.2 1.7.7 1.7H21c.6 0 1-.4 1-1V4.4c0-.9-1.1-1.3-1.7-.7z"/></svg>
        Reset
      </button>
      </div>}
    </section>
  );
};

export default List;
