import React, { Component } from 'react'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import fetch from 'isomorphic-unfetch'
import { clientBaseUrl, consoleLog, } from '../utils/config'
import {isArrayOK} from '../utils/array'
import {getInitials} from '../utils/initial'
import MainHead from '../components/MainHead'
import MainScripts from '../components/MainScripts'
import FameBox from '../components/fame/FameBox'

export default class FamesPage extends Component {
  static async getInitialProps (ctx) {
    return getInitials(ctx, 'fames', `/fames?page=${ctx.query.pageNumber - 1}`)
  }

  render() {
    consoleLog('FamesPage props:', this.props)
    const { fames, } = this.props
    const isFamesOK = fames && isArrayOK(fames.list)
    // !isFamesOK && Router.push('/login')
    return (
      <div>
        <MainHead />
        <main id="main" className="sec">
          <div id="inner-main">
            {fames.list.map(fame => (
              <FameBox fame={fame} key={fame.id} />
            ))}
          </div>
        </main>
        <MainScripts />
    </div>
    )
  }
}
