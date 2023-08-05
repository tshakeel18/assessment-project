import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { useNavigate } from 'react-router-dom';

import CardList from '../components/CardList';
import { RootState } from '../states/reducers';
import { fetchBooks, fetchBooksUnAuthorized } from '../states/actions/bookActions';
import PullToRefresh from '../components/pull-to-refresh';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { booksData, loading, pageNumber, totalPages, errorCode } = useSelector(
    (state: RootState) => state.books
  );

  let debounceScroll: NodeJS.Timeout;

  useEffect(() => {
    if (errorCode === 403 || errorCode === 401) {
      localStorage.removeItem('jwt');
      dispatch(fetchBooksUnAuthorized(null));
      navigate('/');
    }
    const jwtToken = localStorage.getItem('jwt');
    if (!jwtToken || jwtToken == '') {
      navigate('/');
    }
  }, [errorCode]);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken && !(errorCode === 403 || errorCode === 401)) {
      dispatch(fetchBooks(pageNumber, jwtToken) as unknown as AnyAction);
    }
  }, []);

  const handleScroll = () => {
    const jwtToken = localStorage.getItem('jwt');
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
    if (scrollPercentage >= 80 && !loading && jwtToken && pageNumber <= totalPages) {
      dispatch(fetchBooks(pageNumber, jwtToken) as unknown as AnyAction);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (debounceScroll) {
        clearTimeout(debounceScroll);
      }
      debounceScroll = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (debounceScroll) {
        clearTimeout(debounceScroll);
      }
    };
  }, [loading]);

  return (
    <>
      <PullToRefresh></PullToRefresh>
      <div>
        <div className="flex justify-center h-48">
          <h2 className="mx-162 my-13 w-54 h-18 font-bold text-18">Books</h2>
        </div>
        <CardList booksData={booksData} />
      </div>
    </>
  );
};

export default MainPage;
