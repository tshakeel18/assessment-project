import { Transaction } from 'sequelize';
import {Book} from'../entity/book';

export default class BookRepository {

  static getAllBooks = async () => {
    return Book.findAll();
  }

  static createBook = async (bookData: Book) => {
    return Book.create(bookData);
  }

  static findById = async(bookId: string, transaction?: Transaction) => {
    return await Book.findByPk(bookId, { transaction });
  }
}
