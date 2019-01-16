<!--  专题分析 - 表格 -->
<template>
  <div class='my-title'>
    <img src="../../assets/img/icon/special_left_1.png" alt=""> {{title}}
    <img src="../../assets/img/icon/special_right_1.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'mTitle',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "@/assets/style/base/index.scss";
  .my-title {
    @include nums($w: 100%, $h:50px);
    text-align: center;
    line-height: 50px;
    @include font($fz: 20px, $color:#9ED7FF);
    background: rgba(158, 215, 255, 0.10);
    border: 1px solid #1A5182;
    box-sizing: border-box;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.40);
    font-family: 'PingFangSC-Medium';
    img {
      margin: 0 10px;
    }
  }
</style>
