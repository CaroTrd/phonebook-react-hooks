let contact = JSON.parse(localStorage.getItem("contact"));
const initialState = contact;
const contacts = (state = initialState, action) => {
  switch (action.type) {
    case "SAVECONTACTS":
      if (action.payload !== undefined) {
        localStorage.setItem("contact", JSON.stringify(action.payload));
        return [...action.payload];
      }
      break;
    default:
      return state;
  }
};

export default contacts;
