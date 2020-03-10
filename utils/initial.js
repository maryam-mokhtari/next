import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import Cookies from 'js-cookie'
import Router from 'next/router'
import {isArrayOK} from '../utils/array'
import { server, consoleLog, } from './config'

const isRand = false

export const getData = async (api, isAuth, token) => {
  let res = null
  if (api) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    let authHeaders = { ...headers,
      'Authorization': 'Bearer ' + token
    }
    const connector = api.includes('?')? '&' : '?'
    const endpoint = `${server}${encodeURI(api)}${isRand?`${connector}rand=${Date.now()}`:''}`
    console.log('endpoint:', endpoint, token)
    let result = await fetch(endpoint, {
      method: 'GET',
      headers: isAuth? authHeaders: headers,
    })
    res = await result.json()
  }
  return res
}

export const getInitials = async (ctx, returnData, api, isAuth = true) => {
  const { query, res } = ctx
   try {
    let { token } = nextCookie(ctx)
    const apiData = await getData(api, isAuth, token)

    let result = { query, }
    if (apiData) {
      result = {...result,
        [returnData]: (apiData.data? apiData.data : apiData),
      }
    }
    return result
  } catch (err) {
    console.log('serverAPI error:', err)
     if (res) {
       if (res != {} && typeof res.writeHead === "function") {
         res.writeHead(302, {
           Location: '/404'
         })
         res.end()
       }
     } else {
       Router.push('/404')
     }
     return { menu: 404}
   }
}
