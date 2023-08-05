import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios, { AxiosError } from 'axios';

import { RootState } from '../reducers';
import {
  BookActionTypes,
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  FETCH_BOOKS_UNAUTHORIZED
} from './bookActionTypes';
import { Book } from '../../models/book';

export const fetchBooksRequest = (): BookActionTypes => ({
  type: FETCH_BOOKS_REQUEST
});

export const fetchBooksSuccess = (
  books: Book[],
  totalPages: number,
  pageNumber: number
): BookActionTypes => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: { books, totalPages, pageNumber }
});

export const fetchBooksFailure = (error: string): BookActionTypes => ({
  type: FETCH_BOOKS_FAILURE,
  payload: error
});

export const fetchBooksUnAuthorized = (errorCode: number | null): BookActionTypes => ({
  type: FETCH_BOOKS_UNAUTHORIZED,
  payload: { errorCode }
});

export const fetchBooks =
  (pageNumber: number, jwtToken: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch(fetchBooksRequest());
    try {
      const response = await axios.get(
        `http://localhost:3001/api/books?page=${pageNumber}&limit=100`,
        { headers: { Authorization: jwtToken } }
      );
      dispatch(
        fetchBooksSuccess(response.data.books, response.data.totalPages, response.data.page)
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        dispatch(fetchBooksUnAuthorized(axiosError.response?.status ?? 0));
      } else {
        dispatch(fetchBooksFailure('Error fetching books data.'));
      }
    }
  };
