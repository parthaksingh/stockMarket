const User = require('../models/User');

// GET /api/watchlist
const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('watchlist');
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/watchlist
const addToWatchlist = async (req, res) => {
  const { symbol, companyName } = req.body;

  try {
    const user = await User.findById(req.user.id);

    // check if already in watchlist
    const alreadyAdded = user.watchlist.find(item => item.symbol === symbol.toUpperCase());
    if (alreadyAdded) {
      return res.status(400).json({ message: 'Stock already in watchlist' });
    }

    user.watchlist.push({ symbol: symbol.toUpperCase(), companyName });
    await user.save();

    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/watchlist/:symbol
const removeFromWatchlist = async (req, res) => {
  const { symbol } = req.params;

  try {
    const user = await User.findById(req.user.id);
    user.watchlist = user.watchlist.filter(item => item.symbol !== symbol.toUpperCase());
    await user.save();

    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };
