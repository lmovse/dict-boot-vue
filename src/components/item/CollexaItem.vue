<template>
  <li>
    <div class="collexa-info">
      <p class="collexa-en">{{collexa.collexa}}</p>
      <p class="collexa-cn">{{collexa.collexaTrans}}</p>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'CollexaItem',
    data() {
      return [];
    },
    props: ['collexa']
  }
</script>

<style scoped>
  li {
    list-style: none;
  }
</style>
