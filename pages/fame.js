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
import '../static/sass/fame.scss'

export default class FamePage extends Component {
  static async getInitialProps (ctx) {
    return getInitials(ctx, 'fame', `/fames/${ctx.query.fameId}`)
  }

  componentDidMount() {
    const { fame, } = this.props;
    console.log('fame:', fame);
    (!fame || fame.error) && Router.push('/login')
  }

  render() {
    consoleLog('FamePage props:', this.props)
    const { fame, } = this.props
    return (
      <div>
        <MainHead />
        <main id="main" className="sec">
          <Header />
          <div id="inner-main">
            {fame && !fame.error && <FameBox fame={fame} key={fame.id} />}
          </div>
        </main>
        <MainScripts />
    </div>
    )
  }
}
