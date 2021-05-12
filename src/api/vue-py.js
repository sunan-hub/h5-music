/*
 * @Descripttion: 实现汉字转拼音功能，只返回第一个首字母
 * @Author: 清香<ivestszheng@qq.com>
 * @Date: 2020-12-11 14:50:38
 * @LastEditTime: 2020-12-11 15:13:50
 */
import { pinyin } from './const.js'
export default {
  chineseToPinYin: function (l1) {
    var l2 = l1.length
    var I1 = ''
    var reg = new RegExp('[a-zA-Z0-9]')
    for (var i = 0; i < l2; i++) {
      var val = l1.substr(i, 1)
      var name = this.arraySearch(val, pinyin)
      if (reg.test(val)) {
        I1 += val
      } else if (name !== false) {
        I1 += name
      }
    }
    I1 = I1.replace(/ /g, '-')
    while (I1.indexOf('--') > 0) {
      I1 = I1.replace('--', '-')
    }
    // return I1
    return I1[0]  //只需要第一个字母
  },
  arraySearch: function (l1, l2) {
    for (var name in pinyin) {
      if (pinyin[name].indexOf(l1) !== -1) {
        return this.ucfirst(name)
      }
    }
    return false
  },
  ucfirst: function (l1) {
    if (l1.length > 0) {
      var first = l1.substr(0, 1).toUpperCase()
      var spare = l1.substr(1, l1.length)
      return first + spare
    }
  }
}
