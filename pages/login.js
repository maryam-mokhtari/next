import React, { Component } from "react"
import { getInitials, } from '../utils/initial'
import Login from '../components/login/Login'
import Header from '../components/login/Header'
import MainHead from '../components/MainHead'

export default class LoginPage extends Component {

  static async getInitialProps(ctx) {
    return {query: ctx.query}
  }
  render() {
    const { query } = this.props
    return (
      <main>
        <MainHead />
        <Header isLogin={true} />
        <Login query={query} />
      </main>
    )
  }
}
