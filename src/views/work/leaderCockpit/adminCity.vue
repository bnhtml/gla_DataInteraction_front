<!--  -->
<template>
<div class='leaderCockpit'>

		<el-card class="mt20">
			<p class="titleLeftBorder">
				省直部门接口概况
			</p>
			<div class="g-bar">
          <newBar v-if="isShow" :bar="barData" :series="barDataSeries"></newBar>
			</div>
		</el-card>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import newBar from "@/components/charts/bar/newBar";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { newBar },
  data() {
    //这里存放数据
    return {
      isShow: false,
      barData: {
        company:['个'],
        height: 330,
        xData: [],
        labelnames: ['数据目录总数'],

      },
      barDataSeries: [

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
			this.datas = [1000, 1000, 1000].map((o, i) => this.$getrandom(name + i, o));

    },
    getBumen(){
      this.isShow = false;
      this.$api.get_depart({region_name: '省直部门'}).then(res => {
        this.barData.xData = res.data;
        this.barDataSeries = [{

          name: '数据目录总数',
          type: 'bar',
          data: res.data.map(o => this.$getrandom(o + '222', 323)),
          barMaxWidth: 20,
        }]
        this.isShow = true;
      });
    }
	},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getBumen();
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
//@import url(); 引入公共css类
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
</style>