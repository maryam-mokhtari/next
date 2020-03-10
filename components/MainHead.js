import React, { Component } from 'react'
import Head from 'next/head'
import { consoleLog, server } from '../utils/config'

export default class MainHead extends Component {
  render() {
    consoleLog('MainHead Props:', this.props)
    const title = "Pixel Panel"
    const description = "Pixel Panel is a list of Fames and their details."
    const keywords = "Pixel, Code, Fame, Authorization"
    const logo = '/static/img/logo.png'
    return (
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#007fff" />

        <meta name="msapplication-TileColor" content="#2c31da" />
        <link rel="manifest" href="/static/manifest.json" />
        <link rel="apple-touch-icon" href="/static/img/192.png" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Maryam Mokhtari" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${server}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={logo} />
        <meta property="og:author" content="Maryam Mokhtari" />
        <meta property="og:keywords" content={keywords} />
        <meta property="twitter:locale" content="en_US" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:keywords" content={keywords} />
        <meta property="twitter:creator" content="Maryam Mokhtari" />
        <meta property="twitter:image" content={logo} />
        <meta property="twitter:site" content={`${server}`} />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicon-16x16.png" />
      </Head>
    )
  }
}
