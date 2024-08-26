import React, { useState, useEffect } from "react";

const CardDetailsForm = ({handleAddDataCard, handleShowSuccessfulComponent,}) => {
  const [cardName, setcardName] = useState(null);
  const [cardNumbers, setcardNumbers] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [isExpiredErrorVisible, setIsExpiredErrorVisible] = useState(false);
  const [cardNumberErrorVisible, setCardNumberErrorVisible] = useState(false);
  const [cardCvcErrorVisible, setCardCvcErrorVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardName") setcardName(value);
    if (name === "numberCard") setcardNumbers(value);
    if (name === "monthCard") setMonth(value);
    if (name === "yearCard") setYear(value);
    if (name === "cvcCard") setCvc(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddDataCard(cardName, cardNumbers, month, year, cvc);
    handleShowSuccessfulComponent();
  };

  useEffect(() => {
    if (year !== null || month !== null) {
      // Asegúrate de que month y year sean números
      const numericYear = parseInt(year, 10);
      const numericMonth = parseInt(month, 10);
      // Año o mes fuera de rango
      if (
        numericYear < 0 ||
        numericYear > 99 ||
        numericMonth < 1 ||
        numericMonth > 12
      ) {
        setIsExpiredErrorVisible(true);
        return;
      }
      // Convertir el año de dos dígitos a cuatro dígitos
      const currentYear = new Date().getFullYear();
      const fullYear =
        numericYear >= 0 && numericYear <= 99
          ? currentYear - (currentYear % 100) + numericYear
          : numericYear;
      // Obtener la fecha actual
      const currentDate = new Date();
      const currentYearFull = currentDate.getFullYear();
      const currentMonth = new Date().getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre)
      // Crear una fecha para la tarjeta
      const cardExpirationDate = new Date(fullYear, numericMonth - 1);
      // Comparar la fecha de expiración con la fecha actual
      if (cardExpirationDate < new Date(currentYearFull, currentMonth - 1)) {
        setIsExpiredErrorVisible(true); // La tarjeta está expirada
      } else {
        setIsExpiredErrorVisible(false); // La tarjeta no está expirada
      }
    }

    if (cardNumbers.length > 0) {
      const isValidLength = cardNumbers.length !== 16;
      setCardNumberErrorVisible(isValidLength );
    }

    if (cvc.length > 0) {
      setCardCvcErrorVisible(cvc.length !== 3);
    }
    setButtonDisabled(
      cardNumbers.length == 16 &&
        cvc.length == 3 &&
        month.length > 0 &&
        year.length > 0 &&
        !isExpiredErrorVisible
    );
  }, [cardNumbers, year, month, cvc, isExpiredErrorVisible]);

  return (
    <form className="cardDetailsForm" onSubmit={handleSubmit}>
      <div className="nameContainer">
        <h1 className="nameContainer__name">Titular de tarjeta</h1>
        <input
          className="nameContainer__name-input"
          placeholder="Ingrese nombre del titular"
          name="cardName"
          onChange={handleChange}
        ></input>
      </div>
      <div className="numberContainer">
        <h1 className="numberContainer__numberCard">Numero de tarjeta</h1>
        <input
          className="numberContainer__numberCard-input"
          placeholder="Ingrese numero de tarjeta"
          type="number"
          name="numberCard"
          onChange={handleChange}
        ></input>
        <span
          className={`numberContainer__numberCard-input-error  ${
            cardNumberErrorVisible
              ? "numberContainer__numberCard-input-error_active"
              : ""
          }`}
        >
          16 caracteres minimo
        </span>
      </div>
      <div className="dateContainer">
        <h3 className="dateContainer__data">EXP. FECHA (MM/YY)</h3>
        <input
          className="dateContainer__data-mes-input"
          placeholder="MM"
          type="number"
          name="monthCard"
          maxLength={2}
          required
          onChange={handleChange}
        ></input>
        <input
          className="dateContainer__data-año-input"
          placeholder="YY"
          type="number"
          name="yearCard"
          maxLength={2}
          required
          onChange={handleChange}
        ></input>
        <span
          className={`dateContainer__data-input-error  ${
            isExpiredErrorVisible
              ? "dateContainer__data-input-error_active"
              : ""
          }`}
        >
          fecha incorrecta
        </span>
      </div>
      <div className="cvcContainer">
        <p className="cvcContainer__label">CVC</p>
        <input
          className="cvcContainer__input"
          placeholder="Ingrese el cvc"
          type="number"
          name="cvcCard"
          onChange={handleChange}
        ></input>
        <span
          className={`cvcContainer__input-error  ${
            cardCvcErrorVisible ? "cvcContainer__input-error_active" : ""
          }`}
        >
          3 digitos
        </span>
      </div>
      <button
        className={`cardDetailsForm__btnConfirm  ${
          buttonDisabled ? "" : "cardDetailsForm__btnConfirm_disabled"
        }`}
      >
        confirmar
      </button>
    </form>
  );
};

export default CardDetailsForm;
