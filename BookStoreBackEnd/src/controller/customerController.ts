
import * as express from 'express';

import CustomerService from '../service/customerService';
import {authenticateToken} from '../authentication/authVerification';

export const router = express.Router();

router.post('/customers',  authenticateToken, async (req, res) => {
  try {
    const newCustomer = await CustomerService.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error creating customer' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    
    console.log(req.body)
    const newCustomer = await CustomerService.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error creating customer' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const customer = await CustomerService.authenticateCustomer(req.body);
    const token = await CustomerService.generateToken(customer);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: 'Invalid name or password' });
  }
});
