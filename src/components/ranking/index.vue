<template>
    <div>
      <div class="paimingBox">
        <div class="lineText"  v-for="(o, ind) in data" :key="ind">
          <div class="leftT">
            <span class="num">{{ind + 1}}</span><span class="t">{{ o.title || o.city}}</span>
          </div>
          <div class="rightT">
            {{o.num || o.value}}
          </div>
        </div>
      </div>
      
      
    </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: ['data'],
  methods: {
    handelClick(e) {
      console.log(e, "点了地图");
    }
  }
};
</script>

<style scoped>
  .lineText{
    display: flex;
    justify-content: space-between;
    color: #fff;
    opacity: .85;
    font-size: 14px;
    margin-bottom: 8px;
    line-height: 33px;
    padding: 0 15px;
  }
  .lineText:nth-child(2n-1){
    background: #1d2851;
  }
  .lineText .leftT span.num{
    display: inline-block;
    width: 18px;
    height: 20px;
    margin-right: 12px;
    vertical-align: middle;
    /* margin-top: -3px; */
    text-align: center;
    line-height: 16px;
  }
  .lineText:nth-child(1) .leftT span.num{
    background: url(../../assets/img/icon/icon_paiming.png) no-repeat;
  }
  .lineText:nth-child(2) .leftT span.num{
    background: url(../../assets/img/icon/icon_paiming.png) -20px 0 no-repeat;
  }
  .lineText:nth-child(3) .leftT span.num{
    background: url(../../assets/img/icon/icon_paiming.png) -40px 0 no-repeat;
  }
</style>
