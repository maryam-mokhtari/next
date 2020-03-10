import React, { Component } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getInitials, } from '../utils/initial'
import {
  login, logout,
} from '../actions'
import Login from '../components/login/Login'
import Header from '../components/login/Header'
import MainHead from '../components/MainHead'
import MainScripts from '../components/MainScripts'
import '../static/sass/login.scss'

class LoginPage extends Component {

  static async getInitialProps(ctx) {
    // return getInitials(ctx)
  }
  render() {
    return (
      <main>
        <MainHead />
        <Header isLogin={true} />
        <Login />
        <MainScripts />
      </main>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({
      login, logout,
    }, dispatch),
  }
}

const mapStateToProps = state => {
  const { isFormSuccess, isFormLoading, errorMessage,
    isLoginSuccess, isAlertHidden, } = state
  return { isFormSuccess, isFormLoading, errorMessage,
    isLoginSuccess, isAlertHidden, }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
