# StockDash - MERN Stock Market Dashboard

A full-stack stock market application with user authentication, role-based access, real-time stock quotes, historical charts, buy/sell trading system with admin approval, and watchlist management.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB Atlas, JWT, bcrypt, Alpha Vantage API
- **Frontend**: React (Vite), React Router, Axios, Recharts, Context API, CSS Modules

---

## Project Structure

```
stockdash/
├── backend/
│   ├── server.js
│   ├── .env
│   ├── config/db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Transaction.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── stockController.js
│   │   ├── watchlistController.js
│   │   └── transactionController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── stockRoutes.js
│   │   ├── watchlistRoutes.js
│   │   └── transactionRoutes.js
│   └── middleware/
│       ├── authMiddleware.js
│       └── adminMiddleware.js
│
└── frontend/
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── context/
        │   ├── AuthContext.jsx
        │   └── ThemeContext.jsx
        ├── pages/
        │   ├── LoginPage.jsx
        │   ├── SignupPage.jsx
        │   ├── DashboardPage.jsx
        │   ├── StockDetailsPage.jsx
        │   ├── UserPanelPage.jsx
        │   └── AdminPanelPage.jsx
        ├── components/
        │   ├── auth/
        │   │   ├── LoginForm.jsx
        │   │   └── SignupForm.jsx
        │   ├── stock/
        │   │   ├── StockCard.jsx
        │   │   └── ChartComponent.jsx
        │   ├── trading/
        │   │   └── TransactionTable.jsx
        │   └── common/
        │       ├── Navbar.jsx
        │       └── ProtectedRoute.jsx
        └── services/
            └── api.js
```

---

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
ALPHA_VANTAGE_KEY=your_alpha_vantage_api_key
```

Get a free Alpha Vantage API key from: https://www.alphavantage.co/support/#api-key

Run the backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```

App will be at: http://localhost:3000

---

## Creating an Admin User

By default all signups create regular users. To make an admin:
1. Sign up normally
2. Go to MongoDB Atlas → your database → Users collection
3. Find your user and change `"role": "user"` to `"role": "admin"`

---

## API Endpoints

### Auth
| Method | Route | Access |
|--------|-------|--------|
| POST | /api/auth/signup | Public |
| POST | /api/auth/login | Public |

### Stocks
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/stocks/quote/:symbol | Protected |
| GET | /api/stocks/history/:symbol | Protected |

### Watchlist
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/watchlist | Protected |
| POST | /api/watchlist | Protected |
| DELETE | /api/watchlist/:symbol | Protected |

### Transactions
| Method | Route | Access |
|--------|-------|--------|
| POST | /api/transactions | Protected |
| GET | /api/transactions/my | Protected |
| GET | /api/transactions/all | Admin only |
| GET | /api/transactions/users | Admin only |
| PUT | /api/transactions/:id | Admin only |

---

## Deployment

### Backend (Render)
1. Push backend to GitHub
2. Create new Web Service on Render
3. Set environment variables (MONGO_URI, JWT_SECRET, ALPHA_VANTAGE_KEY)
4. Deploy

### Frontend (Vercel)
1. Push frontend to GitHub
2. Import project on Vercel
3. Set `VITE_API_URL` to your deployed backend URL
4. Deploy

---

## Features

- JWT-based authentication with protected routes
- Role-based authorization (User / Admin)
- Live stock quotes via Alpha Vantage API
- 30-day historical price chart using Recharts
- Buy/Sell requests with pending/approved/rejected status
- Admin panel to approve or reject all transactions
- User panel to view own transaction history and watchlist
- Dark mode toggle with ThemeContext
- API key is never exposed to the frontend
# stockMarket
