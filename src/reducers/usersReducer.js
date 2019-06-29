import actionTypes from '../constants/actionTypes';

const initialUsersState = {
  error: null,
  user: {},
};

export const users = (state = initialUsersState, action) => {
  switch (action.type) {
    case actionTypes.SIGNING_IN_SUCCESS:
      return Object.assign({}, state, { user: action.data }
      );
    case actionTypes.SIGNING_IN_FAILURE:
      return Object.assign({}, state);
    case actionTypes.REGISTER_SUCCESS:
      return Object.assign({}, state, { user: action.data }
      );
    case actionTypes.REGISTER_FAILURE:
      return Object.assign({}, state);
    case actionTypes.LOGOUT_USER:
      return Object.assign({}, state, { user: action.data }
      );
    default:
      return state;
  }
};
