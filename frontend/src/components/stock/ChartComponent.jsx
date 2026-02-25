import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import './ChartComponent.css';

const ChartComponent = ({ data, symbol }) => {
  const { darkMode } = useTheme();

  if (!data || data.length === 0) {
    return <p>No chart data available.</p>;
  }

  return (
    <div className="chart-container">
      <h4>{symbol} - Last 30 Days</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#333' : '#eee'} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: darkMode ? '#aaa' : '#666' }}
            tickFormatter={(val) => val.slice(5)} // show MM-DD only
          />
          <YAxis
            tick={{ fontSize: 11, fill: darkMode ? '#aaa' : '#666' }}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              background: darkMode ? '#1e1e2f' : 'white',
              border: '1px solid #ddd',
              color: darkMode ? 'white' : 'black'
            }}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#00d4ff"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
