import { useState, useEffect } from 'react';
import API from '../services/api';
import TransactionTable from '../components/trading/TransactionTable';
import './PanelPages.css';

const UserPanelPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('transactions');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transRes, watchRes] = await Promise.all([
        API.get('/transactions/my'),
        API.get('/watchlist')
      ]);
      setTransactions(transRes.data);
      setWatchlist(watchRes.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (symbol) => {
    try {
      await API.delete(`/watchlist/${symbol}`);
      setWatchlist(prev => prev.filter(w => w.symbol !== symbol));
    } catch (err) {
      alert('Could not remove from watchlist');
    }
  };

  if (loading) return <div className="panel-loading">Loading your data...</div>;

  return (
    <div className="panel-container">
      <h2>My Panel</h2>

      <div className="tab-btns">
        <button
          className={activeTab === 'transactions' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('transactions')}
        >
          My Transactions ({transactions.length})
        </button>
        <button
          className={activeTab === 'watchlist' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('watchlist')}
        >
          Watchlist ({watchlist.length})
        </button>
      </div>

      {activeTab === 'transactions' && (
        <TransactionTable transactions={transactions} isAdmin={false} />
      )}

      {activeTab === 'watchlist' && (
        <div className="watchlist-grid">
          {watchlist.length === 0 ? (
            <p className="no-data">No stocks in your watchlist yet.</p>
          ) : (
            watchlist.map((item) => (
              <div key={item.symbol} className="watchlist-item">
                <span className="wl-symbol">{item.symbol}</span>
                <button
                  className="remove-btn"
                  onClick={() => removeFromWatchlist(item.symbol)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserPanelPage;
