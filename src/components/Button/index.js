import React from 'react';
import './styles.css';

const Button = ({className, text, type, icon}) => {
  return (
    <button className={"button " + className} type={type}>
      {icon}
      <span className="button__text">{text}</span>
    </button>
  )
};

export default Button;