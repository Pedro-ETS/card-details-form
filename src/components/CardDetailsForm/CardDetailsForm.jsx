import React, { useState, useEffect } from "react";

const CardDetailsForm = ({
  handleAddDataCard,
  handleShowSuccessfulComponent,
}) => {
  const [cardName, setcardName] = useState("");
  const [cardNameTouched, setCardNameTouched] = useState(false);
  const [cardNumbers, setcardNumbers] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [isExpiredErrorVisible, setIsExpiredErrorVisible] = useState(false);
  const [cardNumberErrorVisible, setCardNumberErrorVisible] = useState(false);
  const [cardNameErrorVisible, setCardNameErrorVisible] = useState(false);
  const [cardCvcErrorVisible, setCardCvcErrorVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handlers = {
    cardName: setcardName,
    numberCard: setcardNumbers,
    monthCard: setMonth,
    yearCard: setYear,
    cvcCard: setCvc,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (handlers[name]) handlers[name](value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddDataCard(cardName, cardNumbers, month, year, cvc);
    handleShowSuccessfulComponent();
  };

  useEffect(() => {
    const soloLetras = /^[A-Za-z\s]+$/.test(cardName);
    if (cardNameTouched) {
      const soloLetras = /^[A-Za-z\s]+$/.test(cardName);
      if (cardName.trim() === "" || !soloLetras) {
        setCardNameErrorVisible(true);
      } else {
        setCardNameErrorVisible(false);
      }
    }
    if (year !== null || month !== null) {
      const numericYear = parseInt(year, 10);
      const numericMonth = parseInt(month, 10);
      if (
        numericYear < 0 ||
        numericYear > 99 ||
        numericMonth < 1 ||
        numericMonth > 12
      ) {
        setIsExpiredErrorVisible(true);
        return;
      }
      const currentYear = new Date().getFullYear();
      const fullYear =
        numericYear >= 0 && numericYear <= 99
          ? currentYear - (currentYear % 100) + numericYear
          : numericYear;
      const currentDate = new Date();
      const currentYearFull = currentDate.getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const cardExpirationDate = new Date(fullYear, numericMonth - 1);
      if (cardExpirationDate < new Date(currentYearFull, currentMonth - 1)) {
        setIsExpiredErrorVisible(true); 
      } else {
        setIsExpiredErrorVisible(false); 
      }
    }

    if (cardNumbers.length > 0) {
      const isValidLength = cardNumbers.length !== 16;
      setCardNumberErrorVisible(isValidLength);
    }

    if (cvc.length > 0) {
      setCardCvcErrorVisible(cvc.length !== 3);
    }
    setButtonDisabled(
      cardName.length>0 &&
      cardNumbers.length == 16 &&
        cvc.length == 3 &&
        month.length > 0 &&
        year.length > 0 &&
        !isExpiredErrorVisible
    );
  }, [cardName,cardNameTouched, cardNumbers, year, month, cvc, isExpiredErrorVisible]);

  return (
    <form className="cardDetailsForm" onSubmit={handleSubmit}>
      <div className="nameContainer">
        <h1 className="nameContainer__nameCard">Titular de tarjeta</h1>

        <input
          className="nameContainer__nameCard-input"
          placeholder="Ingrese nombre del titular"
          name="cardName"
          onChange={handleChange}
          onBlur={() => setCardNameTouched(true)}
        ></input>
        <span
          className={`nameContainer__nameCard-input-error ${
            cardNameErrorVisible
              ? "nameContainer__nameCard-input-error_active"
              : ""
          }`}
        >
          Solo letras / campo requerido
        </span>
      </div>
      <div className="numberContainer">
        <h1 className="numberContainer__numberCard">Numero de tarjeta</h1>
        <input
          className="numberContainer__numberCard-input"
          placeholder="Ingrese numero de tarjeta"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
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
