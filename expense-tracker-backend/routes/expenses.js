const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const validation = require('../middleware/validation');

router.post('/', validation.validateExpense, expenseController.addExpense);
router.get('/', expenseController.getExpenses);
router.patch('/:id', validation.validateExpense, expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;