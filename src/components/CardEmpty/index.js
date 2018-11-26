import React from 'react';
import Loader from '../Loader';

const Card = ({isLoading, text, loaderText}) => {
	return (
		<article className="card card--empty">
      <div className="card__body">
        {!!isLoading && <Loader/>}
        {!isLoading && <p className="card__text">{text}</p>}
    	</div>
		</article>
	);
};

export default Card;
