import requests from '../../Service/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'LOGIN_REQUEST',
    });

    const user = { email, password };
    console.log(JSON.stringify(user));

    const res = await requests({
      url: 'api/v1/users/login',
      method: 'POST',
      data: JSON.stringify(user),
    });

    // console.log(res.data.token);
    try {
      await AsyncStorage.setItem('token', res.data.token);
    } catch (e) {
      console.log(e);
    }

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data,
    });

    dispatch({
      type: 'LOAD_PROFILE',
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'LOGIN_FAIL',
      payload: err.response.data.message,
    });
  }
};
