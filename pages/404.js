import React, { Component } from "react"
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import MainHead from "../components/MainHead"
import { consoleLog, } from "../utils/config"
import '../static/sass/404.scss'

export default class ErrorPage404 extends Component {

  render() {
    consoleLog("404 props:", this.props)
    const { menu, } = this.props
    const headerProps = { menu, }
    return (
      <main>
        <MainHead />
        <div className="txt-container-error">
          <div className="txt1-error-404">Not Found!</div>
          <Link href="/login">
            <a className="txt2-error-404">
              Please Try Again.
            </a>
          </Link>
        </div>
      </main>
    )
  }
}
