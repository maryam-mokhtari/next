import React, { Component } from "react"
import Link from "next/link"
import Cookies from "js-cookie"
import { consoleLog, } from "../../utils/config"
import { setCookie } from "../../utils/cookie"

export default class HeaderProfile extends Component {
  async logout() {
    await this.props.logout()
    setCookie() // clear cookies
  }
  render() {
    consoleLog('HeaderProfile Props:', this.props)
    return (
      <div
        className="dropdown-menu login-box"
        >

        <div className="profile-box">
          <div className="login-top-arrow no-hide"></div>
          <div className="header-profile-div">
            <div className="header-profile-border">
              <img
                src="/static/img/bamanro-dashboard-header.svg"
                className="header-profile-img1"
                alt=""
              />
            </div>

            <div className="header-profile-border header-profile-link header-logout-border"
              onClick={() => this.logout()}>
              <img
                src="/static/img/bamanro-exit-header1.svg"
                className="header-profile-img1"
                alt=""
              />
              <div className="header-profile-txt">
                Logout
                {
                  this.props.isFormLoading &&
                  (
                  <img
                    alt=""
                    className="loading-image profile-loading"
                    src={`/static/img/bamanro-loading.gif`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
