import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Layouts from '../components/layouts'

export default class admin extends Component {
  render () {
    return (
      <>
        <Layouts>
          <Outlet></Outlet>
        </Layouts>
      </>
    )
  }
}
