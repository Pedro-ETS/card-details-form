import React from "react";
import iconComplete from "../../images/icon-complete.svg";

const SuccessContainer = () => {
  return (
    <div className="successContainer">
      <img src={iconComplete} className="successContainer__img" />
      <p className="successContainer__messageOne">Gracias :)</p>
      <p className="successContainer__messageTow">
        Detalles de la tarjeta agregados
      </p>
      <button className="successContainer__confirm">Confirmar</button>
    </div>
  );
};

export default SuccessContainer;
