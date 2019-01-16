<template>
  <div class="specialTableDetail" v-breadcrumb="breadcrumb">
    <!-- <h2 class="special-title" :style="{background:'url('+titleBg+') no-repeat center center'}">
      <router-link :to="{name:'specialIndex',query:{orgType:1}}">数据资产综合分析</router-link>
      <span @click='goBack' class="back">返回 <i class="iconfont icon-fanhui"></i> </span>
    </h2> -->
    <m-title :title='deName+title'></m-title>
    <nomal-table class='table-cont' v-if="isShow" :table-json="tableJson" :noid="true" :nohead="true" :data="data">
    </nomal-table>
  </div>
</template>

<script>
  import NomalTable from '@/components/table/NomalTable.vue';
  import mTitle from '@/components/title/index.vue';
  import {
    dataAssetsJson,
    ECSJson,
    RDSJson,
    SLBJson,
    OSSJson,
    rjJson,
    yjJson,
    dataAssetsFormat,
    ECSFormat,
    RDSFormat,
    SLBFormat,
    OSSFormat,
  } from './specialDetail.js';
  import {
    businessJson,
    businessFormat
  } from '../../business/detail/businessDetail';
  import {
    pcRoomJson,
    pcRoomFormat
  } from '../../ITBasicResources/defaultJson.js'
  import {
    serversJson,
    serversFormat
  } from '../../ITBasicResources/serversDefaultJson.js'
  let jsons = {
    dataAssets: {
      json: dataAssetsJson,
      format: dataAssetsFormat
    },
    ECS: {
      json: ECSJson,
      format: ECSFormat
    },
    RDS: {
      json: RDSJson,
      format: RDSFormat
    },
    SLB: {
      json: SLBJson,
      format: SLBFormat
    },
    OSS: {
      json: OSSJson,
      format: OSSFormat
    },
    business: {
      json: businessJson,
      format: businessFormat
    },
    pcRoom: {
      json: pcRoomJson,
      format: pcRoomFormat
    },
    servers: {
      json: serversJson,
      format: serversFormat
    },
    rj: {
      json: rjJson,
      format: businessFormat
    },
    yj: {
      json: yjJson,
      format: businessFormat
    }
  }
  export default {
    name: "specialTableDetail",
    data() {
      let url = {
        dataAssets: this.$api.dataAssetQuery,
        ECS: this.$api.getCloudResourcesDetail,
        RDS: this.$api.getCloudResourcesDetail,
        SLB: this.$api.getCloudResourcesDetail,
        OSS: this.$api.getCloudResourcesDetail,
        business: this.$api.systemQuery,
        pcRoom: this.$api.ITBasic.jifangDefault,
        servers: this.$api.ITBasic.serversdetails,
        rj: this.$api.softwaresQuery,
        yj: this.$api.equipmentQuery,
      }[this.$route.params.url];
      let json = jsons[this.$route.params.url]
     /* 
        backQuery_0.type:资金投入分析（特殊）
        backQuery_1.type:业务等模块（常规）
       */
      let {query,} = this.$route
      let backQuery_0 = JSON.parse(query.backQuery);
      let backQuery_1 = backQuery_0.backQuery && JSON.parse(backQuery_0.backQuery);
      let parent_0 = {
        already:{name:'数据资产填报',url:{name:'specialTable',query:backQuery_1}},
        compliance:{name:'数据合规度',url:{name:'specialTable',query:backQuery_1}},
        build:{name:'业务系统建设情况',url:{name:'specialTable',query:backQuery_1}},
        specialnetwork:{name:'专网环境运行系统分析',url:{name:'specialTable',query:backQuery_1}},
        migratedClouds:{name:'业务系统迁云情况',url:{name:'specialTable',query:backQuery_1}},
        officehall:{name:'业务系统接入网上办事大厅情况',url:{name:'specialTable',query:backQuery_1}},
        share:{name:'业务系统接入共享平台情况',url:{name:'specialTable',query:backQuery_1}},
        sourceanalysis:{name:'各部门资金来源分析',url:{name:'specialTable',query:backQuery_1}},
        cloudResources:{name:'云资源',url:{name:'specialTable',query:backQuery_1}},
        pcRoom:{name:'自有机房建设分析及明细',url:{name:'specialTable',query:backQuery_0}},
        pcRoomC:{name:'自有机房建设分析及明细',url:{name:'specialTable',query:backQuery_0}},
        pcRoomE:{name:'自有机房建设分析及明细',url:{name:'specialTable',query:backQuery_0}},
        servers:{name:'服务器',url:{name:'specialTable',query:backQuery_1}},
        completeness:{name:'数据完备度',url:{name:'specialTable',query:backQuery_1}},
        usedetailyzy:{name:'资金投入分析',url:{name:'specialMoneyUse',query:backQuery_0}},
      }[backQuery_1 && backQuery_1.type||backQuery_0.type];
      return {
        breadcrumb: [{
            icon: 'dingwei',
            name: '数据资产综合分析'
          },
          parent_0,
          {name:'明细'}
        ],
        titleBg: require('../../../../assets/img/bg/special_title_bg.png'),
        json,
        url,
        query: this.$route.query,
        isShow: false,
        data: {},
        tableJson: {
          column: [{
              type: "text",
              align: "right",
              label: "详情",
              prop: "name",
              width: "250",
              'class-name': 'table-left-label'
            },
            {
              type: "text",
              align: "left",
              label: "详情明细",
              prop: "value",
              width: ""
            },
            {
              type: "text",
              align: "right",
              label: "详情",
              prop: "name1",
              width: "250",
              'class-name': 'table-left-label'
            },
            {
              type: "text",
              align: "left",
              label: "详情明细",
              prop: "value1",
              width: "",
              'class-name': 'table-right-value'
            }
          ]
        },
        filedName: []
      };
    },
    components: {
      NomalTable,
      'm-title': mTitle,
    },
    computed: {
      title() {
        if (this.$route.query.typeTitle == "buildxz") {
          return '业务系统建设明细'
        } else if (this.$route.query.typeTitle == "alreadyxx") {
          return '数据资产填报明细'
        } else if (this.$route.query.typeTitle == "completenessxx") {
          return '数据资产填报完备度明细'
        } else if (this.$route.query.typeTitle == "compliancexx") {
          return '数据资产填报合规度明细'
        } else if (this.$route.query.typeTitle == "migratedCloudsxz") {
          return '业务系统迁云情况明细'
        } else if (this.$route.query.typeTitle == "sharexz") {
          return '业务系统接入共享平台情况明细'
        } else if (this.$route.query.typeTitle == "officehallxz") {
          return '业务系统接入网上办事大厅情况明细'
        } else if (this.$route.query.typeTitle == "specialnetworkxz") {
          return '专网运行系统情况明细'
        } else if (this.$route.query.typeTitle == "servers") {
          return '服务器资产详情页'
        } else if (this.$route.query.typeTitle.indexOf('sourceanalysis') != -1) {
          return '资金使用情况'
        } else if (this.$route.query.typeTitle == 'pcRoom') {
          return '自有机房建设分析及明细'
        } else if (this.$route.query.typeTitle.indexOf('cloudResourcesxz') != -1) {
          return '云资源明细'
        } else {
          return ''
        }
        // 
      },
      deName() {
        if (this.$route.query.deName) {
          return this.$route.query.deName + ' - '
        } else {
          return ''
        }
      }
    },
    created() {
      this.abnormalShow();
    },
    methods: {
      goBack() {
        window.history.go(-1)
      },
      /* 合规度 - 异常数据显示 */
      abnormalShow() {
        // if (this.$route.query.typeTitle == "compliancexx") {
        this.$api.errFileds({
          foreignkey: this.$route.query.id,
        }).then(res => {
          this.filedName = res.filedName;
          this.getData();
        })
        // } else {
        //   this.getData()
        // }
      },
      /* 获得渲染表格数据 */
      getData() {
        this.url(this.query).then((res = {}) => {
          let column = [];
          let i = 0;
          let obj = {};
          if (res.data.length == 0) {
            this.data = column;
            this.isShow = true;
            return;
          }
          let keys = Object.keys(this.json.json);
          for (let resname in this.json.json) {
            let name = ['name', 'name1'][i % 2];
            let value = ['value', 'value1'][i % 2];
            obj[name] = this.json.json[resname];
            let data0 = res.data[0] || res.data;
            let val = ''
            /* 合规 */
            if (this.filedName && this.filedName.length) {
              for (let fKey in this.filedName) {
                /* 匹配异常字段 */
                if (resname == this.filedName[fKey]) {
                  val = `<span class='color-red border-red'>${data0[resname]}</span>`;
                  if (this.json.format[resname]) {
                    val = `<span class='color-red border-red'>${this.json.format[resname](data0[resname])}</span>`;
                  }
                  break;
                } else {
                    /* 合规字段 (并且值不为空)*/
                    val = data0[resname];
                    if (this.json.format[resname]) {
                      val = this.json.format[resname](data0[resname]);
                    }
                }
              }
            } else {
              /* 非合规 */
              val = data0[resname];
              if (this.json.format[resname]) {
                val = this.json.format[resname](data0[resname]);
              }
            }
            obj[value] = val;
            if (i % 2 === 1) {
              column.push(obj);
              obj = {};
            }
            if(i === keys.length - 1 && i % 2 === 0){
              column.push({...obj, name1: '', value1: ''});
            }
            i++;
          }
          this.data = column;
          this.isShow = true;
        })
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import "@/assets/style/base/index.scss";
  .specialTableDetail {
    overflow-y: auto;
    .special-title {
      text-align: center;
      height: 61px;
      line-height: 61px;
      margin: 10px 0 30px 0;
      position: relative;
      .back {
        cursor: pointer;
        position: absolute;
        right: 0px;
        top: 15px;
        @include font($fz: 16px, $color:#fff);
        i {
          @include font($fz: 16px, $color:#fff);
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
      a {
        display: inline-block;
        @include nums($w: 461px, $h:61px);
        font-family: 'zhanghaishan';
        @include font($fz: 36px, $color:#fff);
        cursor: pointer;
      }
    }
  }
</style>
