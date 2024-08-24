import { useState } from "react";
import "../App/App.css";
import FrontCard from "@components/FrontCard/FrontCard";
import BackCard from "@components/BackCard/BackCard";
import CardDetailsForm from "@components/CardDetailsForm/CardDetailsForm.jsx";
import SuccessContainer from "@components/SuccessContainer/SuccessContainer";

function App() {
  const [cardNumberData, setcardNumberData] = useState("0000 0000 0000 0000");
  const [cardNameData, setcardNameData] = useState("desconocido");
  const [cardMonth, setCardMonth] = useState("00");
  const [cardYear, setCardYear] = useState("00");
  const [cardCvc, setCardCvc] = useState("000");
  const [showSuccessfulComponent, setshowSuccessfulComponent] = useState(true);

  function handleAddDataCard(dataCardName, dataCardNumber, month, year, cvc) {
    setcardNameData(dataCardName);
    setcardNumberData(dataCardNumber);
    setCardMonth(month);
    setCardYear(year);
    setCardCvc(cvc);
  }

  function handleShowSuccessfulComponent() {
    setshowSuccessfulComponent(false);
  }

  return (
    <>
      <div className="page">
        <section className="cards-container">
          <FrontCard
            cardNumberData={cardNumberData}
            cardHolder={cardNameData}
            expiryMonth={cardMonth}
            expiryYear={cardYear}
          />
          <BackCard cardCvc={cardCvc} />
        </section>
        <section className="formContainer">
          {showSuccessfulComponent ? (
            <CardDetailsForm
              handleAddDataCard={handleAddDataCard}
              handleShowSuccessfulComponent={handleShowSuccessfulComponent}
            />
          ) : (
            <SuccessContainer />
          )}
        </section>
      </div>
    </>
  );
}

export default App;
