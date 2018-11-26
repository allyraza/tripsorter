import React from 'react';
import './styles.css';

const Badge = ({text}) => {
  return (
    <span className="badge">{text}</span>
  );
};

export default Badge;