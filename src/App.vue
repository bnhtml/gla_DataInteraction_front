<template>
  <div id="app" ref='app'>
   <!--  <keep-alive>  --><router-view /> <!-- </keep-alive> -->
  </div>
</template>

<script type='text/javascript'>
  export default {
    name: 'App',
    data () {
      return {
      }
    },
  }
</script>

<style lang='scss' scoped>
  @import '../src/assets/style/base/index.scss';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    @include nums($w: 100%, $h:100%);
    color:rgba(255,255,255,0.85);
  }
</style>
