<template>
  <div class="mapouterBox" v-if="jsonUrl">
    <div class="callBack" @click="callBack" v-show="backShow"><i class="iconfont icon-qiehuan"></i>查看全省</div>
    <div class="shadowBox" :class="backShow ? 'alphaBg' : ''">
      <div class="EMap" ref="map" :style="'width:' + width + 'px;height:' + height + 'px'"></div>
    </div>
    <div class="shengzhi" :class="{act: starCheck}" :title="STARNAME" v-if="!nohaveStar">
      <div class="g-star-icon" @click="clickStar"></div>
      <p>{{STARNAME}}</p>
    </div>
    <!-- <div class="miniMap" ref="miniMap" :style="'width:' + width / 2 + 'px;height:' + height / 2 + 'px'" v-show="backShow"></div> -->
  </div>
</template>

<script>
import { association, cityId } from "./association";
const STARNAME = '省直部门';
export default {
  data() {
    return {
      STARNAME,
      backShow: false,
      backUrl: "",
      color: ["#144393", "#39b5fd"],
      jsonUrl: "",
      checkName: "",
      mapList: [], // 后台返回接口信息
      max: 100, // 最大值
      min: 100000
    };
  },
  props: {
    jsonCode: String,
    width: Number,
    height: Number,
    mapChat: {}
  },
  created() {
    this.backUrl = association[this.jsonCode];
    this.jsonUrl = association[this.jsonCode];
  },
  computed: {
    nohaveStar(){
      let pathNameArr=['ITcityState','businessCityState','warningCityState'];
      if(pathNameArr.indexOf(this.$route.name)!=-1){
        return true
      }else{
        return false;
      }
    },
    starCheck(){
      return this.checkName === STARNAME;
    }
  },
  mounted() {
    // 检测窗口变化
    eventBus.$on("RESIZE", this.fnResize);
    let mapDom = this.$refs.map;
    let echarts = this.$echarts;
    let names = {
      黔西南州: "黔西南布依族苗族自治州",
      黔南州: "黔南布依族苗族自治州",
      黔东南州: "黔东南苗族侗族自治州",
      铜仁市: "同仁市"
    };
    this.mapChart = echarts.init(mapDom);
    this.mapChart.on("click", params => {
      if(this.checkName === params.data.name){
        this.callBack();
        return;
      }
      var city =
        params.data.id.length === 4
          ? "geometryCouties/" + params.data.id + "00"
          : "";
      if (city) {
        this.$emit("mapClick", {
          name: params.data.name,
          id: cityId[params.data.name]
        });
        // this.jsonUrl = city;
        this.checkName = params.data.name;
        this.changeMap();
      }
    });
    this.getMapList();
    setTimeout(() => {
      this.fnResize();
    }, 0);
  },
  methods: {
    clickStar(){
      this.checkName = this.checkName === STARNAME ? '' : STARNAME;
      this.changeMap();
      let name = this.checkName ? STARNAME : '返回首页'
      this.$emit('mapClick', name);
    },
    fnResize() {
      try {
        let parent = this.$refs.map.parentNode;
        if (parent && parent.clientWidth && parent.clientHeight) {
          this.mapChart.resize({
            width: parent.clientWidth,
            height: parent.clientHeight - 20
          });
        }
      } catch (err) {}
    },
    changeMap: function() {
      let baseUrl = window.location.origin + window.location.pathname;
      this.axios
        .get(baseUrl + "static/mapdata/" + this.jsonUrl + ".json")
        .then(res => {
          this.$echarts.registerMap(this.jsonCode, res.data);
          let nameMap = {
            黔西南布依族苗族自治州: "黔西南州",
            黔南布依族苗族自治州: "黔南州",
            黔东南苗族侗族自治州: "黔东南州",
            铜仁地区: "铜仁市",
            毕节地区: "毕节市"
          };
          // let isFather = this.jsonUrl === "geometryProvince/52";
          let isFather = this.checkName === "";
          let showTooltip = isFather ? true : false;
          let guianxinqu = 0;
          let data = res.data.features.map(o => {
            let value = NaN;
            if (
              nameMap[o.properties.name] == this.checkName ||
              o.properties.name == this.checkName
            ) {
              if (this.mapList.length) {
                this.mapList.forEach((v, i) => {
                  if (
                    nameMap[o.properties.name] == v.city ||
                    o.properties.name == v.city
                  ) {
                    value = v.countnum;
                  }
                });
              }

            }
            // let value = parseInt(
            //   this.$getrandom(
            //     "mapdata" + this.jsonUrl + o.properties.name,
            //     this.max
            //   )
            // );
            if (this.mapList.length && isFather) {
              this.mapList.forEach((v, i) => {
                if (
                  nameMap[o.properties.name] == v.city ||
                  o.properties.name == v.city
                ) {
                  value = v.countnum;
                }
              });
            }

            return {
              name: nameMap[o.properties.name] || o.properties.name,
              value: value,
              id: o.properties.id
            };
          });
          let title = "";
          if (this.$route.name == "businessIndex") {
            title = "业务系统总投入资金（万元）";
          } else if (this.$route.name == "ITBasicResources") {
            title = "IT基础资源总投入资金（万元）";
          } else if (this.$route.name == "assetWarning") {
            title = "资产填报预警指数";
          } else {
            title = "业务系统数量";
          }
          let option = {
            tooltip: {
              trigger: "item",
              show: showTooltip,
              confine: true,
              backgroundColor: "transparent",
              formatter: p => {
                let dataCon = p.data,
                  txtCon = `<div style="padding:0 14px;line-height: 50px;background:rgba(0, 0, 0, .75);color:#fff;">${title}：${
                    dataCon.value
                  }</div>`;
                return txtCon;
              }
            },
            visualMap: {
              type: "continuous",
              splitNumber: 4,
              outOfRange: {
                color: ["#999"],
                symbol: 'circle'
              },
              max: this.max,
              min: this.min,
              range: [this.min, this.max],
              calculable: true,
              color: this.color,
              textStyle: {
                color: "#ffffff"
              },
              show: true,
              bottom: "0",
              right: "center",
              orient: "horizontal",
              itemWidth: 13,
              itemHeight: 400
            },
            series: [
              {
                zoom: 1.1,
                type: "map",
                top: '5%',
                mapType: this.jsonCode,
                roam: false,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: "inside",
                    textStyle: {
                      color: "#ffffff"
                    }
                  },
                  emphasis: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: true
                    },
                    borderColor: "#1c2851",
                    areaColor: '#aaa'
                  },
                  emphasis: {
                    label: {
                      show: true
                    }
                  }
                },
                nameMap,
                data
              }
            ]
          };
          this[["mapChart"][0]].setOption(option);
        });
    },
    callBack() {
      this.$emit("mapClick", "返回首页");
      // this.jsonUrl = this.backUrl;
      this.checkName = "";
      this.changeMap();
    },
    getMapList() {
      let info = {
        businessIndex: { api: this.$api.areaGroup, params: { areapid:-1 } },
        businessCityState: { api: this.$api.areaGroup, params: { areapid: -1 } },
        ITBasicResources: {
          api: this.$api.ITBasic.mapDatas,
          params: { areapid: -1 }
        },
        ITcityState: {
          api: this.$api.ITBasic.mapDatas,
          params: { areapid: -1 }
        },
        assetWarning: {
          api: this.$api.warning.mapDatas,
          params: { areaids: 0 }
        },
        warningCityState: {
          api: this.$api.warning.mapDatas,
          params: { areaids: -1 }
        },
      }[this.$route.name];
      if (info.api) {
        info.api(info.params).then(res => {
          let idx = res.data.map(o => o.city || o.areaname).indexOf("贵安新区");
          let guianxinqu = res.data[idx];
          res.data.splice(idx, 1);
          guianxinqu = parseFloat(guianxinqu["countnum"] || guianxinqu["err"]);
          this.mapList = res.data.map(o => {
            if ((o.city || o.areaname) === "贵阳市") {
              o.err = parseFloat(o.countnum || o.err);
            }
            return {
              countnum: o.err || o.countnum,
              city: o.areaname || o.city
            };
          });
          this.mapList.forEach((v, i) => {
            if (v.countnum > this.max) {
              this.max = parseInt(v.countnum) + 1;
            }
            if (v.countnum < this.min) {
              this.min =
                parseInt(v.countnum) - 1 < 0 ? 0 : parseInt(v.countnum) - 1;
            }
          });
          this.changeMap();
        });
      } else {
        this.changeMap();
      }
    }
  },
  watch: {
    jsonUrl: function(newStr, oldStr) {
      this.backShow = this.backUrl !== newStr;
    },
    checkName: function(newStr, oldStr) {
      this.backShow = '' !== newStr;
    }
  },
  beforeDestroy() {
    window.eventBus.$off("mapClick");
  }
};
</script>

<style scoped>
.mapouterBox {
  position: relative;
  clear: both;
}
.Emap {
  width: 400px;
  height: 300px;
}
/* .shadowBox{
  width: 100%;
  height: 100%;
  background: rgb(26,81,130, .2);
  filter: blur(0px);
  transition: all .5s 0 ease-in-out;
}
 .alphaBg{
  filter:blur(5px);
}
.miniMap{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
} */
.callBack {
  cursor: pointer;
  color: #fff;
  position: absolute;
  font-size: 16px;
  left: 30px;
  top: 30px;
  z-index: 99999999;
}
.callBack i {
  margin-right: 6px;
}
.visualMap {
  float: right;
  width: 240px;
  height: 10px;
  border-radius: 5px;
}
.shengzhi{
  position: absolute;
  left: 51%;
  top: 41%;
  cursor: pointer;
}
.shengzhi p{
  text-align: center;
  margin-left: -50%;
  display: none;
}
.g-star-icon{
  background: url(../../../assets/img/icon/star_nocheck.png) center no-repeat;
  width: 16px;
  height: 16px;
  transition: transform .5s ease-in-out;
}
.act p{
  color: #ff468f;
  display: block;
}
.act .g-star-icon{
  transform: scale(1.5, 1.5);
  background-image: url(../../../assets/img/icon/star_check.png);
}
</style>

