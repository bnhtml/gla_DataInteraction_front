<template>
  <div class="centerblock">
    <div class="rotate rot1" :style="`background: url(${model1.img}) no-repeat;left:${model1.left}px; top: ${model1.top}px`">
      
    </div>
    <div class="rotate rot2" :style="`background: url(${model2.img}) no-repeat;left:${model2.left}px; top: ${model2.top}px`">
      
    </div>
    <div class="rotate rot3" :style="`background: url(${model3.img}) no-repeat;left:${model3.left}px; top: ${model3.top}px`">
      
    </div>
    <div class="animation" :class="'animation' + ' ani' + i" v-for="(model, i) in models" :key="model.img" @click="$emit('linkClick', i)" @mouseover="$emit('linkOver', i)"  @mouseout="$emit('linkOut', i)">
      <div :style="`background: url(${model.img}) no-repeat;left:${model.left}px; top: ${model.top}px; width: ${model.width}px; height: ${model.height}px;position:absolute;`" class="g-up-dom">
          <p v-html="model.title"></p>
      </div>
    </div>
    
  </div>
</template>
<script>
import model from "@/components/model";
const img = require("../../assets/img/special/pao.png");
export default {
  name: "page1",
  props:['bussnessCount','dataAssetsReporting'],
  data() {
    return {
      models: [
        {
          img,
          left: 0,
          top: 0,
          width: 135,
          height: 135,
          title: '业务系统'
        },
        {
          img,
          left: 400,
          top: 0,
          width: 135,
          height: 135,
          title: 'IT基础资源'
        },
        {
          img,
          left: 0,
          top: 400,
          width: 135,
          height: 135,
          title: '数据资产<br/>填报情况'
        },
        {
          img,
          left: 400,
          top: 400,
          width: 135,
          height: 135,
          title: '总投入资金'
        }
      ],
      model1: {
        img: require("../../assets/img/special/yuan3.png"),
        left: 0,
        top: 0
      },
      model2: {
        img: require("../../assets/img/special/yuan2.png"),
        left: 86,
        top: 86
      },
      model3: {
        img: require("../../assets/img/special/yuan1.png"),
        left: 112,
        top: 112
      }
    };
  },
  methods:{
  },
  components: { model }
};
</script>
<style lang='scss' scoped>
@keyframes updown
{
0% {top: -20px;}
50% {top: 0;}
100% {top: -20px;}
}
@keyframes rotation{
from {-webkit-transform: rotate(0deg);}
to {-webkit-transform: rotate(360deg);}
}
@keyframes inverseRotation{
from {-webkit-transform: rotate(360deg);}
to {-webkit-transform: rotate(0deg);}
}
.animation {
  animation: updown 3s 0s ease-in-out infinite;
  position: relative;
  
}
.ani2, .ani0{
  animation-delay: .2s;
}
.ani3{
    .g-up-dom{
      cursor: default;
    }
  }
.rotate{
  position: absolute;
  transform: rotate(360deg);
}
.rot1{
  width: 546px;
  height: 546px;
  animation: rotation 3s linear infinite;
}
.rot2{
  width: 373px;
  height: 373px;
  animation: inverseRotation 3s linear infinite;
}
.rot3{
  width: 322px;
  height: 322px;
  animation: rotation 5s linear infinite;
}
.g-up-dom{
  font-size: 24px;
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
    background-image: url(../../assets/img/special/paohover.png) !important;
  }
}
</style>
