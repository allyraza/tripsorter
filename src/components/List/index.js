import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import Card from '../Card';
import CardEmpty from '../CardEmpty';


const List = ({items, currency, isLoading}) => {
  return (
    <section className="list">
      <header className="list__header">
        {!!items.length && <h3 className="list__title"><strong>{items.length}</strong> {items.length > 1 ? "deals" : "deal"} found</h3>}
      </header>

      <div className="list__body">
        {!items.length && <CardEmpty text={"Please enter a term to search."} isLoading={isLoading}/>}
        {!!items.length && items.map((item, i) => <Card key={i} currency={currency} className="list__card" item={item}/>)}
      </div>
    </section>
  );
};

List.propTypes = {
  items: PropTypes.array
};

export default List;
