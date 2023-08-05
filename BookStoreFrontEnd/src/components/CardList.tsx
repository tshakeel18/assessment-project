import React from 'react';

import Card from './Card';
import { Book } from '../models/book';

interface CardListProps {
  booksData: Book[];
}

const CardList: React.FC<CardListProps> = ({ booksData }) => {
  return (
    <>
      <div className=" grid gap-1 place-items-center xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {booksData.length ? (
          booksData?.map((book: Book, index) => (
            <Card
              key={index}
              id={book.id}
              image={book.cover_image}
              title={book.title}
              writer={book.writer}
              point={book.point}
              discount={book.discount}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CardList;
