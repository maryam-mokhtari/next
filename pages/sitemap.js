import React, { Component } from "react"
import { getInitials, } from '../utils/initial'

export default class SitemapPage extends Component {
  static async getInitialProps (ctx) {
    return getInitials(ctx, null, null, null, null, true)
  }
  
  render() {
    return <div />
  }
}
