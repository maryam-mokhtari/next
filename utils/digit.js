import { consoleLog } from './config'

export const getEnDigit = (digit) => {
  return digit == null? null : Array.from(digit).map((character, index) => (
    isNaN(Number(character))? // english
      isNaN(String.fromCharCode(digit.charCodeAt(index) - 1728))? // farsi
        isNaN(String.fromCharCode(digit.charCodeAt(index) - 1584))? // arabic
        '-' :
        String.fromCharCode(digit.charCodeAt(index) - 1584) :
      String.fromCharCode(digit.charCodeAt(index) - 1728) :
    character
  )).join('')
}

export const getFaDigit = (digit, shouldNormalized) => {
  if (digit == null) {
    return '۰'
  }
  if (isNaN(Number(digit))) {
    return digit
  }
  if (shouldNormalized) {
    digit = Math.round(digit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  let ret = ''
  digit = digit.toString()
  for (var i = 0, len = digit.length; i < len; i++) {
    var num = digit.charCodeAt(i)
    if (!isNaN(Number(digit[i]))) {
      num = digit.charCodeAt(i) + 1728
    }
    ret += String.fromCharCode(num)
  }
  return ret
}
