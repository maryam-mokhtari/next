import React, { Component } from "react"
import { getInitials, } from '../utils/initial'
import LoginHeader from '../components/login/LoginHeader'
import LoginFooter from '../components/login/LoginFooter'
import MainHead from '../MainHead'
import MainScripts from '../MainScripts'

export default class LoginPage extends Component {

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
                  <LoginHeader title={title} />
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
    )
  }
}
