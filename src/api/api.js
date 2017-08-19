/**
 * Created by Jooff on 2017/8/17.
 */
import Vue from 'vue'

export default {
  /**
   * 单词查询
   * @returns {null}
   */
  queryWord (queryWord) {
    return  Vue.http.get('/q?q=' + queryWord)
  }

}
