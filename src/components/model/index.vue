<template>
  <div class="model" :style="`width: ${width}px;height: ${height}px;top: ${top}px;left: ${left}px;background:url(${img}) center no-repeat; ${propstyle || ''}`">
    <slot v-if="isShow"></slot>
  </div>
</template>

<script>
export default {
  name: "page1",
  data() {
    return {
      width: 0,
      height: 0,
      isShow: false
    };
  },
  props: {
    img: {
      type: String,
      default: ''
    },
    left: Number,
    top: Number,
    propwidth: {
      default: 0
    },
    propheight: {
      default: 0
    },
    propstyle: String
  },
  created() {
    if (this.propwidth) {
      this.width = this.propwidth;
    }
    if (this.propheight) {
      this.height = this.propheight;
    }
    if (this.img) {
      let _ = this,
        img = new Image();
      img.onload = function() {
        _.width = this.width;
        _.height = this.height;
        _.isShow = true;
      };
      img.src = this.img;
    }else{
      this.isShow = true;
    }
  }
};
</script>  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.model {
  position: absolute;
}
</style>
