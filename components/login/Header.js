import React, { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import Cookies from "js-cookie"
import { consoleLog, server, } from "../../utils/config"

export default class Header extends Component {
  state = {isLoading: null}
  async logout() {
    this.setState({isLoading: true})
    fetch(`${server}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token')
      },
    }).then(res => {
      this.setState({isLoading: false})
      if (res.status == '200') {
        Cookies.remove('token')
        Router.push('/login')
      }
    })
  }
  render() {
    consoleLog('Header Props:', this.props)
    return (
      <div className="header">
        <div className="pixel-logo-div">
          <img
            src="/static/img/logo.png"
            className="pixel-logo"
            alt="PIXEL"
          />
          PIXEL
        </div>
        {!this.props.isLogin &&
          <div className="log-out-div"
            onClick={() => this.logout()}>
              Logout
              {
                this.state.isLoading &&
                (
                <img
                  alt=""
                  className="loading-image profile-loading"
                  src={`/static/img/loading.gif`}
                />
              )}
          </div>
        }
      </div>
    )
  }
}
