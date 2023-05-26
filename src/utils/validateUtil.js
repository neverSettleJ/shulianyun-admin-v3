export default {
	validateEmail (email) {
		if (!email) {
			return true
		}
		const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
		if (emailReg.test(email)) {
			return true
		} else {
			return false
		}
	},
	validateMobile (mobile) {
		if (!mobile) {
			return true
		}
		const mobileReg = /^1\d{10}$/
		if (mobileReg.test(mobile)) {
			return true
		} else {
			return false
		}
	},
	validateTel (val) {
		if (!val) {
			return true
		}
		const reg = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/
		if (reg.test(val)) {
			return true
		} else {
			return false
		}
	},
	validatePwd (password) {
		if (!password) {
			return true
		}
		const pwdReg = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/
		if (pwdReg.test(password)) {
			return true
		} else {
			return false
		}
	},
	// 正整数
	validateInt (number) {
		if (!number) {
			return true
		}
		const numberReg = /^[1-9]\d*$/
		if (numberReg.test(number)) {
			return true
		} else {
			return false
		}
	},
	// 数字
	validateNumber (number) {
		if (!number) {
			return true
		}
		const numberReg = /^(-?\d*)(.\d*)?$/
		if (numberReg.test(number)) {
			return true
		} else {
			return false
		}
	},
	// 正数
	validatePositiveNumber (number) {
		if (this.validateNumber(number)) {
			return parseFloat(number) > 0
		} else {
			return false
		}
	},
	// 价格3位小数
	validatePrice (val) {
		if (!val) {
			return true
		}
		const numberReg = /^(\d*)(.\d{1,3})?$/
		if (numberReg.test(val)) {
			return true
		} else {
			return false
		}
	},
	// 价格4位小数
	validatePrice4Precision (val) {
		if (!val) {
			return true
		}
		const numberReg = /^(\d*)(.\d{1,4})?$/
		if (numberReg.test(val)) {
			return true
		} else {
			return false
		}
	},
	validatePercent (val) {
		if (this.validatePositiveNumber(val)) {
			return parseFloat(val) <= 100
		} else {
			return false
		}
	}
}
