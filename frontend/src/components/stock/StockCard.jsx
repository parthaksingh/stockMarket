import './StockCard.css';

const StockCard = ({ stock, onBuy, onSell, onWatchlist }) => {
  const isPositive = !stock.changePercent?.includes('-');

  return (
    <div className="stock-card">
      <div className="stock-header">
        <h3>{stock.symbol}</h3>
        <span className={`change-badge ${isPositive ? 'positive' : 'negative'}`}>
          {stock.changePercent}
        </span>
      </div>

      <div className="stock-price">
        ${parseFloat(stock.price).toFixed(2)}
      </div>

      <div className="stock-details">
        <div className="detail-row">
          <span>High</span>
          <span>${parseFloat(stock.high).toFixed(2)}</span>
        </div>
        <div className="detail-row">
          <span>Low</span>
          <span>${parseFloat(stock.low).toFixed(2)}</span>
        </div>
        <div className="detail-row">
          <span>Prev Close</span>
          <span>${parseFloat(stock.prevClose).toFixed(2)}</span>
        </div>
      </div>

      <div className="stock-actions">
        <button className="buy-btn" onClick={onBuy}>Buy</button>
        <button className="sell-btn" onClick={onSell}>Sell</button>
        <button className="watchlist-btn" onClick={onWatchlist}>+ Watchlist</button>
      </div>
    </div>
  );
};

export default StockCard;
