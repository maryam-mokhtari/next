import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { consoleLog, } from '../utils/config'
import {isArrayOK} from '../utils/array'
import {getInitials} from '../utils/initial'
import MainHead from '../components/MainHead'
import FameBox from '../components/fame/FameBox'
import Header from '../components/login/Header'
import '../static/sass/fame.scss'

export default class FamesPage extends Component {
  static async getInitialProps (ctx) {
    return getInitials(ctx, 'fames', `/fames?page=${ctx.query.pageNumber - 1}`)
  }

  componentDidMount() {
    const { fames, query, } = this.props;
    const { pageNumber } = query;
    (!fames || !isArrayOK(fames.list)) && Router.push(`/login`)
  }

  render() {
    consoleLog('FamesPage props:', this.props)
    const { fames, query, } = this.props
    const { pageNumber } = query
    return (
      <main>
        <MainHead />
        <Header query={query} />
        <div className="fames">
          {fames && isArrayOK(fames.list) && fames.list.map(fame => (
            <FameBox fame={fame} pageNumber={pageNumber} key={fame.id} />
          ))}
        </div>
        <div className="fames-page">
          {[1,2].map(i => (
            pageNumber == i?
            <div className="fame-page selected" key={i}>{i}</div>
            :
            <Link href={`/fames/${i}`} key={i}>
              <a className="fame-page">{i}</a>
            </Link>
          ))}
        </div>
      </main>
    )
  }
}
