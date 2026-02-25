const express = require('express');
const router = express.Router();
const { getStockQuote, getStockHistory } = require('../controllers/stockController');
const { protect } = require('../middleware/authMiddleware');

router.get('/quote/:symbol', protect, getStockQuote);
router.get('/history/:symbol', protect, getStockHistory);

module.exports = router;
