// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FaFileDownload, FaChartBar, FaTable, FaArrowLeft } from 'react-icons/fa'

// export function AdminReports() {
//   const navigate = useNavigate()
//   const [reportType, setReportType] = useState('sales')
//   const [dateRange, setDateRange] = useState('week')
//   const [isGenerating, setIsGenerating] = useState(false)

//   const generateReport = async () => {
//     setIsGenerating(true)
//     try {
//       // Get orders from localStorage
//       const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      
//       // Format data based on report type
//       let reportData = ''
      
//       if (reportType === 'sales') {
//         reportData = formatSalesReport(orders)
//       } else if (reportType === 'customers') {
//         reportData = formatCustomerReport(orders)
//       }
      
//       // Create and download CSV file
//       downloadCSV(reportData, `${reportType}-report-${dateRange}.csv`)
//     } catch (error) {
//       console.error('Error generating report:', error)
//     } finally {
//       setIsGenerating(false)
//     }
//   }

//   const formatSalesReport = (orders) => {
//     const headers = ['Order ID,Date,Product,Price,Status\n']
//     const rows = orders.map(order => 
//       `${order.orderNumber},${order.purchaseDate},"${order.toy.name}",${order.toy.price},${order.status}`
//     )
//     return headers.concat(rows.join('\n'))
//   }

//   const formatCustomerReport = (orders) => {
//     const headers = ['Date,Total Orders,Total Revenue,Average Order Value\n']
//     const dailyStats = orders.reduce((acc, order) => {
//       const date = order.purchaseDate
//       if (!acc[date]) {
//         acc[date] = { orders: 0, revenue: 0 }
//       }
//       acc[date].orders++
//       acc[date].revenue += Number(order.toy.price)
//       return acc
//     }, {})

//     const rows = Object.entries(dailyStats).map(([date, stats]) => {
//       const avgOrderValue = (stats.revenue / stats.orders).toFixed(2)
//       return `${date},${stats.orders},${stats.revenue},${avgOrderValue}`
//     })

//     return headers.concat(rows.join('\n'))
//   }

//   const downloadCSV = (content, fileName) => {
//     const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
//     const link = document.createElement('a')
//     if (link.download !== undefined) {
//       const url = URL.createObjectURL(blob)
//       link.setAttribute('href', url)
//       link.setAttribute('download', fileName)
//       link.style.visibility = 'hidden'
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//     }
//   }

//   return (
//     <div className="admin-reports-page">
//       <div className="reports-header">
//         <button 
//           className="back-btn"
//           onClick={() => navigate('/')}
//         >
//           <FaArrowLeft /> Back home
//         </button>
//         <h1>Generate Reports</h1>
//       </div>

//       <div className="reports-container">
//         <div className="report-options">
//           <div className="option-group">
//             <label>Report Type</label>
//             <select 
//               value={reportType}
//               onChange={(e) => setReportType(e.target.value)}
//             >
//               <option value="sales">Sales Report</option>
//               <option value="customers">Customer Analytics</option>
//             </select>
//           </div>

//           <div className="option-group">
//             <label>Date Range</label>
//             <select 
//               value={dateRange}
//               onChange={(e) => setDateRange(e.target.value)}
//             >
//               <option value="week">Last 7 Days</option>
//               <option value="month">Last 30 Days</option>
//               <option value="year">Last Year</option>
//             </select>
//           </div>
//         </div>

//         <div className="report-preview">
//           <div className="preview-header">
//             <h3>
//               {reportType === 'sales' ? (
//                 <><FaTable /> Sales Report</>
//               ) : (
//                 <><FaChartBar /> Customer Analytics</>
//               )}
//             </h3>
//           </div>

//           <div className="preview-content">
//             <p>This report will include:</p>
//             {reportType === 'sales' ? (
//               <ul>
//                 <li>Order details</li>
//                 <li>Product information</li>
//                 <li>Sales amounts</li>
//                 <li>Transaction status</li>
//               </ul>
//             ) : (
//               <ul>
//                 <li>Customer growth</li>
//                 <li>Purchase patterns</li>
//                 <li>Average order value</li>
//                 <li>Retention metrics</li>
//               </ul>
//             )}
//           </div>
//         </div>

//         <button 
//           className="generate-btn"
//           onClick={generateReport}
//           disabled={isGenerating}
//         >
//           <FaFileDownload />
//           {isGenerating ? 'Generating...' : 'Generate Report'}
//         </button>
//       </div>
//     </div>
//   )
// }