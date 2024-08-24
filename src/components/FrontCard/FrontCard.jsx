import React from 'react';

const FrontCard = ({ cardNumberData, cardHolder, expiryMonth, expiryYear }) => {

  const formatCardNumber = (number) => {
    // Elimina todos los espacios y caracteres no numéricos
    const cleaned = ('' + number).replace(/\D/g, '');
    // Divide el número en grupos de 4 dígitos y los une con un espacio
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : number;
  };

  const expiryDate = `${expiryMonth}/${expiryYear}`;; 

  const formattedCardNumber = formatCardNumber(cardNumberData);
  return (
    <div className="frontCard">
       <div className="frontCard__logo"></div>
      <div className="frontCard__number">{formattedCardNumber}</div>
      <div className="frontCard__details">
        <div className="frontCard__holder">{cardHolder}</div>
        <div className="frontCard__expiry">{expiryDate}</div>
      </div>
    </div>
  );
};


export default FrontCard;