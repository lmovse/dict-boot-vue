<template>
  <li>
    <div class="colloc-info">
      <p class="colloc-en">{{collocate.colloc}}</p>
      <p class="colloc-cn">{{collocate.collocTrans}}</p>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'CollocItem',
    data() {
      return {}
    },
    props: ['collocate']
  }
</script>

<style scoped>
  ul {
    -webkit-padding-start: 0;
    padding-left: 0;
    margin-left: 0;
  }
  li {
    list-style: none;
  }
</style>
