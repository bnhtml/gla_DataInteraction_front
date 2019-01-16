<template>
  <div class="treeouterBox">
    <div class="tree" ref="tree" :style="'width:' + width + 'px;height:' + height + 'px'"></div>
  </div>
</template>
<script>
import { data } from "./data";
export default {
  data() {
    return {};
  },
  props: ["width", "height"],
  created() {},
  mounted() {
    this.renderTree();
    eventBus.$on("RESIZE", this.fnResize);
    setTimeout(() => {
      this.fnResize();
    }, 0);
  },
  methods: {
    fnResize() {
      try {
        let parent = this.$refs.tree.parentNode;
        let width = parent.clientWidth;
        let height = parent.clientHeight;
        if (parent && width && height) {
          this.Chart.resize({
            width,
            height
          });
        }
      } catch (err) {}
    },
    renderTree: function() {
      let echarts = this.$echarts;
      let mapDom = this.$refs.tree;
      let mapChart = echarts.init(mapDom);
      this.Chart = mapChart;
      let option = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        series: [
          {
            roam: true,
            type: "tree",

            data: [data],

            top: "14%",
            bottom: "14%",

            layout: "radial",
            orient: "TB",

            symbol: "roundRect",
            symbolSize: [10, 10],

            initialTreeDepth: 2,
            label: {
              color: "#73BFA8",
              offset: [0, -30],
              formatter: [
                "{b|{b}}",
              ].join("\n"),

              rich: {
                b: {
                  color: "#73BFA8",
                  fontSize: 14
                }
              }
            },
            lineStyle: {
              color: "#73BFA8"
            },
            animationDurationUpdate: 750
          }
        ]
      };
      mapChart.setOption(option);
    }
  },
  watch: {}
};
</script>
<style scoped>
.treeouterBox {
  position: relative;
  clear: both;
  width: 100%;
}
</style>

