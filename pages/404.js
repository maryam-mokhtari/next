import React, { Component } from "react"
import fetch from 'isomorphic-unfetch'
import MainHead from "../components/MainHead"
import MainScripts from "../components/MainScripts"
import { consoleLog, } from "../utils/config"

export default class ErrorPage404 extends Component {
  static async getInitialProps({ query, res }) {
    return { menu : 404 }
  }
  render() {
    consoleLog("404 props:", this.props)
    const { menu, } = this.props
    const headerProps = { menu, }
    return (
      <div>
        <MainHead />
        <main id="main" className="sec">
          <div id="inner-main" className="toppage-bar-page flex-col">
              <div className="txt-container-error">
              <div className="txt1-error-404">Not Found!</div>
              <div className="txt2-error-404">Please Try Again.</div>
              </div>
              <img className="img-error" src={`/static/img/404.svg`} />
          </div>
        </main>
        <MainScripts />
      </div>
    )
  }
}
