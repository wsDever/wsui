let rules = {
  phone: /^1[0-9]{10}$/, // 手机号码
  homePhone: /^0\d{2,3}-?\d{7,8}$/, // 座机号码
  postcode: /^[1-9]\d{5}$/, // 邮政编码
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, // 邮箱
  name: /.*[\u4e00-\u9fa5]+.*$/, // 姓名
  income: /^(([1-9][0-9]*)|(0)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, // 年收入
  bank: /^([1-9]{1})(\d{14,18})$/,  // 银行卡号
  password: /^\d{6}$/, // 密码
  capture: /^\d{4}$/ // 图形验证码
}

let valid = {
  testPhone(val) {
    return rules.phone.test(val)
  },
  testHomePhone(val){
    return rules.homePhone.test(val);
  },
  testEmail(val) {
    return rules.email.test(val)
  },
  testPostcode(val) {
    return rules.postcode.test(val)
  },
  testName(val){
    return rules.name.test(val)
  },
  testIncome(val){
    return rules.income.test(val)
  },
  testBank(val) {
    return rules.bank.test(val);
  },
  testPass(val) {
    return rules.password.test(val);
  },
  testCapture(val) {
    return rules.capture.test(val);
  },
  testIdCard: function (value, values) {
    //该方法由佚名网友提供;
    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子;
    var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值，10代表X;
    if (value.length === 15) {
      return isValidityBrithBy15IdCard(value);
    } else if (value.length === 18) {
      var a_idCard = value.split(''); // 得到身份证数组
      if (isValidityBrithBy18IdCard(value) && isTrueValidateCodeBy18IdCard(a_idCard)) {
        return true;
      }
      return false;
    }
    return false;

    function isTrueValidateCodeBy18IdCard(a_idCard) {
      var sum = 0; // 声明加权求和变量
      if (a_idCard[17].toLowerCase() === 'x') {
        a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
      }
      for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i]; // 加权求和
      }
      var valCodePosition = sum % 11; // 得到验证码所位置
      if (a_idCard[17] * 1 === ValideCode[valCodePosition] * 1) {
        return true;
      }
      return false;
    }
    function isValidityBrithBy18IdCard(idCard18) {
      var year = idCard18.substring(6, 10);
      var month = idCard18.substring(10, 12);
      var day = idCard18.substring(12, 14);
      var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day), 1, 0, 0);

      // 这里用getFullYear()获取年份，避免千年虫问题
      if (
        temp_date.getFullYear() * 1 !== parseFloat(year) ||
        temp_date.getMonth() * 1 !== parseFloat(month) - 1 ||
        temp_date.getDate() * 1 !== parseFloat(day)
      ) {
        return false;
      }
      return true;
    }

    function isValidityBrithBy15IdCard(idCard15) {
      var year = idCard15.substring(6, 8);
      var month = idCard15.substring(8, 10);
      var day = idCard15.substring(10, 12);
      var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
      // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
      if (
        temp_date.getYear() * 1 !== parseFloat(year) ||
        temp_date.getMonth() * 1 !== parseFloat(month) - 1 ||
        temp_date.getDate() * 1 !== parseFloat(day)
      ) {
        return false;
      }
      return true;
    }
  },
}

export { rules, valid as default } 