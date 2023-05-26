import validateUtil from '@/utils/validateUtil'

export default {
  mobile (rule, value, cb) {
    if (validateUtil.validateMobile(value)) {
      return cb()
    }
    cb(new Error('手机格式不正确'))
  },
  mobileOrTel (rule, value, cb) {
    if (validateUtil.validateMobile(value) || validateUtil.validateTel(value)) {
      return cb()
    }
    cb(new Error('电话号码格式不正确'))
  },
  positiveInt (rule, value, cb) {
    if (validateUtil.validateInt(value)) {
      return cb()
    }
    cb(new Error('必须是整数，并且大于0'))
  },
  // 数字
  number (rule, value, cb) {
    if (validateUtil.validateNumber(value)) {
      return cb()
    }
    cb(new Error('必须是数字'))
  },
  // 正数
  positiveNumber (rule, value, cb) {
    if (validateUtil.validatePositiveNumber(value)) {
      return cb()
    }
    cb(new Error('必须是数字，并且大于0'))
  },
  // 价格
  price (rule, value, cb) {
    if (validateUtil.validatePrice(value)) {
      return cb()
    }
    cb(new Error('价格格式不正确'))
  },
  // 价格,最多4位小数
  price4Precision (rule, value, cb) {
    if (validateUtil.validatePrice4Precision(value)) {
      return cb()
    }
    cb(new Error('价格格式不正确'))
  },
  // 百分比
  percent (rule, value, cb) {
    if (validateUtil.validatePercent(value)) {
      return cb()
    }
    cb(new Error('百分比格式不正确'))
  }
}
