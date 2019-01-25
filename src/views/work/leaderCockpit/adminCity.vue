<!--  -->
<template>
<div class='leaderCockpit'>
      <el-card shadow="always" class="g-top">
        <p class="titleLeftBorder">{{typeName}}接口概况</p>
        <el-row >
            <el-col :span="8" v-for='(v,i) in top' :key='i'>
                <dl>
                    <dt><img :src="v.img" alt=""></dt>
                    <dd>
                        <p>{{v.title}}</p>
                        <p>{{v.num}}</p>
                    </dd>
                </dl>
            </el-col>
        </el-row>
        <div class="g-bar" style="height: 350px">
          <newBar v-if="isShow" :bar="barData" :series="barDataSeries"></newBar>
			</div>
    </el-card>
    <el-card shadow="always" class="mt20 g-middle">
        <p class="titleLeftBorder">{{typeName}}已封装接口概况</p>
        <el-row :gutter="20">
            <el-col :span="6" v-for='(v,i) in middle' :key='i'>
                <dl v-if='i==0' :style="{background:'url('+v.img+') no-repeat center center','backgroundSize':'cover'}">
                    <dt>{{v.title}}</dt>
                    <dd>{{v.num}}</dd>
                </dl>
                <dl v-else class="border">
                    <dt>
                            <p>库表类接口总数</p>
                            <p>{{v.num}}</p>
                            <p>{{v.percent}}</p>
                        </dt>
                    <dd>
                        <Ring :data='v.data' :labelColor='v.labelColor' :color='v.color' :title='v.title' :hasLabel='v.hasLabel'></Ring>
                    </dd>
                </dl>
            </el-col>
        </el-row>
        <div class="g-bar" style="height: 350px">
          <newBar v-if="isShow" :bar="barData" :series="barDataSeries"></newBar>
			</div>
    </el-card>
		<!-- <el-card class="mt20">
			<p class="titleLeftBorder">
				{{typeName}}接口概况
			</p>
			<div class="g-bar" style="height: 350px">
          <newBar v-if="isShow" :bar="barData" :series="barDataSeries"></newBar>
			</div>
		</el-card> -->

        <el-row class="mt20 g-bottom">
            <el-col :span="12">
                <el-card shadow="always" class="mt20 pb10">
                    <p class="titleLeftBorder">{{typeName}}接口开放情况</p>
                    <dl v-for='(v,i) in bottom' :key='i' v-if='i<3' :style="{'border-color':v.borderColor}">
                        <dt><img :src="v.img" alt=""></dt>
                        <dd>
                            <p>{{v.num}}</p>
                            <p>{{v.title}}</p>
                        </dd>
                    </dl>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="always" class="mt20 pb10">
                    <p class="titleLeftBorder">{{typeName}}接口申请情况</p>
                    <dl v-for='(v,i) in bottom' :key='i' v-if='i>=3' :style="{'border-color':v.borderColor}">
                        <dt><img :src="v.img" alt=""></dt>
                        <dd>
                            <p>{{v.num}}</p>
                            <p>{{v.title}}</p>
                        </dd>
                    </dl>
                </el-card>
            </el-col>
        </el-row>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import newBar from "@/components/charts/bar/newBar";
import Ring from '../../../components/charts/ring/ring.vue';
import { cityId } from "@/components/charts/map/association";
const citys = Object.keys(cityId);
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { newBar,Ring },
  data() {
    //这里存放数据
    return {
      isShow: false,
      barData: {
        company: ["个"],
        height: 330,
        xData: [],
        labelnames: ["数据目录总数"]
      },
      barDataSeries: [],
      top: [{
            title: '数据目录总数',
            num: 2135,
            img: require('@/assets/images/leaderCockpit_4.png'),
        },
        {
            title: '已封装接口总数',
            num: 1135,
            img: require('@/assets/images/leaderCockpit_transparent_1.png'),
        },
        {
            title: '剩余需封装总数',
            num: 1000,
            img: require('@/assets/images/leaderCockpit_transparent_1.png'),
        },
      ],
      middle: [{
          title: '数据记录总数',
          num: '1135',
          percent: '45%',
          img: require('@/assets/images/leaderCockpit_3.png'),
      }, {
          title: '数据记录总数',
          num: '500',
          percent: '45%',
          img: require('@/assets/images/leaderCockpit_6.png'),
        "data": [{
              "value": "55.00",
              "name": "",
              "number": "55"
          }, {
              "value": "45.00",
              "name": "",
              "number": "45"
          }, ],
          "labelColor": ['#D3DBE3', '#33ABFB'],
          "color": ['#D3DBE3', '#33ABFB'],
          "hasLabel": false,
          "title": {
              "title": " "
          }
      }, {
          title: '数据记录总数',
          num: '500',
          percent: '45%',
          img: require('@/assets/images/leaderCockpit_6.png'),
          "data": [{
              "value": "55.00",
              "name": "",
              "number": "55"
          }, {
              "value": "45.00",
              "name": "",
              "number": "45"
          }, ],
          "labelColor": ['#D3DBE3', '#33ABFB'],
          "color": ['#D3DBE3', '#33ABFB'],
          "hasLabel": false,
          "title": {
              "title": " "
          }
      }, {
          title: '数据记录总数',
          num: '135',
          percent: '10%',
          img: require('@/assets/images/leaderCockpit_6.png'),
            "data": [{
              "value": "90",
              "name": "",
              "number": "90"
          }, {
              "value": "10.00",
              "name": "",
              "number": "10"
          }, ],
          "labelColor": ['#D3DBE3', '#33ABFB'],
          "color": ['#D3DBE3', '#33ABFB'],
          "hasLabel": false,
          "title": {
              "title": " "
          }
      }, ],
      bottom: [
        {
          title: "开发接口总数",
          num: this.$getrandom("开发接口总数", 3000),
          img: require("@/assets/images/leaderCockpit_line_1.png"),
          borderColor: "#FB8533"
        },
        {
          title: "服务其他部门总数",
          num: this.$getrandom("服务其他部门总数", 3000),
          img: require("@/assets/images/leaderCockpit_line_2.png"),
          borderColor: "#35C3C4 "
        },
        {
          title: "接口被其他部门调用总数",
          num: this.$getrandom("接口被其他部门调用总数", 3000),
          img: require("@/assets/images/leaderCockpit_line_3.png"),
          borderColor: "#9045D5 "
        },
        {
          title: "申请其他部门接口总数",
          num: this.$getrandom("申请其他部门接口总数", 3000),
          img: require("@/assets/images/leaderCockpit_line_4.png"),
          borderColor: "#FB8533"
        },
        {
          title: "提供服务部门总数",
          num: this.$getrandom("提供服务部门总数", 3000),
          img: require("@/assets/images/leaderCockpit_line_5.png"),
          borderColor: "#35C3C4 "
        },
        {
          title: "调用其他部门接口总数",
          num: this.$getrandom("调用其他部门接口总数", 3000),
          img: require("@/assets/images/leaderCockpit_line_6.png"),
          borderColor: "#9045D5 "
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handelClick(e) {
      let name = e.name || e;
      this.datas = [1000, 1000, 1000].map((o, i) =>
        this.$getrandom(name + i, o)
      );
    },
    getBumen() {
      this.isShow = false;
      this.$api.get_depart({ region_name: "省直部门" }).then(res => {
        this.barData.xData = res.data;
        this.barDataSeries = [
          {
            name: "数据目录总数",
            type: "bar",
            data: res.data.map(o => this.$getrandom(o + "222", 323)),
            barMaxWidth: 20
          }
        ];
        this.isShow = true;
      });
    },
    getCity() {
      this.isShow = false;
      this.$nextTick(() => {
        this.barData.xData = citys;
        this.barDataSeries = [
          {
            name: "数据目录总数",
            type: "bar",
            data: citys.map(o => this.$getrandom(o + "222", 323)),
            barMaxWidth: 20
          }
        ];
        this.isShow = true;
      });
    },
    init() {
      let type = this.$route.query.type - 0;
      this.typeName = ["省直部门", "市州部门"][type];
      if (type === 0) {
        this.getBumen();
      } else {
        this.getCity();
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
  },

  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  beforeRouteUpdate(to, from, next) {
    const newDeptType = to.query.type;
    const oldDeptType = from.query.type;
    next();
    if (oldDeptType !== newDeptType) {
      this.init();
    }
  }
};
</script>
<style lang='scss' scoped>
@import '@/assets/style/base/index.scss';
//@import url(); 引入公共css类
.g-top {
    height: 560px;
    .el-row {
        margin: 0 -10px;
        margin-top: 5px;
        .el-col-8 {
            padding: 0 10px;
            &:first-child {
                p {
                    color: #fff;
                }
            }
        }
    }
    dl {
        height: 143px;
        margin-top: 20px;
        display: flex;
        position: relative;
        dt {
            width: 100%;
            img {
                width: 100%;
            }
        }
        dd {
            position: absolute;
            top: 0;
            padding: 16px 13px;
            p {
                font-size: 14px;
                color: #666;
                &:last-child {
                    font-size: 30px;
                    color: #333;
                }
            }
        }
    }
}
.g-middle {
  height: 560px;
  dl {
      height: 140px;
      padding: 15px;
      margin-top: 20px;
      dt {
          @include font($fz: 14px, $color:#fff);
      }
      dd {
          @include font($fz: 30px, $color:#fff);
      }
  }
  dl.border {
      background-color: rgba(51, 171, 251, 0.05);
      border: 1px solid #33ABFB;
      display: flex;
      position: relative;
      dt {
          p {
              @include font($fz: 14px, $color:#666);
              &:nth-child(2) {
                  font-size: 30px;
                  color: rgba(0, 0, 0, 0.85);
              }
              &:nth-child(3) {
                  font-size: 24px;
                  color: rgba(0, 0, 0, 0.85);
              }
          }
      }
      dd {
          position: absolute;
          top: -45px;
          right: -100px;
          transform: scale(.5);
          /deep/ .ringBox {}
      }
  }
}
.g-a-t {
  color: #666;
  font-size: 14px;
}
.g-a-n {
  color: #fc8635;
  font-size: 30px;
}
.g-leftbox {
  .g-all {
    padding: 12px;
    width: 50%;
    float: left;
    height: 120px;
    background: url(../../../assets/images/leaderCockpit_transparent_1.png)
      no-repeat;
    background-size: 100% 100%;
  }
  .g-one {
    width: 50%;
    float: left;
    height: 120px;
    background: rgba(252, 134, 53, 0.05);
    border: 1px solid #fc8635;
    margin-left: -1px;
    .g-a {
      padding: 0 12px;
      height: 60px;
      line-height: 60px;
      border-top: 1px solid #fc8635;
      margin-top: -1px;
    }
  }
}
.g-centerbox {
  padding: 12px;
  height: 120px;
  background: url(../../../assets/images/leaderCockpit_transparent_1.png)
    no-repeat;
  background-size: 100% 100%;
}
.g-rightbox {
  padding: 12px;
  height: 120px;
  background: url(../../../assets/images/leaderCockpit_transparent_2.png)
    no-repeat;
  background-size: 100% 100%;
}

.g-bottom {
  margin: 0 -10px;
  .el-col-12 {
    padding: 0 10px;
    dl {
      display: flex;
      padding: 29px 20px 25px 20px;
      height: 100px;
      border: solid 1px pink;
      margin-top: 20px;
      dt {
        width: -moz-calc(100% - 170px);
        width: -webkit-calc(100% - 170px);
        width: calc(100% - 170px);
        height: 46px;
        img {
          width: -moz-calc(100% - 20px);
          width: -webkit-calc(100% - 20px);
          width: calc(100% - 20px);
          height: 46px;
        }
      }
      dd {
        width: 170px;
        position: relative;
        top: -15px;
        p {
          font-size: 30px;
          color: rgba(0, 0, 0, 0.85);
          &:last-child {
            font-size: 14px;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>