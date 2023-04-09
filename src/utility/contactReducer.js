export const initialContactState = {
  contactName: "",
  contactNumber: "",
  contactAddress: "",
};

export const contactReducer = (state = initialContactState, action) => {
  switch (action.type) {
    case "UPDATE_CONTACT":
      return { ...state, [action.field]: action.payload };
    case "RESET": {
      Object.keys(state).forEach((elm) => (state[elm] = ""));
      return state;
    }
    default:
      return state;
  }
};
