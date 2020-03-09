import {CapilizeString, UncapilizeString} from './string'

export const ln = (message) => {
  if (!message || typeof(message) != 'string') return message
  if (language && language.messages) {
    if (!language.messages[message]) {
      return language.messages[message.toLowerCase()] &&
        language.messages[message.toLowerCase()][language.key] ||
        message &&
        message.replace(/_/g, ' ') || null
    }
    return language.messages[message][language.key]
  }
}

export const language = {
  key: 'fa',
  locale: {fa: 'fa-IR', en: 'en-US'},
  direction: {fa: 'rtl', en: 'ltr'},
  align: {fa: 'right', en: 'left'},
  reverseAlign: {fa: 'left', en: 'right'},
  margin: {fa: 'marginRight', en: 'marginLeft'},
  name: {fa: 'farsi', en: 'english'},
  messages: {
    requests: {fa: 'درخواست‌ها', en: 'Requests'},
    mainInfo: {fa: 'اطلاعات پایه', en: 'Main Info'},
    personalInfo: {fa: 'اطلاعات شخصی', en: 'Personal Info'},
    additionalInfo: {fa: 'اطلاعات تکمیلی', en: 'Additional Info'},
    requests: {fa: 'درخواست‌ها', en: 'Requests'},
    allRequests: {fa: 'همه درخواست‌ها', en: 'All Requests'},
    visa: {fa: 'ویزا', en: 'Visa'},
    embassyAppointment: {fa: 'وقت سفارت', en: 'Embassy Appointment'},
    embassy: {fa: 'وقت سفارت', en: 'Embassy Appointment'},
    embassy_appointment: {fa: 'وقت سفارت', en: 'Embassy Appointment'},
    downloads: {fa: 'دانلودها', en: 'Downloads'},
    submitRequest: {fa: 'ثبت سفارش', en: 'Submit Request'},
    loginSignup: {fa: 'ورود/ثبت‌نام', en: 'Login/Signup'},
    order_description: {fa: 'توضیحات', en: 'Description'},
    uploads: {fa: 'فایل‌های بارگذاری شده', en: 'Uploads'},
    date: {fa: 'تاریخ', en: 'Date'},
    true: {fa: 'بله', en: 'Yes'},
    false: {fa: 'خیر', en: 'No'},

    USA: {fa: 'دلار آمریکا', en: 'USA'},
    CAD: {fa: 'دلار کانادا', en: 'CAD'},
    EUR: {fa: 'یورو', en: 'EUR'},
    IRR: {fa: 'تومان', en: 'IRR'},

    RECEIVED: {fa: 'ثبت شده', en: 'RECEIVED'},
    INPROGRESS: {fa: 'در حال انجام', en: 'INPROGRESS'},
    UPDATENOTE: {fa: 'پیام جدید', en: 'UPDATENOTE'},
    PAYMENTREQUIRED: {fa: 'در انتظار پرداخت', en: 'PAYMENTREQUIRED'},
    INCOMPLETEINFO: {fa: 'ناقص', en: 'INCOMPLETEINFO'},
    REJECT: {fa: 'رد شده', en: 'REJECT'},
    EMBASSYREJECT: {fa: 'رد وقت سفارت', en: 'EMBASSYREJECT'},
    VISAACCEPT: {fa: 'قبول ویزا', en: 'VISAACCEPT'},
    DONE: {fa: 'انجام شده', en: 'DONE'},
  }
}
