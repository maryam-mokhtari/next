import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import Cookies from 'js-cookie'
import Router from 'next/router'
import {isArrayOK} from '../utils/array'
import { nginx, apiBaseUrl, consoleLog, clientBaseUrl, } from './config'

const fs = require('fs')
const isRand = true
const isNginx = true
const server = isNginx? nginx : apiBaseUrl

export const getData = async (api, isAuth, access, refresh) => {
  let res = null
  if (api) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    let authHeaders = { ...headers,
      'Authorization': 'Bearer ' + access
    }
    const connector = api.includes('?')? '&' : '?'
    const endpoint = `${server}${encodeURI(api)}${isRand?`${connector}rand=${Date.now()}`:''}`
    console.log('endpoint:', endpoint)
    let result = await fetch(endpoint, {
      method: 'GET',
      headers: isAuth? authHeaders: headers,
    })
    res = await result.json()
    if (res.status_code != 200 && isAuth) {
      const refreshResult = await fetch(`${server}/token/refresh/${isRand?`?rand=${Date.now()}`:''}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          refresh,
        }),
      })
      const refreshRes = await refreshResult.json()
      if (refreshRes.access) {
        access = refreshRes.access
        Cookies.set('access', access)
        authHeaders = { ...headers,
          'Authorization': 'Bearer ' + access
        }
        result = await fetch(`${server}${api}${isRand?`${connector}rand=${Date.now()}`:''}`, {
          method: 'GET',
          headers: authHeaders,
        })
        res = await result.json()
      } else {
        res =  {code: "token_not_valid"}
      }
    }
  }
  return res
}

export const getInitials = async (ctx, returnData, api, apiStaticData, isAuth, isSitemap ) => {
  // isSitemap && makeSitemap(ctx)
  const { query, res } = ctx
   try {
    let { access, refresh } = nextCookie(ctx)
    const menuResult = await fetch(`${server}/article/menu${isRand?`?rand=${Date.now()}`:''}`)
    const menu = await menuResult.json()
    let profile = null

    const apiData = apiStaticData || await getData(api, isAuth, access, refresh)

    profile = await getData('/user/profile/detail/', true, access, refresh)

    let result = { menu, profile, query, }
    if (apiData) {
      result = {...result,
        [returnData]: apiData,
      }
    }
    return result
  } catch (err) {
    console.log('serverAPI error:', err)
     if (res) {
       if (res != {} && typeof res.writeHead === "function") {
         res.writeHead(302, {
           Location: '/400'
         })
         res.end()
       }
     } else {
       Router.push('/400')
     }
     return { menu: 404}
   }
}

export const getIndexInitials = async (ctx) => {
  const { query, res } = ctx
   try {
    makeSitemap(ctx)
    let { access, refresh } = nextCookie(ctx)
    const menuResult = await fetch(`${server}/article/menu${isRand?`?rand=${Date.now()}`:''}`)
    const menu = await menuResult.json()

    const latests = await getData('/article/latest')
    const servicesData = await getData('/dashboard/explore/')
    const backgrounds = await getData('/dashboard/home/header/')
    const profile = await getData('/user/profile/detail/', true, access, refresh)

    return { menu, profile, access, latests, servicesData, backgrounds, }

  } catch (err) {
    console.log('serverAPI index error:', err)
     if (res) {
       if (res != {} && typeof res.writeHead === "function") {
         res.writeHead(302, {
           Location: '/400'
         })
         res.end()
       }
     } else {
       Router.push('/400')
     }
     return { menu: 404}
   }
}

export const makeSitemap = (ctx) => {
  const result = getInitials(ctx, 'sitemaps', '/article/slugs',)
  result.then(r => {
    const fs = require('fs')

    const sitemaps = r.sitemaps
    const sitemapsData =
      sitemaps.status_text == "OK"
        && sitemaps.status_code == 200
        && isArrayOK(sitemaps.data)? sitemaps.data : []

    let sitemapTop =
      `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
            <loc>${clientBaseUrl}</loc>
            <lastmod>2019-07-01</lastmod>
            <priority>0.9</priority>
          </url>
      `

    let sitemapPics =
    `<url>
        <loc>${clientBaseUrl}/favicon.ico</loc>
        <priority>0.9</priority>
      </url>
      <url>
        <loc>${clientBaseUrl}/static/img/logo.svg</loc>
        <priority>0.9</priority>
      </url>
    `
    let sitemapBottom =
    `<url>
        <loc>${clientBaseUrl}/about</loc>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>${clientBaseUrl}/contact</loc>
        <priority>0.6</priority>
      </url>
      <url>
        <loc>${clientBaseUrl}/faq</loc>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>${clientBaseUrl}/canada-gift-visa</loc>
        <priority>0.9</priority>
      </url>
    </urlset>
    `
    const sitemapArticles = sitemapsData.map((item, index) =>
      (
      `<url>
          <loc>${clientBaseUrl}/article/${item.slug}</loc>
          <lastmod>${item.edited_at.substr(0, item.edited_at.indexOf('_'))}</lastmod>
          <priority>0.8</priority>
        </url>
      `
    ))

    const sitemap =
      sitemapTop + '\n' +
      sitemapArticles.join('\n') + '\n' +
      sitemapPics + '\n' + sitemapBottom

    // console.log('sitemap:', sitemap)

    fs.writeFile && fs.writeFile('./static/sitemap.xml', sitemap, (err) => {
      // console.log('Error writeFile:', err)
    })
  })
}
