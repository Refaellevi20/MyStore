import React from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { HomePage } from './pages/HomePage'
import { ToyIndex } from './pages/ToyIndex'
import { EditToy } from './pages/EditToy'
import { ToyDetails } from './pages/ToyDetails'
import { Cart } from './pages/Cart'
import { Payment } from './pages/Payment'
import { QuickPayment } from './pages/QuickPayment'
import { PaymentSuccess } from './pages/PaymentSuccess'
import { AdminPaymentSuccess } from './pages/AdminPaymentSuccess'
import { AppHeader } from './cmps/AppHeader'
// import { AppFooter } from './cmps/AppFooter'
// import { UserMsg } from './cmps/UserMsg'



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
          <Route path="/quick-payment" element={<QuickPayment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/admin-payment-success" element={<AdminPaymentSuccess />} />
        </Routes>
      </main>
      {/* <AppFooter/> */}

    </div>
  )
}

