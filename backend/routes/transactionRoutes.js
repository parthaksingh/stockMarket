const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getMyTransactions,
  getAllTransactions,
  updateTransactionStatus,
  getAllUsers
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.post('/', protect, createTransaction);
router.get('/my', protect, getMyTransactions);
router.get('/all', protect, adminOnly, getAllTransactions);
router.get('/users', protect, adminOnly, getAllUsers);
router.put('/:id', protect, adminOnly, updateTransactionStatus);

module.exports = router;
