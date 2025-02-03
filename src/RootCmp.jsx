import React from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { HomePage } from './pages/HomePage'
import { ToyIndex } from './pages/ToyIndex'
import { EditToy } from './pages/EditToy'
import { ToyDetails } from './pages/ToyDetails'
import { Cart } from './pages/Cart'
import { Payment } from './pages/Payment'
// import { AppFooter } from './cmps/AppFooter'
// import { UserMsg } from './cmps/UserMsg'



export function RootCmp() {


  return (
    <div className="main-container  main-layout full">
      {/* <UserMsg /> */}
      <main>
        <Routes>
          <Route path='/' element={<ToyIndex />} />
          <Route path='/toy' element={<ToyIndex />} />
          <Route path='/toy/edit/:toyId' element={<EditToy />} />
          <Route path='/toy/edit' element={<EditToy />} />
          <Route path='/toy/:toyId' element={<ToyDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment' element={<Payment />} />
        </Routes>
      </main>
      {/* <AppFooter/> */}

    </div>
  )
}

