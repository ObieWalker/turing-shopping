import actionTypes from '../constants/actionTypes';

const initialUsersState = {
  error: null,
  user: {},
  authenticated: false
};

export const users = (state = initialUsersState, action) => {
  switch (action.type) {
    case actionTypes.SIGNING_IN_SUCCESS:
      return Object.assign({}, state, { user: action.data, authenticated: true }
      );
    case actionTypes.SIGNING_IN_FAILURE:
      return Object.assign({}, state);
    case actionTypes.REGISTER_SUCCESS:
      return Object.assign({}, state, { user: action.data, authenticated: true }
      );
    case actionTypes.REGISTER_FAILURE:
      return Object.assign({}, state);
    case actionTypes.LOGOUT_USER:
      return Object.assign({}, state, { user: action.data, authenticated: false }
      );
    default:
      return state;
  }
};
