import { Book } from '../entity/book';
import BookRepository from '../repository/bookRepository';

export default class BookService {
  static getAllBooks = async () => {
    return BookRepository.getAllBooks();
  }

  static createBook = async (bookData:Book) => {
    return BookRepository.createBook(bookData);
  }
}

