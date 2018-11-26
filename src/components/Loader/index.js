import React from 'react';
import './styles.css';

const Loader = ({text}) => {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
      {!!text && <p className="loader__text">{text}</p>}
    </div>
  );
};

export default Loader;