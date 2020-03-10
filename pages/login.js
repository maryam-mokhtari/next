import React, { Component } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getInitials, } from '../utils/initial'
import {
  login, logout,
} from '../actions'
import LoginHeader from '../components/login/LoginHeader'
import LoginFooter from '../components/login/LoginFooter'
import Login from '../components/login/Login'
import MainHead from '../components/MainHead'
import MainScripts from '../components/MainScripts'

class LoginPage extends Component {

  static async getInitialProps(ctx) {
    // return getInitials(ctx)
  }
  render() {
    const signupProps = {...this.props, type: 'login', isErrorAlert: true}
    return (
      <div>
        <MainHead />
        <main id="main" className="sec">
          <div id="inner-main" style={{marginTop: '100px'}}>
            <div className="wrapper-auth">
              <div className="login-container">
                <div className="login-image" />
                <div className="signup-left">
                  <LoginHeader title="Login" />
                  <Login {...signupProps} />
                  <div className="signup-text-down">
                    <LoginFooter type={this.props.type} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <MainScripts />
      </div>
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
