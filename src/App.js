import React from 'react'
import { Outlet, HashRouter } from 'react-router-dom'
import IndexRouter from './router'
export default function App () {
  return (
    <HashRouter>
      <IndexRouter></IndexRouter>
      <Outlet></Outlet>
    </HashRouter>
  )
}
