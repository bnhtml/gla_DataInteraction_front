<template>
  <div class="lineAnimate" @click="focus" ref="lineBox"><div class="line" ref="underline"></div><slot>没有任何东西</slot></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    document.addEventListener("click", this.blur);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.blur);
  },
  props: ["animate"],
  methods: {
    focus() {
      this.$refs.underline.style = `width: 100%; left: 0;`;
    },
    blur(event) {
      if(event.path.indexOf(this.$refs.lineBox) === -1){
        this.$refs.underline.style = "";
      }
    }
  }
};
</script>
<style scoped>
.lineAnimate {                                                                                             
  min-width: 10px;
  display: inline-block;
  position: relative;
}
.lineAnimate .line {
  height: 1px;
  background: #2d8cf0;
  position: absolute;
  width: 0;
  bottom: -1px;
  z-index: 99999;
  left: 50%;
  transition: all 300ms ease-in-out;
}
</style>
