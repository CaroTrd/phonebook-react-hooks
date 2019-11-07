import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Popup from "../Popup/index";

const FormUpdateContact = props => {
  const [contacts, setContacts] = useState(props.contacts);
  const [contact, setContact] = useState({
    contact_id: "",
    firstname: "",
    lastName: "",
    phone: "",
    d: 0
  });
  const [errorContact, setErrorContact] = useState({
    errorFirstname: "",
    errorLastName: "",
    errorPhone: ""
  });
  const [message, setMessage] = useState("");

  const handleFirstnameChange = (e, id) => {
    setContact({ ...contact, firstname: e.target.value, id: id });
    if (!e.target.value || e.target.value.trim() === "") {
      setErrorContact({
        ...errorContact,
        errorFirstname: "Veuillez renseigner votre prénom"
      });
    } else if (!/^([a-zA-Zéèêëàâîïôöûü-].{2,150})$/gi.test(e.target.value)) {
      setErrorContact({
        ...errorContact,
        errorFirstname: "Veuillez rentrer un prénom valide"
      });
    } else {
      setErrorContact({ ...errorContact, errorFirstname: "" });
    }
  };

  const handleLastNameChange = (e, id) => {
    setContact({ ...contact, lastName: e.target.value, id: id });
    if (!e.target.value || e.target.value.trim() === "") {
      setErrorContact({
        ...errorContact,
        errorLastName: "Veuillez renseigner votre nom de famille"
      });
    } else if (!/^([a-zA-Zéèêëàâîïôöûü-].{2,150})$/gi.test(e.target.value)) {
      setErrorContact({
        ...errorContact,
        errorLastName: "Veuillez rentrer un nom valide"
      });
    } else {
      setErrorContact({ ...errorContact, errorLastName: "" });
    }
  };

  const handleTelNumberChange = (e, id) => {
    setContact({ ...contact, phone: e.target.value, id: id });
    if (!e.target.value || e.target.value.trim() === "") {
      setErrorContact({
        ...errorContact,
        errorPhone: "Veuillez renseigner votre numéro de téléphone"
      });
    } else if (
      !/^((\+)[0-9]{2,3}[ ][0-9]{2}[ ])[1-9]{6,}$/gi.test(e.target.value)
    ) {
      setErrorContact({
        ...errorContact,
        errorPhone: "Veuillez respecter le format (+39 02 xxxxxxx )"
      });
    } else {
      setErrorContact({ ...errorContact, errorPhone: "" });
    }
  };

  useEffect(() => {
    setContacts(props.contacts);
  }, [contacts]);

  const handleSubmit = id => {
    fetch("/api/edit-contact", {
      method: "PUT",
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
        {contacts.map((person, index) => {
          const id = Number(props.match.params.id);
          if (person.contact_id === id) {
            return (
              <ul key={index || person.contact_id} className="form-nav">
                <li>
                  <input
                    type="tel"
                    placeholder={person.firstname}
                    onChange={e => handleFirstnameChange(e, person.contact_id)}
                    className="input-form"
                  />
                  {errorContact.errorFirstname}
                </li>
                <li>
                  <input
                    type="text"
                    placeholder={person.last_name}
                    onChange={e => handleLastNameChange(e, person.contact_id)}
                    className="input-form"
                  />
                  {errorContact.errorLastName}
                </li>
                <li>
                  <input
                    type="tel"
                    placeholder={person.phone}
                    onChange={e => handleTelNumberChange(e, person.contact_id)}
                    className="input-form"
                  />
                  {errorContact.errorPhone}
                </li>
              </ul>
            );
          }
        })}
      </nav>
      <Popup
        nameOpenPopupBtn="Save"
        handleSubmitFetch={() => handleSubmit()}
        messageFetch={message}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    contacts: state.contacts
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(FormUpdateContact)
);
