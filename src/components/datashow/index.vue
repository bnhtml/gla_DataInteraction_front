<template>
  <div class="dataShowBox">
    <img class="icon" :src="data.icon" />
    <div class="textBox">
      <h2>{{data.name}}</h2>
      <p :style="`color: ${data.numColor[0]};`">{{data.value | number_format(data.point || 0)}}<span>{{data.unit}}</span></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "datashow",
    data() {
      return {};
    },
    props: ["data"]
  };
</script>

<style lang="scss" scoped>
  .dataShowBox {
    width: 100%;
    height: 74px;
    clear: both;
  }
  .dataShowBox .icon {
    display: block;
    width: 50px;
    height: 50px;
    float: left;
    margin-right: 8px;
  }
  .textBox {
    float: left;
    width: 150px
  }
  .textBox h2 {
    color: rgba(255, 255, 255, .85);
    font-size: 14px;
  }
  .textBox p {
    font-size: 25px;
    white-space: nowrap;
  }
  .textBox p span {
    font-size: 14px;
  }
</style>
