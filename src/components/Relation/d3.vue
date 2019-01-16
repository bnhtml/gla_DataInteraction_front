<!-- 关联图谱 -->
<template>
  <div class='g-relation'></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
const w = 900, h = 700;

      const R = 30;
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    var color = d3.scaleOrdinal(d3.schemeSet3);
    console.log(d3.schemeSet3, '000')
    color(0);
    color(1);
    color(2);
    color(3);
    color(4);
    color(5);
    color(6);
    color(7);
    color(8);
    color(9);
    color(10);
    var tooltip = d3
      .select(".g-relation")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    this.$api.relation().then(response => {
      console.log(response, '---')
      let group = 0;
      let mainname = '省直部门'
      let nodeItem = {
        id: mainname, group
      };
      let nodeItems = [nodeItem];
      let nodeLinks = [];
      function pushdata(mName, obj){
        obj.children.forEach(o => {
          if(o.children){
            pushdata(o.name, o)
          }
          nodeItems.push({
            id: o.name, group: ++group
          })
          nodeLinks.push({
            "source": mName,
            "target": o.name,
            "value": 2
          })
        })
      }
      pushdata(mainname, response);
      let graph = {nodes: nodeItems, links: nodeLinks}
      // return 
 	      const svg = d3.select(".g-relation").append('svg').attr('width', w).attr('height', h);
        let width = w;
  			let height = h;

      const simulation = d3
        .forceSimulation()
        .nodes(graph.nodes)
        .force("link", d3.forceLink().id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);
      simulation.force("link").links(graph.links);

      let link = svg
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line");
      link
        .attr("class", "link")
        .on("mouseover.tooltip", function(d) {
          tooltip
            .transition()
            .duration(300)
            .style("opacity", 0.8);
          tooltip
            .html(
              "Source:" +
                d.source.id +
                "<p/>Target:" +
                d.target.id +
                "<p/>Strength:" +
                d.value
            )
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + 10 + "px");
        })
        .on("mouseout.tooltip", function() {
          tooltip
            .transition()
            .duration(100)
            .style("opacity", 0);
        })
        .on("mouseout.fade", fade(1))
        .on("mousemove", function() {
          tooltip
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + 10 + "px");
        });
      let node = svg
        .selectAll(".node")
        .data(graph.nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

      node
        .append("circle")
        .attr("r", R)
        .attr("fill", function(d) {
          return color(d.group);
        })
        .on("mouseover.tooltip", function(d) {
          tooltip
            .transition()
            .duration(300)
            .style("opacity", 0.8);
          tooltip
            .html("Name:" + d.id + "<p/>group:" + d.group)
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + 10 + "px");
        })
        .on("mouseover.fade", fade(0.1))
        .on("mouseout.tooltip", function() {
          tooltip
            .transition()
            .duration(100)
            .style("opacity", 0);
        })
        .on("mouseout.fade", fade(1))
        .on("mouseout.fade2", console.log("linkedByIndex"))
        .on("mousemove", function() {
          tooltip
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + 10 + "px");
        })
        .on("dblclick", releasenode);

      node
        .append("text")
        .attr("x", 0)
        .attr("dy", ".35em")
        .text(d => d.id)
        .style('text-align', 'center');

      function ticked() {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        node.attr("transform", d => `translate(${d.x},${d.y})`);
      }

      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        //d.fx = null;
        //d.fy = null;
      }
      function releasenode(d) {
        d.fx = null;
        d.fy = null;
      }

      const linkedByIndex = {};
      graph.links.forEach(d => {
        linkedByIndex[`${d.source.index},${d.target.index}`] = 1;
      });

      console.log("linkedByIndex");
      console.log(linkedByIndex);

      function isConnected(a, b) {
        return (
          linkedByIndex[`${a.index},${b.index}`] ||
          linkedByIndex[`${b.index},${a.index}`] ||
          a.index === b.index
        );
      }

      function fade(opacity) {
        return d => {
          console.log("fade");
          console.log(d);
          node.style("stroke-opacity", function(o) {
            console.log("isConnected", d, o);
            console.log(isConnected(d, o));

            const thisOpacity = isConnected(d, o) ? 1 : opacity;
            this.setAttribute("fill-opacity", thisOpacity);
            return thisOpacity;
          });

          link.style(
            "stroke-opacity",
            o => (o.source === d || o.target === d ? 1 : opacity)
          );
        };
      }
      // var sequentialScale = d3
      //   .scaleOrdinal(d3.schemeSet3)
      //   .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

      // svg
      //   .append("g")
      //   .attr("class", "legendSequential")
      //   .attr(
      //     "transform",
      //     "translate(" + (width - 140) + "," + (height - 300) + ")"
      //   );

      // var legendSequential = d3
      //   .legendColor()
      //   .shapeWidth(30)
      //   .cells(11)
      //   .orient("vertical")
      //   .title("Group number by color:")
      //   .titleWidth(100)
      //   .scale(sequentialScale);

      // svg.select(".legendSequential").call(legendSequential);
    });
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
<style>

.g-relation {
  width: 960px;
  height: 700px;
}
.link {
  stroke: #c1c1c1;
  stroke-width: 2px;
  pointer-events: all;
}

text {
  stroke: #fff;
  stroke-width: 1;
  font-size: 12px;
  text-anchor: middle;  /* 文本水平居中 */
  dominant-baseline: middle; /* 文本垂直居中 */
}
.node circle {
  pointer-events: all;
  stroke: #777;
  stroke-width: 1px;
}

div.tooltip {
  position: absolute;
  background-color: white;
  max-width: 200px;
  height: auto;
  padding: 1px;
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}
</style>
