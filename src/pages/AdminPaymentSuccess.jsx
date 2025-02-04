import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaDownload, FaChartLine, FaUser, FaDollarSign, FaSearch, FaCalendar, FaFilter } from 'react-icons/fa'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function AdminPaymentSuccess() {
  const navigate = useNavigate()
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    recentOrders: [],
    dailyRevenue: {
      labels: [],
      datasets: [{
        label: 'Daily Revenue',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }]
    },
    customerGrowth: 0,
    conversionRate: 0
  })
  const [dateRange, setDateRange] = useState('today')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    loadSalesData()
  }, [dateRange])

  async function loadSalesData() {
    try {
      // In a real application, this would be an API call
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      
      // Calculate total sales
      const totalSales = orders.reduce((sum, order) => sum + Number(order.toy.price), 0)
      
      // Calculate daily revenue for chart
      const dailyRevenue = calculateDailyRevenue(orders)
      
      // Calculate customer growth (new customers today vs yesterday)
      const customerGrowth = calculateCustomerGrowth(orders)
      
      // Calculate conversion rate (orders / total visits)
      const conversionRate = calculateConversionRate(orders)

      setSalesData({
        totalSales,
        recentOrders: orders,
        dailyRevenue,
        customerGrowth,
        conversionRate
      })
    } catch (error) {
      console.error('Error loading sales data:', error)
    }
  }

  function calculateDailyRevenue(orders) {
    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split('T')[0]
    }).reverse()

    return {
      labels: last7Days.map(date => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })),
      datasets: [{
        label: 'Daily Revenue',
        data: last7Days.map(date => {
          return orders
            .filter(order => order.purchaseDate.includes(date))
            .reduce((sum, order) => sum + Number(order.toy.price), 0)
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }]
    }
  }

  function calculateCustomerGrowth(orders) {
    const today = new Date().toLocaleDateString()
    const todayCustomers = new Set(orders.filter(order => 
      order.purchaseDate === today
    ).map(order => order.customerId)).size

    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString()
    const yesterdayCustomers = new Set(orders.filter(order => 
      order.purchaseDate === yesterday
    ).map(order => order.customerId)).size

    return yesterdayCustomers ? 
      ((todayCustomers - yesterdayCustomers) / yesterdayCustomers) * 100 : 
      0
  }

  function calculateConversionRate(orders) {
    // In a real application, you would track total visits
    const totalVisits = 100 // Example value
    return (orders.length / totalVisits) * 100
  }

  const filteredOrders = salesData.recentOrders.filter(order => {
    const matchesSearch = order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.toy.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="admin-success-page">
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Sales Dashboard</h1>
          <div className="dashboard-controls">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="date-filter">
              <FaCalendar className="calendar-icon" />
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <FaDollarSign className="stat-icon" />
            <div className="stat-info">
              <h3>Total Sales</h3>
              <p>${salesData.totalSales.toLocaleString()}</p>
              <span className="trend positive">+12.5% vs last period</span>
            </div>
          </div>

          <div className="stat-card">
            <FaUser className="stat-icon" />
            <div className="stat-info">
              <h3>Customer Growth</h3>
              <p>{salesData.customerGrowth.toFixed(1)}%</p>
              <span className="trend positive">+5.2% new customers</span>
            </div>
          </div>

          <div className="stat-card">
            <FaChartLine className="stat-icon" />
            <div className="stat-info">
              <h3>Conversion Rate</h3>
              <p>{salesData.conversionRate.toFixed(1)}%</p>
              <span className="trend negative">-2.1% vs last period</span>
            </div>
          </div>
        </div>

        <div className="chart-section">
          <h2>Revenue Trend</h2>
          <Bar data={salesData.dailyRevenue} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Daily Revenue' }
            }
          }} />
        </div>

        <div className="recent-orders">
          <div className="orders-header">
            <h2>Recent Orders</h2>
            <div className="filter-controls">
              <FaFilter className="filter-icon" />
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.orderNumber}>
                    <td>{order.orderNumber}</td>
                    <td>{order.purchaseDate}</td>
                    <td>{order.toy.name}</td>
                    <td>${order.toy.price}</td>
                    <td>
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn view">View</button>
                      <button className="action-btn edit">Edit</button>
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