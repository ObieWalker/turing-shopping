import actionTypes from '../constants/actionTypes';

const initialShippingState = {
  shippingRegions: [],
  shippingDetails: {
    customer_id: null,
    name: "",
    email: "",
    address_1: "",
    address_2: "",
    city: "",
    region: "",
    postal_code: "",
    country: "",
    shipping_region_id: "",
    day_phone: "+351323213511235",
    eve_phone: "+452436143246123",
    mob_phone: "+351323213511235",
    credit_card: "XXXXXXXX5100"
  }
};

export const shipping = (state = initialShippingState, action) => {
  switch (action.type) {
    case actionTypes.GET_REGIONS_SUCCESS:
      return Object.assign({}, state, { shippingRegions: action.data.slice(1) });
    case actionTypes.GET_USER_DETAILS_SUCCESS:
      return Object.assign({}, state, { shippingDetails: action.data });
    default:
      return state;
  }
};
