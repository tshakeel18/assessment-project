import {
  BookActionTypes,
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  FETCH_BOOKS_UNAUTHORIZED
} from '../actions/bookActionTypes';
import { Book } from '../../models/book';

interface BookState {
  booksData: Book[];
  loading: boolean;
  pageNumber: number;
  totalPages: number;
  errorCode?: number | null;
}

const initialState: BookState = {
  booksData: [],
  loading: false,
  pageNumber: 1,
  totalPages: 0
};

const bookReducer = (state = initialState, action: BookActionTypes): BookState => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return { ...state, loading: true };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        booksData: [...state.booksData, ...action.payload.books],
        pageNumber: state.pageNumber + 1,
        totalPages: action.payload.totalPages,
        errorCode: null
      };
    case FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, errorCode: null };
    case FETCH_BOOKS_UNAUTHORIZED:
      return { ...state, loading: false, ...action.payload };
    default:
      return state;
  }
};

export default bookReducer;
