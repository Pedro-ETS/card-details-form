import React from 'react';

const BackCard = ({cardCvc}) => {
  return (
    <div className="backCard">
        <p className="backCard__cvc">{cardCvc}</p>
     
    </div>
  );
};

export default BackCard;