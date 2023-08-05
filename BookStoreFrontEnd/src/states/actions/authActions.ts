import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';

import { RootState } from '../reducers';
import {
  AuthActionTypes,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from './authActionTypes';

export const loginRequest = (): AuthActionTypes => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (token: string): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: token
});

export const loginFailure = (error: string): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const signupRequest = (): AuthActionTypes => ({
  type: SIGNUP_REQUEST
});

export const signupSuccess = (token: string): AuthActionTypes => ({
  type: SIGNUP_SUCCESS,
  payload: token
});

export const signupFailure = (error: string): AuthActionTypes => ({
  type: SIGNUP_FAILURE,
  payload: error
});

export const login =
  (userDetails: {
    name: string;
    password: string;
  }): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post('http://localhost:3001/api/signin', userDetails);
      if (response.data.token) {
        localStorage.setItem('jwt', `Bearer ${response.data.token}`);
        dispatch(loginSuccess(response.data.token));
      }
    } catch (error) {
      alert(`Invalid credentials! Please check username and Password`);
      dispatch(loginFailure('Invalid credentials! Please check username and password'));
    }
  };

export const signup =
  (userDetails: {
    name: string;
    password: string;
  }): ThunkAction<void, RootState, unknown, AuthActionTypes> =>
  async (dispatch) => {
    dispatch(signupRequest());
    try {
      const response = await axios.post('http://localhost:3001/api/signup', userDetails);
      if (response.status === 201) {
        localStorage.setItem('jwt', `Bearer ${response.data.token}`);
        dispatch(signupSuccess(response.data.token));
      }
    } catch (error) {
      dispatch(signupFailure('Signup failed. Please try again later.'));
    }
  };
