import Jalaali from 'jalaali-js'
import { getFaDigit, } from "./digit"

export const getPersianFullDate = (fullDate) => {
  fullDate = fullDate.indexOf('T') == -1? fullDate : fullDate.substr(0, fullDate.indexOf('T'))
  const date = fullDate.split('-')
  const persianDate = Jalaali.toJalaali(Number(date[0]), Number(date[1]), Number(date[2]))
  let month
  switch (persianDate.jm) {
    case 1:
      month = 'فروردین'
      break
    case 2:
      month = 'اردیبهشت'
      break
    case 3:
      month = 'خرداد'
      break
    case 4:
      month = 'تیر'
      break
    case 5:
      month = 'مرداد'
      break
    case 6:
      month = 'شهریور'
      break
    case 7:
      month = 'مهر'
      break
    case 8:
      month = 'آبان'
      break
    case 9:
      month = 'آذر'
      break
    case 10:
      month = 'دی'
      break
    case 11:
      month = 'بهمن'
      break
    case 12:
      month = 'اسفند'
      break

  }

  const dd = getFaDigit(persianDate.jd)
  const mm = getFaDigit(persianDate.jm)
  const yy = getFaDigit(persianDate.jy.toString().substr(2))

  return ({
    fullDate: dd + ' ' + month + ' ' + yy,
    brief: yy + '/' + mm + '/' + dd
  })
}

export const isDateEqual = (date1, date2) => {
  if (
    date1.getFullYear() == date2.getFullYear() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getDate() == date2.getDate()
  ) {
    return true
  }
  return false
}

export const getToday = () => {
  const today = new Date()
  return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
}
