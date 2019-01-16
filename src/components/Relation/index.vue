<!-- echarts关联图谱 -->
<template>
<div class='relation-box'>
  <div class="chart" ref="chart"></div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// size 二级大小 size1 三级大小  yy
const size = 60;
const size1 = 30;
const yy = 200;
const yy1 = 250;
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    data: {
      default: function() {
        return [
          {
            name: "BigData",
            x: 0,
            y: yy,
            symbolSize: 100,
            category: "BigData",
            draggable: "true"
          },
          {
            name: "Hadoop",
            x: 10,
            y: yy1,
            symbolSize: size,
            category: "Hadoop",
            draggable: "true"
          },
          {
            name: "HDFS",
            x: 20,
            y: yy,
            symbolSize: size1,
            category: "Hadoop",
            draggable: "true"
          },
          {
            x: 30,
            y: yy1,
            name: "MapReduce",
            symbolSize: size1,
            category: "Hadoop",
            draggable: "true"
          },
          {
            x: 40,
            y: yy,
            name: "YARN",
            symbolSize: size1,
            category: "Hadoop",
            draggable: "true",
            value: 1
          },
          {
            x: 50,
            y: yy1,
            name: "HBase",
            symbolSize: size,
            category: "HBase",
            draggable: "true"
          },
          {
            x: 60,
            y: yy,
            name: "Zookeeper",
            symbolSize: size1,
            category: "其它组件",
            draggable: "true"
          },
          {
            x: 70,
            y: yy1,
            name: "Hive",
            symbolSize: size1,
            category: "HBase",
            draggable: "true"
          },
          {
            x: 80,
            y: yy,
            name: "Spark",
            symbolSize: size,
            category: "Spark",
            draggable: "true"
          },
          {
            x: 90,
            y: yy1,
            name: "Scala",
            symbolSize: size1,
            category: "Spark",
            draggable: "true"
          },
          {
            x: 100,
            y: yy,
            name: "Spark SQL",
            symbolSize: size1,
            category: "Spark",
            draggable: "true"
          },
          {
            x: 110,
            y: yy1,
            name: "Spark Streaming",
            symbolSize: size1,
            category: "Spark",
            draggable: "true"
          },
          {
            x: 120,
            y: yy,
            name: "Storm",
            symbolSize: size,
            category: "Storm",
            draggable: "true"
          },
          {
            x: 130,
            y: yy1,
            name: "其它组件",
            symbolSize: size,
            category: "其它组件",
            draggable: "true"
          },
          {
            x: 140,
            y: yy,
            name: "Flume",
            symbolSize: size1,
            category: "其它组件",
            draggable: "true"
          },
          {
            x: 150,
            y: yy1,
            name: "Kafka",
            symbolSize: size1,
            category: "其它组件",
            draggable: "true"
          },
          {
            x: 160,
            y: yy,
            name: "Pig",
            symbolSize: size1,
            category: "HBase",
            draggable: "true"
          },
          {
            x: 170,
            y: yy1,
            name: "NoSQL",
            symbolSize: size,
            category: "NoSQL",
            draggable: "true"
          },
          {
            x: 180,
            y: yy,
            name: "Redis",
            symbolSize: size1,
            category: "NoSQL",
            draggable: "true"
          },
          {
            x: 190,
            y: yy1,
            name: "MongoDB",
            symbolSize: size1,
            category: "NoSQL",
            draggable: "true"
          },
          {
            x: 200,
            y: yy,
            name: "LevelDB",
            symbolSize: size1,
            category: "NoSQL",
            draggable: "true"
          },
          {
            x: 210,
            y: yy1,
            name: "数据挖掘",
            symbolSize: size,
            category: "数据挖掘",
            draggable: "true"
          },
          {
            x: 220,
            y: yy,
            name: "Mahout",
            symbolSize: size1,
            category: "数据挖掘",
            draggable: "true"
          },
          {
            x: 230,
            y: yy1,
            name: "Spark MLlib",
            symbolSize: size1,
            category: "数据挖掘",
            draggable: "true"
          },
          {
            x: 240,
            y: yy,
            name: "Python",
            symbolSize: size1,
            category: "数据挖掘",
            draggable: "true"
          },
          {
            x: 250,
            y: yy1,
            name: "R语言",
            symbolSize: size1,
            category: "数据挖掘",
            draggable: "true"
          },
          {
            x: 260,
            y: yy,
            name: "行业应用",
            symbolSize: size,
            category: "行业应用",
            draggable: "true"
          },
          {
            x: 270,
            y: yy1,
            name: "交通大数据",
            symbolSize: size1,
            category: "行业应用",
            draggable: "true"
          },
          {
            x: 280,
            y: yy,
            name: "搜索引擎",
            symbolSize: size1,
            category: "行业应用",
            draggable: "true"
          },
          {
            x: 290,
            y: yy1,
            name: "精确营销",
            symbolSize: size1,
            category: "行业应用",
            draggable: "true"
          },
          {
            x: 300,
            y: yy,
            name: "环境大数据",
            symbolSize: size1,
            category: "行业应用",
            draggable: "true"
          },
          {
            x: 310,
            y: yy1,
            name: "物联网",
            symbolSize: size1,
            category: "行业应用",
            draggable: "true"
          },
          {
            x: 320,
            y: yy,
            name: "银行贷款风险评估",
            symbolSize: size1,
            category: "行业应用",
            draggable: "true"
          }
        ];
      }
    },
    links: {
      default: function() {
        return [
          {
            source: "BigData",
            target: "Hadoop"
          },
          {
            source: "BigData",
            target: "Spark"
          },
          {
            source: "BigData",
            target: "Storm"
          },
          {
            source: "BigData",
            target: "其它组件"
          },
          {
            source: "BigData",
            target: "NoSQL"
          },
          {
            source: "BigData",
            target: "数据挖掘"
          },
          {
            source: "BigData",
            target: "行业应用"
          },
          {
            source: "Hadoop",
            target: "HDFS"
          },
          {
            source: "Hadoop",
            target: "YARN"
          },
          {
            source: "Hadoop",
            target: "MapReduce"
          },
          {
            source: "HBase",
            target: "Hive"
          },
          {
            source: "Hadoop",
            target: "HBase"
          },
          {
            source: "其它组件",
            target: "Zookeeper"
          },
          {
            source: "Spark",
            target: "Scala"
          },
          {
            source: "Spark",
            target: "Spark SQL"
          },
          {
            source: "Spark",
            target: "Spark Streaming"
          },
          {
            source: "其它组件",
            target: "Flume"
          },
          {
            source: "其它组件",
            target: "Kafka"
          },
          {
            source: "HBase",
            target: "Pig"
          },
          {
            source: "NoSQL",
            target: "Redis"
          },
          {
            source: "NoSQL",
            target: "MongoDB"
          },
          {
            source: "NoSQL",
            target: "LevelDB"
          },
          {
            source: "数据挖掘",
            target: "Mahout"
          },
          {
            source: "数据挖掘",
            target: "Spark MLlib"
          },
          {
            source: "数据挖掘",
            target: "Python"
          },
          {
            source: "数据挖掘",
            target: "R语言"
          },
          {
            source: "行业应用",
            target: "交通大数据"
          },
          {
            source: "行业应用",
            target: "搜索引擎"
          },
          {
            source: "行业应用",
            target: "精确营销"
          },
          {
            source: "行业应用",
            target: "环境大数据"
          },
          {
            source: "行业应用",
            target: "物联网"
          },
          {
            source: "行业应用",
            target: "银行贷款风险评估"
          }
        ];
      }
    },
    categories: {
      default: function() {
        return [
          {
            name: "BigData"
          },
          {
            name: "Hadoop"
          },
          {
            name: "HBase"
          },
          {
            name: "Spark"
          },
          {
            name: "Storm"
          },
          {
            name: "其它组件"
          },
          {
            name: "NoSQL"
          },
          {
            name: "数据挖掘"
          },
          {
            name: "行业应用"
          }
        ];
      }
    }
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    fnResize() {
      try {
        let parent = this.$refs.chart.parentNode;
        if (parent && parent.clientWidth && parent.clientHeight) {
          this.Chart.resize({
            width: parent.clientWidth,
            height: parent.clientHeight
          });
        }
      } catch (err) {}
    },
    getLength(){
      let leng = 0;
      switch(true){
        case this.data.length > 100 :
          leng = this.data.length * 2
          break
        case this.data.length > 50 :
          leng = this.data.length * 1.5
          break
        default :
          leng = this.data.length 
      }
      return leng
    },
    init() {
      let repulsion = this.data.length;
      let edgeLength = this.data.length;
      let option = {
        title: {
          text: "大数据知识体系图",
          top: "top",
          left: "left",
          show: false,
          textStyle: {
            color: "#f7f7f7"
          }
        },
        tooltip: {
          formatter: "{b}"
        },
        toolbox: {
          show: true,
          feature: {
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        // backgroundColor: "#337ab7",
        animationDuration: 1000,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            name: "知识体系",
            type: "graph",
            layout: "force",
            force: {
              initLayout: "circular",
              // 排斥力
              repulsion,
              gravity: 0.05,
              edgeLength,
              layoutAnimation: true
            },
            roam: true,
            data: this.data,
            links: this.links,
            categories: this.categories,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{b}",
                fontSize: 16,
                fontStyle: "600"
              }
            },
            lineStyle: {
              normal: {
                width: 2,
                color: "source",
                curveness: 0,
                type: "solid"
              }
            }
          }
        ]
      };

      this.Chart.setOption(option);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    eventBus.$on("RESIZE", this.fnResize);
    setTimeout(() => {
      this.fnResize();
    }, 0);
    let echarts = this.$echarts;
    let Dom = this.$refs.chart;
    let _this = this;
    this.Chart = echarts.init(Dom);
    this.Chart.on('click', function (params) {
      params.event.event.stopPropagation()
      _this.$emit('handelClick', params.data);
    });
    this.init();
  },
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
.relation-box {
  width: 100%;
  height: 100%;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>