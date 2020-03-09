import React, { Component } from "react"
import fetch from 'isomorphic-unfetch'
import Header from "../components/general/Header"
import Footer from "../components/general/Footer"
import MainScripts from "../components/MainScripts"
import { consoleLog, } from "../utils/config"

export default class ErrorPage500 extends Component {
  static async getInitialProps({ query, res }) {
    return { menu: 404}
  }
  render() {
    consoleLog("500 props:", this.props)
    const { menu, } = this.props
    const headerProps = { menu, }

    return (
      <div>
        <Header {...headerProps} />
        <main id="main" className="sec">
          <div id="inner-main" className="toppage-bar-page flex-col">
              <div className="txt-container-error">
              <div className="txt2-error">یکی اشتباهی سیم رو کشید.</div>
              <div className="txt3-error">لطفاً چند لحظه دیگه به ما سر بزنید.</div>
              </div>
              <img className="img-error" src={`/static/img/500.svg`} />
          </div>
        </main>
        <Footer />
        <MainScripts />
      </div>
    )
  }
}
