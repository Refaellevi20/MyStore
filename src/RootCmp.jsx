import React from 'react'
import { Routes, Route } from 'react-router-dom'

// import { HomePage } from './pages/HomePage'
import { ToyIndex } from './pages/ToyIndex'
import { EditToy } from './pages/EditToy'
import { ToyDetails } from './pages/ToyDetails'
import { Cart } from './pages/Cart'
import { Payment } from './pages/Payment'
import { QuickPayment } from './pages/QuickPayment'
import { PaymentSuccess } from './pages/PaymentSuccess'
import { AdminPaymentSuccess } from './pages/AdminPaymentSuccess'
import { AppHeader } from './pages/AppHeader'
// import { AdminReports } from './cmps/AdminReports'
import { SupportPage } from './pages/SupportPage'
import { UserMsg } from './cmps/UserMsg'
// import { AppFooter } from './cmps/AppFooter'
import { AdminSupportDashboard } from './pages/AdminSupportDashboard'



export function RootCmp() {


  return (
    <div className="l">
      {/* <UserMsg /> */}
      <AppHeader />
      <main>
        <Routes>
          <Route path='/' element={<ToyIndex />} />

          <Route path='/toy' element={<ToyIndex />} />
          <Route path='/toy/edit/:toyId' element={<EditToy />} />
          <Route path='/toy/edit' element={<EditToy />} />
          <Route path='/toy/:toyId' element={<ToyDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment' element={<Payment />} />
          <Route path="/admin/support" element={<AdminSupportDashboard />} />
          <Route path="/quick-payment" element={<QuickPayment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/admin-payment-success" element={<AdminPaymentSuccess />} />
          {/* <Route path="/admin/reports" element={<AdminReports />} /> */}
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </main>
      <UserMsg />
    </div>
  )
}

