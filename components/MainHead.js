import React, { Component } from 'react'
import Head from 'next/head'
import { consoleLog, clientBaseUrl } from '../utils/config'

export default class MainHead extends Component {
  render() {
    consoleLog('MainHead Props:', this.props)
    const {title, description, keywords, image, mainSlug, } = this.props
    return (
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#007fff" />

        <link rel="mask-icon" href="/static/img/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/static/css/fonts.css?v=3.2.1" />
        <link rel="manifest" href="/static/manifest.json" />
        <link rel="apple-touch-icon" href="/static/img/192.png" />
        <title>
          {
            title? title.replace(/\u200E/g, '\u200C') : ' ویزای کانادا - ویزای آمریکا'
          }
        </title>
        <meta name="description" content={description || "اخذ ویزای کانادا ، وقت سفارت، مهاجرت به کانادا و خدمات پس از ورود کانادا"} />
        <meta name="keywords" content={keywords || "ویزای کانادا , مهاجرت به کانادا , ویزای تضمینی کانادا ,  وقت سفارت کانادا"} />
        <meta name="author" content="Maryam Mokhtari" />
        <meta property="og:title" content={
          (title? title.replace(/\u200E/g, '\u200C') : ' ویزای کانادا - ویزای آمریکا')
        } />
        <meta property="og:description" content={description ||
          "اخذ ویزا، وقت سفارت، مهاجرت و خدمات پس از ورود کانادا"} />
        {mainSlug && mainSlug != '' ?
        <meta property="og:url" content={`${clientBaseUrl}/article/${mainSlug}`} />
        :
        <meta property="og:url" content={`${clientBaseUrl}`} />
        }
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fa_IR" />
        <meta property="og:image" content={image || `${clientBaseUrl}/static/img/logo.svg` } />
        <meta property="og:author" content="Maryam Mokhtari" />
        <meta property="og:keywords" content={keywords || "ویزای کانادا, ویزای آمریکا, مهاجرت به کانادا, وقت سفارت, اجاره آپارتمان در کانادا"} />
        <meta property="twitter:locale" content="fa_IR" />
        <meta property="twitter:title" content={
          (title? title.replace(/\u200E/g, '\u200C') : ' ویزای کانادا - ویزای آمریکا')
        } />
        <meta property="twitter:description" content={description ||
          "اخذ ویزا، وقت سفارت، مهاجرت و خدمات پس از ورود کانادا"} />
        <meta property="twitter:keywords" content={keywords || "ویزای کانادا, ویزای آمریکا, مهاجرت به کانادا, وقت سفارت, اجاره آپارتمان در کانادا"} />
        <meta property="twitter:creator" content="Maryam Mokhtari" />
        <meta property="twitter:image" content={image || `${clientBaseUrl}/static/img/logo.png`} />
        {mainSlug && mainSlug != '' ?
        <meta property="twitter:site" content={`${clientBaseUrl}/article/${mainSlug}`} />
        :
        <meta property="twitter:site" content={`${clientBaseUrl}`} />
        }
        <link rel="icon" href={`/static/favicon.ico`} type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicon-16x16.png" />
      </Head>
    )
  }
}
