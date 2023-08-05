import { Book } from '../../models/book';

export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const FETCH_BOOKS_UNAUTHORIZED = 'FETCH_BOOKS_UNAUTHORIZED';
export const FETCH_BOOKS_INVALID_TOKEN = 'FETCH_BOOKS_INVALID_TOKEN';

interface FetchBooksRequestAction {
  type: typeof FETCH_BOOKS_REQUEST;
}

interface FetchBooksSuccessAction {
  type: typeof FETCH_BOOKS_SUCCESS;
  payload: { books: Book[]; totalPages: number; pageNumber: number };
}

interface FetchBooksFailureAction {
  type: typeof FETCH_BOOKS_FAILURE;
  payload: string;
}

interface FetchBooksUnAuthorizedAction {
  type: typeof FETCH_BOOKS_UNAUTHORIZED;
  payload: { errorCode: number | null };
}

export type BookActionTypes =
  | FetchBooksRequestAction
  | FetchBooksSuccessAction
  | FetchBooksFailureAction
  | FetchBooksUnAuthorizedAction;
