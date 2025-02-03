import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaDownload, FaChartLine, FaUser, FaDollarSign } from 'react-icons/fa'

export function AdminPaymentSuccess() {
  const navigate = useNavigate()
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    recentOrders: []
  })

  useEffect(() => {
    // Here you would typically fetch real data from your backend
    const mockSalesData = {
      totalSales: 15780,
      recentOrders: [
        { id: 'ORD123', amount: 299, date: '2024-03-15', status: 'completed' },
        { id: 'ORD124', amount: 199, date: '2024-03-15', status: 'completed' },
        // Add more mock orders as needed
      ]
    }
    setSalesData(mockSalesData)
  }, [])

  return (
    <div className="admin-success-page">
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Sales Dashboard</h1>
          <div className="date-filter">
            <select defaultValue="today">
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <FaDollarSign className="stat-icon" />
            <div className="stat-info">
              <h3>Total Sales</h3>
              <p>${salesData.totalSales.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <FaUser className="stat-icon" />
            <div className="stat-info">
              <h3>New Customers</h3>
              <p>{salesData.recentOrders.length}</p>
            </div>
          </div>

          <div className="stat-card">
            <FaChartLine className="stat-icon" />
            <div className="stat-info">
              <h3>Conversion Rate</h3>
              <p>68%</p>
            </div>
          </div>
        </div>

        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {salesData.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>${order.amount}</td>
                    <td>
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-actions">
          <button onClick={() => navigate('/admin/reports')} className="reports-btn">
            <FaDownload /> Download Reports
          </button>
        </div>
      </div>
    </div>
  )
}