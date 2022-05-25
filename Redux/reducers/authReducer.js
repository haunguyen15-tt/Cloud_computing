import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOAD_PROFILE, LOG_OUT } from '../constants';

const initalState = {
  accessToken: null,
  user: null,
  loading: false,
};

export const authReducer = (prevState = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        accessToken: payload.token,
        loading: false,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...prevState,
        accessToken: null,
        loading: false,
        error: payload,
      };
    case LOAD_PROFILE:
      return {
        ...prevState,
        user: payload.data.user,
      };
    case LOG_OUT:
      return initalState;
    default:
      return prevState;
  }
};
