import React, { Component } from 'react'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { consoleLog, } from '../utils/config'
import {isArrayOK} from '../utils/array'
import {getInitials} from '../utils/initial'
import MainHead from '../components/MainHead'
import MainScripts from '../components/MainScripts'
import FameBox from '../components/fame/FameBox'
import Header from '../components/login/Header'

export default class FamesPage extends Component {
  static async getInitialProps (ctx) {
    return getInitials(ctx, 'fames', `/fames?page=${ctx.query.pageNumber - 1}`)
  }

  componentDidMount() {
    const { fames, } = this.props;
    (!fames || !isArrayOK(fames.list)) && Router.push('/login')
  }

  render() {
    consoleLog('FamesPage props:', this.props)
    const { fames, } = this.props
    return (
      <div>
        <MainHead />
        <main id="main" className="sec">
          <Header />
          <div id="inner-main">
            {fames && isArrayOK(fames.list) && fames.list.map(fame => (
              <FameBox fame={fame} key={fame.id} />
            ))}
          </div>
        </main>
        <MainScripts />
    </div>
    )
  }
}
