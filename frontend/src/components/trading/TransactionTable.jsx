import './TransactionTable.css';

const TransactionTable = ({ transactions, isAdmin, onApprove, onReject }) => {
  if (!transactions || transactions.length === 0) {
    return <p className="no-data">No transactions found.</p>;
  }

  const getStatusClass = (status) => {
    if (status === 'approved') return 'status-approved';
    if (status === 'rejected') return 'status-rejected';
    return 'status-pending';
  };

  return (
    <div className="table-wrapper">
      <table className="transaction-table">
        <thead>
          <tr>
            {isAdmin && <th>User</th>}
            <th>Symbol</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
            {isAdmin && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              {isAdmin && (
                <td>{t.user?.name || 'Unknown'}<br /><small>{t.user?.email}</small></td>
              )}
              <td><strong>{t.symbol}</strong></td>
              <td>
                <span className={t.type === 'buy' ? 'type-buy' : 'type-sell'}>
                  {t.type.toUpperCase()}
                </span>
              </td>
              <td>{t.quantity}</td>
              <td>${t.priceAtRequest}</td>
              <td>
                <span className={`status-badge ${getStatusClass(t.status)}`}>
                  {t.status}
                </span>
              </td>
              <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              {isAdmin && t.status === 'pending' && (
                <td>
                  <button className="approve-btn" onClick={() => onApprove(t._id)}>✓</button>
                  <button className="reject-btn" onClick={() => onReject(t._id)}>✗</button>
                </td>
              )}
              {isAdmin && t.status !== 'pending' && <td>—</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
