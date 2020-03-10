import React, { Component } from "react"
import { consoleLog, } from '../../utils/config'
import Link from 'next/link'

export default class LoginFooter extends Component {
  render() {
    consoleLog("LoginFooter Props:", this.props)
    const { type } = this.props
    return (
      <div className="login-footer">
        <div className="footer-border">
          <hr style={{margin: "5px",}}/>
        </div>
        <div className="footer-left-down">
          <div className="footer-down-txt2">
            <Link href="/terms">
              <a className="footer-link-login footer-link-left">
                شرایط و قوانین
              </a>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
