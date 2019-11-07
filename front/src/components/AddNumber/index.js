import React, { useState, useEffect, useCallback } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Popup from "../Popup/index";

const FormAddNumber = () => {
  const [contact, setContact] = useState({
    firstname: "",
    lastName: "",
    phone: ""
  });
  const [errorContact, setErrorContact] = useState({
    errorFirstname: "",
    errorLastName: "",
    errorPhone: ""
  });
  const [boolContact, setBoolContact] = useState({
    boolFirst: false,
    boolLast: false,
    boolPhone: false
  });
  const [buttonBool, setButtonBool] = useState(true);
  const [message, setMessage] = useState("");

  const handleFirstnameChange = e => {
    setContact({ ...contact, firstname: e.target.value });
    if (!e.target.value || e.target.value.trim() === "") {
      setErrorContact({
        ...errorContact,
        errorFirstname: "Veuillez renseigner votre prénom"
      });
      setBoolContact({ ...boolContact, boolFirst: false });
    } else if (!/^([a-zA-Zéèêëàâîïôöûü-].{2,150})$/gi.test(e.target.value)) {
      setErrorContact({
        ...errorContact,
        errorFirstname: "Veuillez rentrer un prénom valide"
      });
      setBoolContact({ ...boolContact, boolFirst: false });
    } else {
      setErrorContact({ ...errorContact, errorFirstname: "" });
      setBoolContact({ ...boolContact, boolFirst: true });
    }
    conditionBool();
  };

  const handleLastNameChange = e => {
    setContact({ ...contact, lastName: e.target.value });
    if (!e.target.value || e.target.value.trim() === "") {
      setErrorContact({
        ...errorContact,
        errorLastName: "Veuillez renseigner votre nom de famille"
      });
      setBoolContact({ ...boolContact, boolLast: false });
    } else if (!/^([a-zA-Zéèêëàâîïôöûü-].{2,150})$/gi.test(e.target.value)) {
      setErrorContact({
        ...errorContact,
        errorLastName: "Veuillez rentrer un nom valide"
      });
      setBoolContact({ ...boolContact, boolLast: false });
    } else {
      setErrorContact({ ...errorContact, errorLastName: "" });
      setBoolContact({ ...boolContact, boolLast: true });
    }
    conditionBool();
  };

  const handleTelNumberChange = e => {
    setContact({ ...contact, phone: e.target.value });
    if (!e.target.value || e.target.value.trim() === "") {
      setErrorContact({
        ...errorContact,
        errorPhone: "Veuillez renseigner votre numéro de téléphone"
      });
      setBoolContact({ ...boolContact, boolPhone: false });
    } else if (
      !/^((\+)[0-9]{2,3}[ ][0-9]{2}[ ])[1-9]{6,}$/gi.test(e.target.value)
    ) {
      setErrorContact({
        ...errorContact,
        errorPhone: "Veuillez respecter le format (+39 02 xxxxxxx )"
      });
      setBoolContact({ ...boolContact, boolPhone: false });
    } else {
      setErrorContact({ ...errorContact, errorPhone: "" });
      setBoolContact({ ...boolContact, boolPhone: true });
    }
    conditionBool();
  };

  const conditionBool = useCallback(() => {
    if (
      boolContact.boolFirst !== false &&
      boolContact.boolLast !== false &&
      boolContact.boolPhone !== false
    ) {
      setButtonBool(false);
    } else {
      setButtonBool(true);
    }
  }, [boolContact.boolFirst, boolContact.boolLast, boolContact.boolPhone]);

  useEffect(() => {
    conditionBool();
  }, [conditionBool]);

  const handleSubmit = () => {
    fetch("/api/add-new-contact", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        contact: contact
      })
    }).then(res => {
      if (res.status === 200) {
        setMessage("Votre contact a bien été enregistré");
      } else if (res.status === 500) {
        setMessage("Nous avons rencontré un problème lors de la sauvegarde.");
      }
    });
  };
  return (
    <div>
      <div className="container-form-link">
        <NavLink className="link-add" to="/">
          {`> Back to the home page`}
        </NavLink>
      </div>
      <nav className="container-form-nav">
        <ul className="form-nav">
          <li>
            <input
              type="text"
              placeholder="Firstname"
              onChange={e => handleFirstnameChange(e)}
              className="input-form"
            />
            {errorContact.errorFirstname}
          </li>
          <li>
            <input
              type="text"
              placeholder="Last name"
              onChange={e => handleLastNameChange(e)}
              className="input-form"
            />
            {errorContact.errorLastName}
          </li>
          <li>
            <input
              type="tel"
              placeholder="Phone Number"
              onChange={e => handleTelNumberChange(e)}
              className="input-form"
            />
            {errorContact.errorPhone}
          </li>
          <Popup
            nameOpenPopupBtn="Save"
            handleSubmitFetch={() => handleSubmit()}
            messageFetch={message}
            disabled={buttonBool}
          />
        </ul>
      </nav>
    </div>
  );
};

export default withRouter(FormAddNumber);
