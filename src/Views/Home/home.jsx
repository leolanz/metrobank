import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import HomeTemplate from "../../templates/HomeTemplate/homeTemplate";
import "./home.scss";
import { Button } from "@material-ui/core";
const Home = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleSubmit = () => {
    // Validar campos
    if (!email) {
      setEmailError(true);
    } else if (!isValidEmail(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!phone) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }

    if (email && phone && !emailError && !phoneError) {
      const params = `email=${email}&phone=+507${phone}`;
      history.push(`/BEN/selfie?${params}`);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    setPhone(phoneNumber);
    setPhoneError(false);

    if (phoneNumber.length !== 8) {
      setPhoneError(true);
    }
  };
  const isValidEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <HomeTemplate></HomeTemplate>
      <div className="input-home">
        <div>
          <p className="cuenta">Ya tienes cuenta?</p>
        </div>
        <div>
          <p className="empieza">Empieza ahora!</p>
        </div>
        <div className="cuadro-input">
          <input
            className={`input ${emailError ? "error" : ""}`}
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && (
            <p className="error-message">
              {email
                ? "Formato de correo inválido"
                : "Debe completar el campo de correo"}
            </p>
          )}
          <div className="tel">
            <div className="numero">+507</div>
            <div>
              <input
                className={`input-tel ${emailError ? "error" : ""}`}
                placeholder="Teléfono"
                value={phone}
                maxLength={8}
                onChange={handlePhoneChange}
              />
            </div>
          </div>

          {phoneError && (
            <p className="error-message">
              {phone
                ? "Formato de teléfono debe contener 8 dígitos"
                : "Debe completar el campo de correo"}
            </p>
          )}
        </div>

        <Button className="button" onClick={handleSubmit}>
          Empezar
        </Button>
      </div>
    </>
  );
};

export default Home;
