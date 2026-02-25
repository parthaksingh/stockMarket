const Transaction = require('../models/Transaction');

// POST /api/transactions - user places buy/sell request
const createTransaction = async (req, res) => {
  const { symbol, companyName, type, quantity, priceAtRequest } = req.body;

  try {
    const transaction = await Transaction.create({
      user: req.user.id,
      symbol,
      companyName,
      type,
      quantity,
      priceAtRequest
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create transaction' });
  }
};

// GET /api/transactions/my - get logged in user's transactions
const getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/transactions/all - admin only, get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/transactions/:id - admin approves or rejects
const updateTransactionStatus = async (req, res) => {
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/transactions/users - admin: list all users
const getAllUsers = async (req, res) => {
  const User = require('../models/User');
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTransaction,
  getMyTransactions,
  getAllTransactions,
  updateTransactionStatus,
  getAllUsers
};
