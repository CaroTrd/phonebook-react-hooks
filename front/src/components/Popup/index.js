import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const Popup = props => {
  const [isOpen, setIsOpen] = useState(false);

  const showPopup = () => {
    setIsOpen(true);
    props.handleSubmitFetch();
  };

  const handleClickYes = () => {
    props.history.push("/");
  };

  const handleClickNo = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button
        type="button"
        className="btn"
        onClick={() => showPopup()}
        disabled={props.disabled}
      >
        {props.nameOpenPopupBtn}
      </button>
      <div className={isOpen ? "popup" : " close"}>
        <h3>{props.messageFetch}</h3>
        <div className="button-groupe">
          <button className="cta" onClick={handleClickYes}>
            Go home page
          </button>
          <button className="cta" onClick={handleClickNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Popup);
