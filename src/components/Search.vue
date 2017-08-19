<template>
  <div class="container-fluid main" style="padding-left: 0; padding-right: 0">
    <div class="edit-text">
      <div style="font-size: 18px; color: white; padding: 16px">Mouse 翻译</div>
      <div>
        <input class="input-text" type="text" placeholder="请输入您要查找的单词" autofocus="autofocus" v-model="queryWord"/>
      </div>
      <button class="btn btn-danger button-search" @click="query">查找</button>
      <div class="spinner" v-show="isSearch">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
    <div class="content" v-if="word">
      <div id="base">
        <div id="word" class="word" v-html="word"></div>
        <div class="count">本单词共查询：<span id="count">{{ count }}</span> 次</div>
      </div>
      <div id="trans">
        <ul class="colloc-result" v-if="collocates.length">
          <colloc-item
            v-for="item in collocates"
            :collocate="item"
            :key="item.colloc">
          </colloc-item>
        </ul>
      </div>
      <div id="phrase">
        <ul class="collexa-result" v-if="collocates.length">
          <collexa-item
            v-for="item in collocates"
            :collexa="item"
            :key="item.collexa">
          </collexa-item>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api/api'
  import CollocItem from '@/components/item/CollocItem'
  import CollexaItem from "@/components/item/CollexaItem";
  import bootstrap from '@/assets/js/bootstrap.min.js'

  export default {
    name: 'dict',
    data () {
      return {
        queryWord: '',
        isSearch: false,
        word: '',
        collocates: [],
        count: 0
      }
    },
    components: {
      CollexaItem,
      'colloc-item': CollocItem,
      'collexa-item': CollexaItem
    },
    methods: {
      query: function () {
        this.isSearch = true;
        api.queryWord(this.queryWord).then(response => {
          var result = response.data.data;
          this.isSearch = false;
          if (result.etymology === "") {
            this.word = result.wordName
              + "<br><br>"
              + (result.pron === '' ? '' : result.pron + '<br><br>')
          } else {
            this.word = result.wordName
              + "<br><br>"
              + (result.pron === '' ? '' : result.pron + '<br><br>')
              + result.etymology
              + '<br><br>';
          }
          this.count = result.queryAccount;
          var cos = [];
          result.senses.forEach(function (item) {
            item.collosections.forEach(function (collosection) {
              collosection.collocates.forEach(function (collocate, index) {
                cos[index] = collocate;
              })
            })
          })
          this.collocates = cos;
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/bootstrap.min.css";

  ul {
    margin-left: 0;
    padding-left: 0;
    padding-bottom: 10px;
  }

  .button-search {
    background-color: #FF4351;
    border-color: #FF4351;
    width: 100px;
    margin-left: 60%;
    margin-top: 15%
  }

  html, #body .edit-text {
    height: 35%;
    background-color: #5f9ea0;
  }

  .main {
    background: white;
    height: 100%;
  }

  @media (min-width: 610px) {
    .main {
      background: white;
      width: 800px;
      margin: 16px auto;
      height: 95%;
      border-radius: 6px;
    }

    .button-search {
      background-color: #FF4351;
      border-color: #FF4351;
      margin-left: 70%;
      margin-top: 8%
    }

    .edit-text {
      border-radius: 6px 6px 0 0;
    }
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #eeefff;
  }

  .input-text {
    font-size: 16px;
    height: 20px;
    padding-left: 16px;
    background: none;
    outline: none;
    border: none;
    color: white
  }

  .content {
    overflow-y: auto;
    height: 65%;
  }

  .content::-webkit-scrollbar {
    display: none
  }

  #base {
    border-radius: 6px;
    background-color: khaki;
    color: #2f2f2f;
    padding: 16px;
    margin: 10px;
    height: auto;
  }

  #trans {
    color: #2f2f2f;
    padding: 16px 16px 0 16px;
    margin: 10px;
    background-color: pink;
    border-radius: 6px;
    height: auto;
  }

  #phrase {
    padding: 16px 16px 0 16px;
    margin: 10px;
    color: #2f2f2f;
    background-color: burlywood;
    border-radius: 6px;
    height: auto;
  }

  .spinner {
    width: 60px;
    height: 60px;
    position: relative;
    margin: 150px auto;
  }

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #67CF22;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: bounce 2.0s infinite ease-in-out;
    animation: bounce 2.0s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes bounce {
    0%, 100% {
      -webkit-transform: scale(0.0)
    }
    50% {
      -webkit-transform: scale(1.0)
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    }
    50% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
</style>
