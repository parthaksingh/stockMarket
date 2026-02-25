import { useState, useEffect } from 'react';
import API from '../services/api';
import TransactionTable from '../components/trading/TransactionTable';
import './PanelPages.css';

const AdminPanelPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('transactions');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tRes, uRes] = await Promise.all([
        API.get('/transactions/all'),
        API.get('/transactions/users')
      ]);
      setTransactions(tRes.data);
      setUsers(uRes.data);
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const { data } = await API.put(`/transactions/${id}`, { status: 'approved' });
      setTransactions(prev => prev.map(t => t._id === id ? data : t));
    } catch (err) {
      alert('Could not approve transaction');
    }
  };

  const handleReject = async (id) => {
    try {
      const { data } = await API.put(`/transactions/${id}`, { status: 'rejected' });
      setTransactions(prev => prev.map(t => t._id === id ? data : t));
    } catch (err) {
      alert('Could not reject transaction');
    }
  };

  if (loading) return <div className="panel-loading">Loading admin data...</div>;

  const pendingCount = transactions.filter(t => t.status === 'pending').length;

  return (
    <div className="panel-container">
      <h2>Admin Panel</h2>

      <div className="admin-stats">
        <div className="stat-box">
          <div className="stat-num">{transactions.length}</div>
          <div className="stat-label">Total Transactions</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{pendingCount}</div>
          <div className="stat-label">Pending Requests</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{users.length}</div>
          <div className="stat-label">Registered Users</div>
        </div>
      </div>

      <div className="tab-btns">
        <button
          className={activeTab === 'transactions' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('transactions')}
        >
          All Transactions
        </button>
        <button
          className={activeTab === 'users' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('users')}
        >
          All Users
        </button>
      </div>

      {activeTab === 'transactions' && (
        <TransactionTable
          transactions={transactions}
          isAdmin={true}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {activeTab === 'users' && (
        <div className="table-wrapper">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={u.role === 'admin' ? 'type-sell' : 'type-buy'}>
                      {u.role}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanelPage;
