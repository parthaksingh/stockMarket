import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './DashboardPage.css';

const DashboardPage = () => {
  const [searchSymbol, setSearchSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchSymbol.trim()) return;

    setError('');
    setLoading(true);

    try {
      // just check if quote exists, then navigate
      await API.get(`/stocks/quote/${searchSymbol.trim().toUpperCase()}`);
      navigate(`/stock/${searchSymbol.trim().toUpperCase()}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Stock not found. Check the symbol and try again.');
    } finally {
      setLoading(false);
    }
  };

  const popularStocks = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN', 'META'];

  return (
    <div className="dashboard-container">
      <div className="dashboard-hero">
        <h1>Stock Market Dashboard</h1>
        <p>Search for any stock to get live quotes, historical charts, and place trades.</p>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value.toUpperCase())}
            placeholder="Enter stock symbol (e.g. AAPL)"
            className="search-input"
          />
          <button type="submit" disabled={loading} className="search-btn">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <div className="search-error">{error}</div>}
      </div>

      <div className="popular-section">
        <h3>Popular Stocks</h3>
        <div className="popular-grid">
          {popularStocks.map((sym) => (
            <button
              key={sym}
              className="popular-btn"
              onClick={() => navigate(`/stock/${sym}`)}
            >
              {sym}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
