<template>
  <div class="content" style="position: absolute;height: 100%;width:100%;">
      <div v-if="isShow" class="g-layer-box" ref="layerBox" @click.stop="() => {}">
        <card>
          <div class="titleStyle">{{tableTitle}}</div>
            <i class="iconfont icon-guanbi" @click="isShow = !isShow"></i>
            <nomal-table :table-json="tableJson" :noid="true" :data="data" :height="400">
          </nomal-table>
        </card>
      </div>
      <div style="height:100%;">
        <Spin fix v-if="!relation.isShow">加载中...</Spin>
        <Relation @handelClick="handelClick" :links="relation.links" :data="relation.data" :categories="relation.categories" v-if="relation.isShow"></Relation>
      </div>
  </div>
</template>
<script>
import Title from '@/components/title/index';
import Relation from "@/components/Relation";
import tree from "@/components/charts/tree";
import NomalTable from "@/components/table/NomalTable";
import { MockUrl } from "@/http/axios";
let x = 0;
let y = 200;
let allnames = [];
let replace = {};
let label3Id = 0;
let tableJson = {
  pcRoom: {
    column: [
      {
        type: "text",
        align: "center",
        label: "机房名称",
        prop: "name"
      },
      {
        type: "text",
        align: "center",
        label: "机房面积（㎡）",
        prop: "jfSize"
      },
      {
        type: "text",
        align: "center",
        label: "软件投入（万元）",
        prop: "rjzTrje"
      },
      {
        type: "text",
        align: "center",
        label: "硬件投入（万元）",
        prop: "yjztrje"
      }
    ]
  },
  system: {
    column: [
    {
      type: "text",
      align: "center",
      label: "系统名称",
      prop: "name"
    },
    {
      type: "text",
      align: "center",
      label: "建设资金（万元）",
      prop: "constructionCost"
    },
    {
      type: "text",
      align: "center",
      label: "运维资金（万元）",
      prop: "operationCost"
    }
  ]},
  hardware: {
    column: [
    {
      type: "text",
      align: "center",
      label: "硬件名称",
      prop: "name"
    },
    {
      type: "text",
      align: "center",
      label: "设备类型",
      prop: "eqpType",
      // formatter(row, column, columnIndex, rowIndex) {
      //   return ['拟建', '在建', '已建', '国家派发', '升级派发', '上级派发'][row.sysStatus - 1]
      // }
    },
    {
      type: "text",
      align: "center",
      label: "采购价格（万元）",
      prop: "equPrice"
    }
  ]},
  software: {
    column: [
    {
      type: "text",
      align: "center",
      label: "软件名称",
      prop: "name"
    },
    {
      type: "text",
      align: "center",
      label: "软件类型",
      prop: "softType"
    },
    {
      type: "text",
      align: "center",
      label: "采购价格（万元）",
      prop: "softPrice"
    }
  ]},
  cloudCommon: {
    column: [
    {
      type: "text",
      align: "center",
      label: "资源ID",
      prop: "name"
    },
    {
      type: "text",
      align: "center",
      label: "配置",
      prop: "configure"
    }
  ]},
  cloudOSS: {
    column: [
    {
      type: "text",
      align: "center",
      label: "资源ID",
      prop: "name"
    },
    {
      type: "text",
      align: "center",
      label: "配置",
      prop: "configure"
    }
  ]},
  datasource: {
    column: [
    {
      type: "text",
      align: "center",
      label: "数据资产名称",
      prop: "name"
    },
    {
      type: "text",
      align: "center",
      label: "数据资产类型",
      prop: "datatype"
    }
  ]},
};
export default {
  data() {
    return {
      query: this.$route.query,
      tatleTitle: '',
      url: `${MockUrl}/api/ITBasic/relationInfo`,
      isShow: false,
      data: [],
      tableJson: {
        column: [
          //行
          {
            type: "text",
            align: "center",
            label: "名称",
            prop: "name",
            width: "140"
          },
          {
            type: "text",
            align: "center",
            label: "厂家",
            prop: "createCost",
            width: ""
          },
          {
            type: "text",
            align: "center",
            label: "数量",
            prop: "size",
            width: ""
          },
          {
            type: "text",
            align: "center",
            label: "价格 (万元)",
            prop: "price",
            width: ""
          }
        ]
      },
      relation: {
        isShow: true,
        data: [],
        links: [],
        categories: []
      },
      label3ShowArr: [],
      datas: null
    };
  },
  components: { tree, NomalTable, Relation,Title},
  mounted() {
    this.getrelation();
    eventBus.$on('CLICK', e => {
      this.isShow = false;
    })
  },
  methods: {
    handelClick(data) {
      this.isShow = false;
      this.$nextTick(() => {
        let {showTable, label3Id, tableClass, children, title, type} = data.item;
        if(showTable){
          let idx = this.label3ShowArr.indexOf(label3Id);
          if(idx > -1){
            this.label3ShowArr.splice(idx, 1);
          }else{
            this.label3ShowArr.push(label3Id);
          }
          tableClass = tableClass || type;
          this.isShow = true;
          let arr = ['system', 'pcRoom', 'hardware', 'software', 'datasource', 'cloudCommon', 'cloudOSS', 'cloudCommon', 'cloudCommon'];
          this.tableJson = tableJson[arr[tableClass - 1]];
          this.tableTitle = title;
          this.data = children;
        }
      });
    },
    getonedata(obj) {
      return Object.assign(
        {},
        {
          name: "BigData",
          x: 0,
          y: 10,
          symbolSize: 100,
          category: "BigData",
          draggable: "true"
        },
        obj
      );
    },
    // name 元素名， category 相关联的元素， label 层级， children 所有子对象， type分类 1-9， colorType 该元素对应二级分类的名字
    setData({ name = this.query.centerName, item = {}, label = 0, category}) {
      let { colorType} = item;
      x += 10;
      if (allnames.indexOf(name) === -1) {
        allnames.push(name);
      } else {
        if (replace[name] !== undefined) {
          replace[name] = replace[name] + 1;
        } else {
          replace[name] = 0;
        }
        name = "" + name + replace[name];
      }
      let obj = { name };
      let symbolSize = [100, 60, 30, 20][label];
      item.showTable = false;
      if (label === 2) {
        item.showTable = true;
      }
      let data = {
        ...obj,
        x,
        y,
        category: colorType || name,
        symbolSize,
        item
      };
      y = y === 200 ? 250 : 200;
      this.relation.data.push(this.getonedata(data));
      label <= 1 && this.relation.categories.push(obj);
      if (label > 0) {
        let link = "";
        if (label === 1) {
          link = {
            source: this.query.centerName,
            target: name
          };
        } else {
          link = {
            source: category,
            target: name
          };
        }
        link && this.relation.links.push(link);
      }
    },
    // datas当前元素对应的对象，category 上一级名字
    recursion(datas, category){
      datas.label = datas.label || 1;
      datas.children.forEach(item => {
        item.label = datas.label + 1;
        item.colorType = datas.colorType || item.name;
        let value = datas.children.length - 0;
        if(item.label === 3){
          item.label3Id = label3Id;
          ++label3Id;
          item.title = datas.name;
          item.tableClass = datas.type;
        }
        //保留这一段需要点击展开用  && (this.label3ShowArr.indexOf(item.label3Id) > -1 || item.label !== 3)
        if (item.children) {
          this.recursion(item, item.name);
        }
        this.setData({
          name: item.name,
          category: category || item.name,
          item,
          label: datas.label
        });
      });

    },
    getrelation() {
      this.relation = {
        isShow: false,
        data: [],
        links: [],
        categories: []
      }
      // 点击展开需要用
      // if(this.datas){
      //   label3Id = 0;
      //   allnames = [];
      //   replace = {}; 
      //   this.setData({});
      //   this.$nextTick(() => {
      //     this.recursion(this.datas);
      //     this.relation.isShow = true;

      //   })
      //   return;
      // }
      this.$api.relation({ sysOrgCode: this.query.sysOrgCode }).then(res => {
        this.setData({});
        this.datas = res;
        this.recursion(res);
        this.relation.isShow = true;
      });
    }
  },
  watch: {
    isShow(n, o){
      if(n){
        this.$nextTick(() => {
          this.$refs.layerBox.style = `transform: translate(0, 0); opacity: 1`;
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/style/base/index.scss";
.titleStyle {
  color: #06c5ea;
  font-size: 16px;
  margin-bottom: 20px;
  label {
    float: right;
    border: solid 1px #d76d5b;
    @include font($fz: 12px, $color: #d76d5b);
    border-radius: 4px;
    display: inline-block;
    @include nums($w: 81px, $h: 26px);
    text-align: center;
    line-height: 26px;
    box-sizing: border-box;
    margin-right: 10px;
  }
}
.g-layer-box{
  width: 500px;
  position: absolute;
  left: 20px;
  top: 20px;
  height: 600px;
  z-index: 20000;
  opacity: 0;
  transform: translate(0, 1000px);
  transition: all 200ms;
  .icon-guanbi{
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
.titleStyle .ivu-card, .ivu-card-bordered{
    background: rgb(27, 39, 79);
}

</style>



