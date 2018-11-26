import React from 'react';
import './styles.css';

const Button = ({className, text, type}) => {
  return (
    <button className={"button " + className} type={type}>
      <svg className="button__icon icon icon--search" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.4 19.6l-4.8-4.8c.9-1.4 1.4-3 1.4-4.8 0-5-4-9-9-9s-9 4-9 9 4 9 9 9c1.8 0 3.4-.5 4.8-1.4l4.8 4.8c.4.4.9.6 1.4.6 1.1 0 2-.9 2-2 0-.6-.2-1.1-.6-1.4zM5 10c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z"/></svg>
      <span className="button__text">{text}</span>
    </button>
  )
};

export default Button;