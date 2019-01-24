<!--  -->
<template>
<div class='leaderCockpit'>
	<el-row :gutter="20">
		<el-col :span="15">
			<el-card class="g-top-right">
				<p class="titleLeftBorder">
					省直部门数据区建设概况
				</p>
				<el-row :gutter="20">
						<el-col :span="12">
								<dl :style="{background:'url('+dataList[2].img+') no-repeat center center','backgroundSize':'cover'}">
										<dt>{{dataList[2].title}}</dt>
										<dd>{{dataList[2].num}}</dd>
								</dl>
						</el-col>
						<el-col :span="12">
								<dl :style="{background:'url('+dataList[3].img+') no-repeat center center','backgroundSize':'cover','height':'65px'}">
										<dt>{{dataList[3].title}}</dt>
										<dd>{{dataList[3].num}}</dd>
								</dl>
								<dl :style="{background:'url('+dataList[4].img+') no-repeat center center','backgroundSize':'cover','height':'65px','margin-top':'10px'}">
										<dt>{{dataList[4].title}}</dt>
										<dd>{{dataList[4].num}}</dd>
								</dl>
						</el-col>
				</el-row>
			</el-card>
			
		</el-col>
		<el-col :span="9">
			<el-card class="g-top-left">
				<p class="titleLeftBorder">
					省直部门数据区概况
				</p>
				<el-row>
						<el-col :span="12">
								<dl :style="{background:'url('+dataList[0].img+') no-repeat center center','backgroundSize':'cover'}">
										<dt>{{dataList[0].title}}</dt>
										<dd>{{dataList[0].num}}</dd>
								</dl>
						</el-col>
						<el-col :span="12">
								<dl :style="{background:'url('+dataList[1].img+') no-repeat center center','backgroundSize':'cover'}">
										<dt>{{dataList[1].title}}</dt>
										<dd>{{dataList[1].num}}</dd>
								</dl>
						</el-col>
				</el-row>
			</el-card>
			
		</el-col>
	</el-row>

		<el-card class="mt20">
			<p class="titleLeftBorder">
				市州部门数据概况
			</p>
			<div class="g-city-info mt20 mb20">
				<el-row :gutter="20">
					<el-col :span="12">
						<div class="g-leftbox clearfix">
							<div class="g-all">
								<p class="g-a-t">未建设数据区部门</p>
								<p class="g-a-n">{{datas[0]}}</p>
							</div>
							<div class="g-one">
								<div class="g-a flex-between">
									<p class="g-a-t">已建设数据区部门</p>
									<p class="g-a-n">{{parseInt(datas[0] * 0.33)}}</p>
								</div>
								<div class="g-a flex-between">
									<p class="g-a-t">未建设数据区部门</p>
									<p class="g-a-n">{{parseInt(datas[0] * 0.67)}}</p>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="g-centerbox">
							<p class="g-a-t">数据表总数</p>
							<p class="g-a-n">{{datas[1]}}</p>

						</div>
					</el-col>
					<el-col :span="6">
						<div class="g-rightbox">
							<p class="g-a-t">数据记录总数</p>
							<p class="g-a-n">{{datas[2]}}</p>

						</div>
					
					</el-col>
				</el-row>
			</div>
		</el-card>
		<el-card class="mt20">
			<Map :jsonCode="jsonCode" :width="width" :height="height" :strip="strip" @mapClick="handelClick"></Map>
		</el-card>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Map from "@/components/charts/map";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Map },
  data() {
    //这里存放数据
    return {
      jsonCode: "guizhou",
      width: 618,
      height: 616,
      strip: false,
      datas: [
        this.$getrandom("返回首页0", 10000),
        this.$getrandom("返回首页1", 10000),
        this.$getrandom("返回首页2", 10000)
      ],
      dataList: [
        {
          title: "数据表总数",
          num: this.$getrandom('数据表总数', 10000),
          img: require("@/assets/images/leaderCockpit_5.png")
        },
        {
          title: "数据记录总数",
          num: this.$getrandom('数据记录总数', 10000),
          img: require("@/assets/images/leaderCockpit_6.png")
        },
        {
          title: "省直部门总数",
          num: this.$getrandom('省直部门总数000', 10000),
          img: require("@/assets/images/leaderCockpit_7.png")
        },
        {
          title: "已建设数据区部门",
          num: parseInt(this.$getrandom('省直部门总数000', 10000) * .43),
          img: require("@/assets/images/leaderCockpit_1.png")
        },
        {
          title: "未建设数据区部门",
          num: parseInt(this.$getrandom('省直部门总数000', 10000) * .57),
          img: require("@/assets/images/leaderCockpit_2.png")
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
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
		
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
    @import '@/assets/style/base/index.scss';
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
  background: url(../../../assets/images/leaderCockpit_transparent_3.png)
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


        .g-top-left {
            height: 220px;
            .el-row {
                margin: 0 -20px;
                padding-top: 20px;
            }
            .el-col-12 {
                &:first-child {
                    padding: 0 10px 0 20px;
                }
                &:last-child {
                    padding: 0 20px 0 10px;
                }
                dl {
                    height: 140px;
                    padding: 15px;
                    dt {
                        @include font($fz: 14px, $color:#fff);
                    }
                    dd {
                        @include font($fz: 30px, $color:#fff);
                    }
                }
            }
        }
        .g-top-right {
            height: 220px;
            .el-row {
                margin: 0 -20px;
                padding-top: 20px;
                .el-col-12 {
                    &:first-child {
                        padding: 0 10px 0 20px;
                    }
                    &:last-child {
                        padding: 0 20px 0 10px;
                        dl {
                            display: flex;
                            justify-content: space-between;
                            dd {
                                position: relative;
                                top: -10px;
                            }
                        }
                    }
                    dl {
                        height: 140px;
                        padding: 15px;
                        dt {
                            @include font($fz: 14px, $color:#fff);
                        }
                        dd {
                            @include font($fz: 30px, $color:#fff);
                        }
                    }
                }
            }
        }
</style>