const { body } = require('express-validator');

exports.validateExpense = [
  body('title')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a number greater than 0'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('date')
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format')
];