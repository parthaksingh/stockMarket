const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

// GET /api/stocks/quote/:symbol
const getStockQuote = async (req, res) => {
  const { symbol } = req.params;

  try {
    const quote = await yahooFinance.quote(symbol);

    if (!quote) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    const stockData = {
      symbol: quote.symbol,
      open: quote.regularMarketOpen?.toString() || quote.regularMarketPreviousClose?.toString() || '0',
      high: quote.regularMarketDayHigh?.toString() || '0',
      low: quote.regularMarketDayLow?.toString() || '0',
      price: quote.regularMarketPrice?.toString() || '0',
      prevClose: quote.regularMarketPreviousClose?.toString() || '0',
      changePercent: quote.regularMarketChangePercent?.toString() || '0'
    };

    res.json(stockData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching stock data' });
  }
};

// GET /api/stocks/history/:symbol
const getStockHistory = async (req, res) => {
  const { symbol } = req.params;

  try {
    const queryOptions = {
      period1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      period2: new Date(),
      interval: '1d'
    };

    // In v3, historical is deprecated and maps to chart. Use chart directly.
    const result = await yahooFinance.chart(symbol, queryOptions);

    if (!result || !result.quotes || result.quotes.length === 0) {
      return res.status(404).json({ message: 'History not found' });
    }

    const history = result.quotes.filter(q => q.close !== null).map(day => ({
      date: day.date.toISOString().split('T')[0],
      close: day.close
    }));

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching history' });
  }
};

module.exports = { getStockQuote, getStockHistory };

