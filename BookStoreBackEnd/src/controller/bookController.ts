import * as express from 'express';

import BookService from '../service/bookService';
import { Book } from '../entity/book';
import { authenticateToken } from '../authentication/authVerification';
import { sequelize } from '../database/connection';
import CustomerRepository from '../repository/customerRepository';
import BookRepository from '../repository/bookRepository';

export const router = express.Router();

router.get('/books',  authenticateToken, async (req, res) => {
  const page = req?.query?.page ? parseInt(req?.query?.page.toString()) : 1;
  const itemsPerPage = req?.query?.limit ?  parseInt(req?.query?.limit.toString()) : 10; // Set the number of books to return per page

  try {
    // Calculate the offset based on the current page and itemsPerPage
    const offset = (page - 1) * itemsPerPage;

    // Find all books with pagination
    const books = await Book.findAll({
      limit: itemsPerPage,
      offset: offset
    });

    // Count the total number of books for pagination
    const totalCount = await Book.count();

    // Calculate the total number of pages based on the totalCount and itemsPerPage
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    res.json({ books, page, totalPages });
  } catch (error) {
    console.error('Error while fetching books:', error);
    res.status(500).json({ error: 'Error while fetching books' });
  }
});

router.post('/books',  authenticateToken, async (req, res) => {
  try {
    const newBook = await BookService.createBook(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Error creating book' });
  }
});

router.post('/books/buy', authenticateToken, async (req: any, res: any) => {
  const { bookId, user } = req.body; // Assuming you're sending the bookId in the request body

  const transaction = await sequelize.transaction(); // Start a database transaction

  try {
    // Find the book by ID
    const book = await BookRepository.findById(bookId, transaction);

    if (!book) {
      throw new Error('Book not found');
    }

    // Find the customer by ID
    const customer = await CustomerRepository.findByCustomer(user.id, transaction);

    if (!customer) {
      throw new Error('Customer not found');
    }

    if (customer.points < book.point) {
      throw new Error('Insufficient points');
    }

    // Deduct points from customer
    customer.points -= book.point;
    await customer.save({ transaction });

    // Commit the transaction
    await transaction.commit();

    res.json({ message: 'Book purchased successfully' });
  } catch (error) {

    await transaction.rollback();
    if (typeof error === 'object' && error !== null) {
      const errorMessage = (error as Error).message || 'An error occurred';
      console.error('Error while buying book:', error);
      res.status(500).json({ error: errorMessage });
    } else {
      console.error('Unknown error while buying book:', error);
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

