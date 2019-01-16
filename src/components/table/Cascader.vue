<template>
  <div>
  <div v-if="cascader.className === 'm-indexCascader-box'" style="background: rgba(0, 0, 0, .8); width: 100%; height: 100%; position:absolute; left: 0; top: 0;"></div>
    <div ref="mainDom" :class="cascader.className" :style="'width:' + cascader.width + 'px;height:' + cascader.height + 'px'">
      
			<i @click.stop="close" class="iconfont icon-guanbi"></i>
        <div style="height: 100%">
            <Tabs class="m-indexCascader-tabs" :value="orgType" :animated="false" @on-click="getOrgList({pid: arguments[0]}, 0, -1)">
                <TabPane v-for="(label, index) in labels" :label="label.name" :name="label.id + ''" :key="index">
                    <div>
                        <div class="flex-box">
                            <div class="tabs0">
                                <dl v-for="(item, i) in filterData" :key="i">
                                    <dt>{{titles[i]}}</dt>
                                    <dd class="search-dd">
                                        <Input  placeholder="搜索" @on-change="searchKey(arguments[0], i)" />
                                        <i class="iconfont icon-sousuo"></i>
                                    </dd>

                                    <dd class="g-height-space"></dd>
                                    <dd class="allCheck-dd" v-if="item.length && item.every(o => o.sysOrgCode)">
                                        <Checkbox :value="allchecked[i]" @on-change="fnAllChancked(arguments[0], item, i)">全选</Checkbox>
                                    </dd>
                                    <dd class="checkbox-dd">
                                        <div v-for="(checkbox, idx) in item" :key="idx" :class="'pos-relative' + (acts[i] === idx ? ' act' :!checkbox.sysOrgCode&&checkbox.isSelect==1?' checked': '')" >
                                            <Checkbox :value="sysOrgCode.indexOf(checkbox.sysOrgCode) > -1" :label="checkbox.sysOrgCode" v-if="checkbox.sysOrgCode" @on-change="fnChecked(arguments[0], checkbox, i)">{{checkbox.name || checkbox.orgName}}</Checkbox>
																						<div class="checkName" :class="{pointer: checkbox.sonCount - 0}" @click="checkbox.sonCount - 0 && getOrgList({pid: checkbox.id, isSon: checkbox.isSon}, i + 1, idx)" v-else>{{checkbox.name}}</div>
                                            <i class="iconfont icon-jiantou" v-if="!checkbox.sysOrgCode && checkbox.sonCount - 0"></i>   
                                        </div>
                                    </dd>
                                    <div class="g-shuxian" v-if="i !== filterData.length - 1"></div>
                                </dl>
                            </div>
                        </div>
                        <div class="btn-box">
                            <Button class="confirm" @click.stop="setQuery">确认</Button>
                            <Button class="cancels-yellow" @click="clearAll">重置</Button>
                             <Button class="cancels" @click.stop="close">取消</Button>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    </div>
  </div>
</template>
<script type='text/javascript'>
let titles = ["区县", "一级单位", "二级单位"];
export default {
  props: ["cascader"],
  data() {
    return {
      showBlock: false, //控制窗口是否展示
      labels: ["组织机构类型", "组织机构性质"],
      deptValue: "",
      deptData: [[], []],
      sysOrgCode: [],
      orgName: [],
      acts: [-1],
      orgType: "",
      search: ["", ""],
      titles: []
    };
  },
  computed: {
    // 搜索过滤
    filterData() {
      return this.deptData.map((item, i) =>
        item.filter(o => o.name.indexOf(this.search[i]) > -1)
      );
    },
    allchecked() {
      return this.deptData.map(item =>
        item.every(o => this.sysOrgCode.indexOf(o.sysOrgCode) > -1)
      );
    }
  },
  mounted() {
    document.body.addEventListener("click", () => this.$emit("close"));
    this.$refs.mainDom.addEventListener("click", function(e) {
      e.stopPropagation();
    });
  },
  methods: {
    // data 搜索关键字
    // ind 第几列的搜索
    searchKey(e, ind) {
      let data = e.target.value;
      let nowIdxData = this.deptData[ind];
      if (nowIdxData.length === 0) {
        return;
      }
      this.search.splice(ind, 1, data);
      console.log(this.search);
    },
    // query 查询参数，idx 替换数组的下标, _idx点击了第几个
    getOrgList(query, idx, _idx) {
      console.log(idx, _idx, "====");
      if (idx === 0) {
        this.orgType = query.pid + "";
      }
      let api = "getOrgList";
      let keys = this.labels.map(o => o.id);
      let labelIndex = keys.indexOf(this.orgType - 0);
      let firsttitle = this.labels[labelIndex].name;
      let lasttitle = titles.slice(1, titles.length);
      if (this.orgType == 3) {
        api = "getArea";

        if (query.isSon === 1) {
          lasttitle = titles;
        }
        if (query.isSon === 2) {
          api = "getListByArea";
          query.areaid = query.pid;
          delete query.pid;
        }
        if (query.pid == 3 && idx === 0) {
          query.level = 2;
          delete query.pid;
        }
      }
      this.titles = [firsttitle, ...lasttitle];
      query.orgCodes = this.sysOrgCode.length > 0 ? this.sysOrgCode : -1;
      this.$api.special[api](query).then(res => {
        // 请求是否有备选中的接口 {sysOrgCode: this.sysOrgCode, pid: query.pid} url: api/org/isSelect 返回
        // 返回 let ids = data.map(o => o.id);
        let resData = res.data;
        // resData = resData.map(o => ({isChecked: ids.indexOf(o.id) > -1}))
        if (this.deptData.length > idx) {
          let arrs = new Array(this.deptData.length - idx - 1).fill([]);
          console.log([res.data, ...arrs]);
          this.deptData.splice(
            idx,
            this.deptData.length - idx,
            ...[resData, ...arrs]
          );
        } else {
          this.deptData.push(resData);
          this.search.push("");
        }
        if (query.pid == 1) {
          this.getOrgList({ pid: 101 }, 1, 0);
        }
        if (query.pid == 2) {
          this.getOrgList({ pid: 201 }, 1, 0);
        }
        if (api == "getArea") {
          this.getOrgList({ pid: 1, isSon: 2 }, 1, 0);
        }
        this.acts.splice(idx - 1, 1, _idx);
      });
    },
    // e 是否选中， code sysOrgCode, i 当前层级
    fnChecked(e, item, i) {
      if (e) {
        if (this.sysOrgCode.indexOf(item.sysOrgCode) == -1) {
          this.sysOrgCode.push(item.sysOrgCode);
          this.orgNames.push(item.name || item.orgName);
        }
      } else {
        let idx = this.sysOrgCode.indexOf(item.sysOrgCode);
        this.sysOrgCode.splice(idx, 1);
        this.orgNames.splice(idx, 1);
      }
    },
    fnAllChancked(e, items, i) {
      items.forEach(o => {
        this.fnChecked(e, o, i);
      });
    },
    clearAll() {
      this.sysOrgCode = [];
      this.orgNames = [];
    },
    setQuery() {
      let sysOrgCode = this.sysOrgCode,
        orgNames = this.orgNames;
      //
      window.localStorage.setItem(
        "checked",
        JSON.stringify({ sysOrgCode, orgNames })
      );
      sysOrgCode = sysOrgCode.toString() || "-1";
      let query = { sysOrgCode };
      if (this.cascader.className === "m-indexCascader-box") {
        let { params, name } = this.$route;
        this.$router.replace({
          name,
          params,
          query: { ...this.$route.query, ...query }
        });
      }
      this.$emit("upload", query, orgNames);
    },
    close() {
      this.$emit("close");
    }
  },
  created() {
    let checkeddata = JSON.parse(
      window.localStorage.getItem("checked") || "{}"
    );
    console.log(checkeddata);
    this.sysOrgCode = checkeddata.sysOrgCode || [];
    this.orgNames = checkeddata.orgNames || [];
    this.labels = [
      {
        orgName: "组织机构类型",
        name: "组织机构类型",
        sysOrgCode: "",
        sonCount: 7,
        isSelect: 1,
        id: 1
      },
      {
        orgName: "组织机构性质",
        name: "组织机构性质",
        sysOrgCode: "",
        sonCount: 15,
        isSelect: 1,
        id: 2
      },
      {
        orgName: "行政区划",
        name: "行政区划",
        sysOrgCode: "",
        sonCount: 0,
        isSelect: 1,
        id: 3
      }
    ];
    this.orgType = '1';
    this.getOrgList({ pid: 1 }, 0);
  }
};
</script>

<style lang='scss' scoped>
/* 二级页面样式*/

.m-subCascader-box,
.m-indexCascader-box {
  .icon-guanbi {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.85);
    cursor: pointer;
    z-index: 1000;
    width: 30px;
    height: 30px;
    display: block;
  }
  background-image: linear-gradient(
    -179deg,
    #052d7f 3%,
    #052f85 65%,
    #03205a 99%
  );
  box-shadow: 0 0 4px 1px rgba(122, 54, 54, 0.64);
  border-radius: 8px;
  padding: 14px 24px;
  min-width: 500px;
  min-height: 400px;
  z-index: 999;
  .m-subCascader-tabs,
  .m-indexCascader-tabs {
    .flex-box {
      height: 410px;
      // display: -webkit-box;
      // display: -moz-box;
      // display: -ms-flexbox;
      // display: -webkit-flex;
      display: flex;
      justify-content: center;
      .tabs0 {
        height: 100%;
        flex: auto;
        display: flex;
        dl {
          flex: 1;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-right: 1px solid transparent;
          .ivu-checkbox-wrapper {
            display: block;
          }
          dt {
            font-family: PingFangSC-Medium;
            height: 40px;
            line-height: 40px;
            text-align: center;
            opacity: 0.65;
            font-size: 16px;
            color: #ffffff;
            letter-spacing: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.25);
          }
          .search-dd {
            height: 40px;
            position: absolute;
            width: 50%;
            padding: 8px 10px;
            .ivu-input-wrapper {
              height: 24px;
              position: relative;
            }
            i {
              position: absolute;
              right: 20px;
              top: 14px;
              color: #ffffff;
              opacity: 0.85;
              font-size: 14px;
            }
          }
          .g-height-space {
            height: 50px;
          }
          .allCheck-dd {
            height: 40px;
            padding: 0 4%;
            .ivu-checkbox-wrapper {
              opacity: 0.85;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #ffffff;
              margin-top: 5px;
            }
          }
          .checkbox-dd {
            .pointer {
              cursor: pointer;
            }
            height: 70%;
            overflow-y: auto;
            color: #fff;
            & .pos-relative {
              height: 40px;
              line-height: 40px;
              padding: 0 4%;
              position: relative;
              font-size: 14px;
              .ivu-checkbox-wrapper {
                opacity: 0.85;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #ffffff;
                letter-spacing: 0;
              }
              i {
                font-size: 12px;
                vertical-align: sub;
                position: absolute;
                right: 30px;
                top: 15px;
                color: #007eff;
              }
            }
            & .pos-relative:hover,
            .pos-relative.act {
              background: #2d8cf0;
              i {
                color: #ffffff;
              }
            }
            & .pos-relative.checked {
              background: rgba(45, 140, 240, 0.4);
              i {
                color: #ffffff;
              }
              &:hover {
                background: #2d8cf0;
              }
            }
          }
        }
        dl:first-child {
          .checkbox-dd {
            height: 80%;
          }
        }
        dl:last-child {
          border-right: 1px solid rgba(255, 255, 255, 0.25);
        }
      }
    }
    .btn-box {
      margin-top: 19px;
      text-align: right;
      .ivu-btn {
        width: 80px;
        height: 28px;
        font-size: 16px;
        color: #ffffff;
        border: 1px solid #007eff;
        border-radius: 4px;
      }
      .confirm {
        background: #007eff;
      }
      .cancels {
        border: 1px solid #007eff;
        background: #04236c;
      }
    }
  }
  .m-indexCascader-tabs {
    .btn-box {
      text-align: center;
      .ivu-btn {
        width: 150px;
        height: 40px;
        font-size: 16px;
        color: #ffffff;
        border: 1px solid #007eff;
      }
      .confirm {
        background-color: #007eff;
        margin-right: 13px;
      }
      .cancels {
        // text-align: center;
        color: #007eff;
        background-color: #00030d;
        opacity: 0.75;
        margin-left: 13px;
      }
      .cancels-yellow {
        color: #deb304;
        border-color: #deb304;
        background: #00030d;
      }
    }
  }
}

.m-indexCascader-box {
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  left: 50%;
  top: 50%;
  position: absolute;
  padding: 0;
  transform: translate(-50%, -50%);
  .m-indexCascader-tabs {
    background: url(../../assets/img/special/kuang.png) no-repeat;
    height: 100%;
    opacity: 1;
    font-weight: 700;
    .btn-box {
      position: absolute;
      bottom: -100px;
      width: 100%;
    }
    .flex-box .tabs0 dl {
      .g-shuxian {
        height: 549px;
        position: absolute;
        right: 0;
        top: 0;
        width: 1px;
        background: url(../../assets/img/special/xian.png) repeat-y;
      }
      border: none;
      position: relative;
      dt {
        border: none;
        font-size: 18px;
        background: transparent;
        height: 50px;
        line-height: 50px;
      }
      dd {
        .pos-relative,
        .pos-relative .ivu-checkbox-wrapper,
        .ivu-checkbox-wrapper {
          opacity: 1;
          font-size: 18px !important;
        }
      }
      .search-dd {
        width: 100%;
        .ivu-input-wrapper {
          /deep/ .ivu-input {
            height: 28px;
            font-size: 15px;
            border-color: #27a5cf;
            color: #fff;
          }
        }
        i {
          top: 16px;
        }
      }
      .checkbox-dd {
        height: 400px !important;
      }
    }
    dt {
      background: #2993ff;
      opacity: 1 !important;
    }
  }
  /deep/ .ivu-tabs-bar {
    position: absolute;
    top: -110px;
    width: 100%;
    .ivu-tabs-nav {
      display: flex;
      justify-content: center;
      float: none;
    }
    .ivu-tabs-ink-bar {
      display: none;
    }
    .ivu-tabs-tab {
      width: 221px;
      height: 62px;
      font-size: 28px;
      background: url(../../assets/img/special/navBg.png) no-repeat;
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      line-height: 62px;
      padding: 0;
      margin: 0;
    }
    .ivu-tabs-tab.ivu-tabs-tab-active {
      background: url(../../assets/img/special/navBgAct.png) no-repeat;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.m-subCascader-box {
  position: absolute;
  top: 40px;
  left: 0;
}
</style>

