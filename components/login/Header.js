import React, { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import Cookies from "js-cookie"
import { consoleLog, server, } from "../../utils/config"

export default class Header extends Component {
  state = {isLoading: null}
  async logout() {
    const { pageNumber, fameId, } = this.props.query
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
        Cookies.remove('token');
        pageNumber?
          Router.push(`/login/fames/${pageNumber}`) :
          fameId?
            Router.push(`/login/fame/${fameId}`) :
            Router.push('/login')
      }
    }).catch(err => {
      console.log('login error:', err)
      Router.push('/404')
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
              {
                this.state.isLoading?
                (
                <img
                  alt=""
                  className="loading-image"
                  src={`/static/img/loading.gif`}
                />
              )
              :
              "Logout"
            }
          </div>
        }
      </div>
    )
  }
}
