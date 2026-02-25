import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import StockCard from '../components/stock/StockCard';
import ChartComponent from '../components/stock/ChartComponent';
import './StockDetailsPage.css';

const StockDetailsPage = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // trade modal state
  const [showModal, setShowModal] = useState(false);
  const [tradeType, setTradeType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [tradeMsg, setTradeMsg] = useState('');

  useEffect(() => {
    fetchStockData();
  }, [symbol]);

  const fetchStockData = async () => {
    setLoading(true);
    setError('');
    try {
      const [quoteRes, historyRes] = await Promise.all([
        API.get(`/stocks/quote/${symbol}`),
        API.get(`/stocks/history/${symbol}`)
      ]);
      setStock(quoteRes.data);
      setHistory(historyRes.data);
    } catch (err) {
      setError('Could not fetch stock data. API may be rate limited.');
    } finally {
      setLoading(false);
    }
  };

  const openTrade = (type) => {
    setTradeType(type);
    setTradeMsg('');
    setQuantity(1);
    setShowModal(true);
  };

  const submitTrade = async () => {
    try {
      await API.post('/transactions', {
        symbol: stock.symbol,
        companyName: stock.symbol, // Alpha Vantage doesn't give company name in quote
        type: tradeType,
        quantity: parseInt(quantity),
        priceAtRequest: parseFloat(stock.price)
      });
      setTradeMsg(`${tradeType.toUpperCase()} request submitted! Waiting for admin approval.`);
      setTimeout(() => setShowModal(false), 2000);
    } catch (err) {
      setTradeMsg('Failed to submit trade. Try again.');
    }
  };

  const addToWatchlist = async () => {
    try {
      await API.post('/watchlist', { symbol: stock.symbol, companyName: stock.symbol });
      alert(`${stock.symbol} added to watchlist!`);
    } catch (err) {
      alert(err.response?.data?.message || 'Could not add to watchlist');
    }
  };

  if (loading) return <div className="center-msg">Loading stock data...</div>;
  if (error) return <div className="center-msg error">{error}</div>;
  if (!stock) return null;

  return (
    <div className="stock-details-container">
      <StockCard
        stock={stock}
        onBuy={() => openTrade('buy')}
        onSell={() => openTrade('sell')}
        onWatchlist={addToWatchlist}
      />

      <ChartComponent data={history} symbol={symbol} />

      {/* Trade Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{tradeType === 'buy' ? '🟢 Buy' : '🔴 Sell'} {symbol}</h3>
            <p>Current price: <strong>${parseFloat(stock.price).toFixed(2)}</strong></p>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <p className="total-cost">
              Total: ${(parseFloat(stock.price) * quantity).toFixed(2)}
            </p>

            {tradeMsg && <p className="trade-msg">{tradeMsg}</p>}

            <div className="modal-actions">
              <button
                className={tradeType === 'buy' ? 'buy-btn' : 'sell-btn'}
                onClick={submitTrade}
              >
                Confirm {tradeType}
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockDetailsPage;
