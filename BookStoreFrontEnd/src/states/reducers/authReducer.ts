import {
  AuthActionTypes,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../actions/authActionTypes';

interface AuthState {
  token: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: '',
  loading: false,
  error: null
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, token: action.payload, error: null };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return { ...state, loading: false, token: '', error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
