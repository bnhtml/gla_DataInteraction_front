<!-- 资金使用情况分析 二级页面  -->
<template>
<div class='specialTable' v-breadcrumb='breadcrumb'>
    <!-- <h2 class="special-title" :style="{background:'url('+titleBg+') no-repeat center center'}">
      <router-link :to="{name:'specialIndex',query:{sysOrgCode: $route.query.sysOrgCode}}">数据资产综合分析</router-link>
      <span @click='goBack' class="back">返回 <i class="iconfont icon-fanhui"></i> </span>
    </h2> -->
    <div class="situation">
      <Title :title='title.top' v-if="title.top"></Title>
      <dl>
        <dt style="display: flex">
          <DatePicker v-model="yearSelect.year" type="year" @on-change="setYear" placeholder="请选择" style="width: 200px" ></DatePicker>
        </dt>
        <dd class="mt20">
          <NomalTable v-if="tableShow" :table-json="moneyUse.tableJson" :url='moneyUse.url' axiosType="post" :query="query"></NomalTable>
        </dd>
      </dl>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Title from "@/components/title/index.vue";
import NomalTable from '@/components/table/NomalTable.vue';
import moneyUse from './config/moneyUse'
import echarts from "echarts";

  let colorLineArr = [
    {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#579ADD"
        },
        {
          offset: 1,
          color: "#2C61B9"
        }
      ])
    },
    {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#A291F9"
        },
        {
          offset: 1,
          color: "#614EBE"
        }
      ])
    },
    {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#2FBAB2"
        },
        {
          offset: 1,
          color: "#1E8589"
        }
      ])
    },
    {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#B4EC51"
        },
        {
          offset: 1,
          color: "#4EBF21"
        }
      ])
    }
  ];
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Title, NomalTable },
  data() {
    //这里存放数据
    return {
      breadcrumb: [{
            icon: 'dingwei',
            name: '数据资产综合分析'
          },
          {name:'资金使用情况'},
        ],
      query: this.$route.query,
      titleBg: require("../../../../assets/img/bg/special_title_bg.png"),
      title: {
        top: "资金使用明细"
      },
      yearSelect: {
        year: this.$route.query.year || '',
      },
      moneyUse,
      tableShow: true
    };
  },
  //监听属性 类似于data概念
    computed: {},
  //监控data中的数据变化
  watch: {
  },
  //方法集合
  methods: {
    init(){
    },
    goBack() {
      window.history.go(-1)
    },
    setYear(){
      this.tableShow = false;
      this.query = {...this.query, year: this.yearSelect.year ? new Date(this.yearSelect.year).pattern('yyyy') : ''};
      this.$router.replace({name: this.$route.name, query: this.query})
      this.$nextTick(() => this.tableShow = true);
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
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "@/assets/style/base/index.scss";
.specialTable {
  overflow-y: auto;
  .special-title {
    font-family: "zhanghaishan";
    text-align: center;
    @include font($fz: 36px, $color: #fff);
    height: 61px;
    line-height: 61px;
    margin: 10px 0 30px 0;
    position: relative;
    .back {
      cursor: pointer;
      position: absolute;
      right: 0px;
      top: 15px;
      @include font($fz: 16px, $color: #fff);
      i {
        @include font($fz: 16px, $color: #fff);
        position: relative;
        top: -2px;
      }
    }
    .back:hover {
      color: #2d8cf0;
      i {
        color: #2d8cf0;
      }
    }
  }
  .situation {
    dl {
      padding: 40px;
      @extend %TitleBorder;
      border-top: 0;
      box-sizing: border-box;
      position: relative;
      dt {
        position: relative;
      }
      dd {
        .changeColorBg{
          padding: 0 20px;
          background-image: linear-gradient(90deg, #0F4BA7 0%, #057698 100%);
          height: 40px;
          line-height: 40px;
          margin-bottom: 20px;
          font-size: 18px;
          color: #fff;
          span{
            margin-left: 10px;
          }
        }
        .noData {
          text-align: center;
          img {
            margin-top: 80px;
          }
        }
      }
    }
  }
}
@font-face {
  font-family: "zhanghaishan";
  src: url("../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.ttf")
      format("truetype"),
    url("../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.woff"),
    url("../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.woff2"),
    url("../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.svg"),
    url("../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.eot"),
    url("../../../../assets/font-face/ZHSRXT2011-GB/zhanghaishan.otf");
}

.selectorBox {
  cursor: pointer;
  p {
    width: 90%;
    font-size: 14px;
  }
  position: relative;
  width: 500px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #999;
  border-radius: 15px;
  color: #999;
  i {
    display: inline-block;
    vertical-align: middle;
    margin-top: -6px;
  }
}
</style>