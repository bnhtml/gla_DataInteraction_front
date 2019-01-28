<template>
  <div class="nomaltable-wrapper">
    <slot class="pos-bottom"></slot>
    <div class="nomaltable" :class="{noborder: !border}">
      <div class="right-button table-button" :class="{tabletabs: tableJson.excelButton && tableJson.excelButton.tableTabs}">
        <span v-for="(excel, excelIndex) in tableJson.excelButton" :key="excelIndex"> 
              <el-upload
                  v-if="excel.type == 'upload'"
                  class="upload-button"
                  action="https://jsonplaceholder.typicode.com/posts/" 
                  :show-file-list="false">
                  <el-button plain size="mini" class="el-icon-document"> 导入</el-button>
              </el-upload>
              <div plain size="mini" class="between-p" @click="export2Excel(tableJson, excel)"> <span v-if="excel.type == 'export'" >查询结果导出 <i class="iconfont icon-daochu"></i></span></div>
      </span>
    </div>
    <el-table v-if="isShow" :data="tableData" :border='border' :row-class-name="tableRow" :span-method="tableJson.spanMethod" :cell-style="tableJson.cellstyle" header-row-class-name="head-row" :show-header="!nohead" v-loading="loading" ref="multipleTable"
      @sort-change="sortable" @selection-change="handleSelectionChange" :height="height">
      <el-table-column v-if="!noid" type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column v-if="tableJson.selectBox" type="selection" :align="tableJson.selectBox.center || 'left'" :width="tableJson.selectBox.width">
      </el-table-column>
      <el-table-column v-for="(column, columnIndex) in tableJson.column" :key="columnIndex" :sortable="column.sortable || false" :label="column.label" :prop="column.prop" :width="column.width || ''" :fixed="column.fixed || false" :min-width="column.minWidth"
        :align="column.align || 'left'" :header-align="column.headerAlign" :class-name="column['class-name'] || ''" :show-overflow-tooltip="column['show-overflow-tooltip']||true">
        <template slot-scope="scope">
                <p v-if="column.type == 'text'" v-html="formatter(scope.row,column,columnIndex,scope.$index)"></p>
                <!-- <p v-if="column.type == 'text'" v-html="formatter(scope.row[column.prop])"></p> -->
                <el-popover
                    v-if="column.type == 'hover'"
                    :placement="column.hover.placement || 'bottom'"
                    :title="column.hover.title || ''"
                    :width="column.hover.width || 150"
                    :trigger="column.hover.trigger || 'hover'"
                    :popper-class="column.hover.popperClass || ''"
                    :content="scope.row[column.prop]">
                    <el-button type="text" size="small" slot="reference" v-html="column.hover.label"></el-button>
                </el-popover>
                <el-button 
                    v-if="column.type == 'handle' && (handle.label || handle.formatter(scope.row,column,columnIndex,scope.$index))" 
                    v-for="(handle, handleIndex) in column.list" 
                    :key="handleIndex" 
                    size="small" 
                    type="text" 
                    @click="handleButtons(handle, scope)"
                    v-html="handle.label || handle.formatter(scope.row,column,columnIndex,scope.$index)">
                </el-button>
                <el-switch
                    v-if="column.type == 'switch'"
                    v-model="scope.row[column.prop]"
                    :active-color="column.config.activeColoe || '#7224D8'"
                    :inactive-color="column.config.inactiveColor || '#999'"
                    :active-value="column.config.value[1]"
                    :inactive-value="column.config.value[0]"
                    @change="switchChange(scope.row, column)">
                </el-switch>
</template>
          </el-table-column>
        </el-table>
            <div class="pagination" v-if="page.totalCount > page.pageSize"> <!--  -->
                <!-- <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="page.total" :current-page="page.pageNumber">
                </el-pagination> -->
                <div class="pageInfo"><!-- 共{{page.totalCount}}条记录 第{{page.pageNumber}}/{{allPage}}页 --></div>
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="page.pageNumber"
                  :page-size="page.pageSize"
                  :total="page.totalCount"
                  layout="prev, pager, next">
                </el-pagination>
            </div>

        </div>

    </div>
</template>

<script>
  import axios from '@/http/fetch.js';
  import appBase from '../../../static/common/app_base'
  export default {
    name: "nomaltable",
    data() {
      let pageNumber = this.$route.query.pageNumber || 1;
      return {
        loading: false,
        tableData: [], //表格数据
        tableUrl: "",
        page: {
          pageNumber, //当前页
          pageSize: 10
        },
        isShow: true
      };
    },
    props: {
      tableJson: Object,
      url: String,
      query: {
        type: Object,
        default: function() {
          return {}
        }
      },
      fileTitle: {
        type: String,
        default: '查询结果'
      },
      border: Boolean,
      axiosType: String,
      pageSize: Number,
      noid: Boolean,
      nohead: Boolean,
      data: Array,
      height: Number
    },
    created() {
      window.eventBus.$on('search', this.search);
    },
    mounted() {
      // this.page.totalCount=100
      if (!this.data) {
        this.init();
      } else {
        this.tableData = this.data;
      }
      eventBus.$on('RESIZE', () => {
        // debugger
        this.isShow = false;
        this.$nextTick(() => {
          this.isShow = true;
        })
      })
    },
    computed: {
      allPage() {
        return Math.ceil(this.page.totalCount / this.page.pageSize)
      }
    },
    methods: {
      search(query) {
        Object.assign(this.query, query);
        console.log(this.query, '====')
        this.getData();
      },
      init() {
        //初始加载
        let page = JSON.parse(sessionStorage.getItem("page"));
        let path = this.$route.path;
        if (page) {
          if (page[path]) {
            this.page.pageNumber = page[path].pageNumber;
            this.page.pageSize = page[path].pageSize;
          }
          sessionStorage.removeItem("page");
        }
        this.page.pageSize = this.pageSize || this.page.pageSize;
        this.getPageData({
          //记录当前页码、每页条数
          pageNumber: this.page.pageNumber,
          pageSize: this.page.pageSize || this.pageSize
        });
        this.getData({
          pageNumber: this.page.pageNumber,
          pageSize: this.page.pageSize
        });
      },
      setRouter(query) {
        let {
          params,
          name
        } = this.$route;
        this.$router.replace({
          name,
          params,
          query
        });
      },
      // 获取数据
      getData(params = {}, type) {
        let _this = this;
        params.pageNumber = params.pageNumber || 1;
        params.pageSize = params.pageSize || this.page.pageSize || 10;
        params = Object.assign({}, this.$route.query, this.query, params);
        // console.log(this.$route.query)
        // this.setRouter(params);
        this.loading = true;
        let httpobj = {
          url: _this.url,
          type: type || _this.axiosType || 'get',
          params: params,
          successfn(d) {
            _this.loading = false;
            // if (d.status != 200) {
            //   _this.$alert(d.msg, "温馨提示");
            //   return;
            // }
            _this.$emit('receive', d);
            if (
              _this.tableJson.formatter &&
              typeof _this.tableJson.formatter == "function"
            ) {
              _this.tableData = _this.tableJson.formatter(d.data);
            } else {
              _this.tableData = d.data;
            }
            let page = d.page;
            _this.page = d.page;
            _this.getPageData({
              pageNumber: _this.page.pageNumber,
              pageSize: _this.page.pageSize
            });
          },
          errorfn: function() {}
        }
        axios(httpobj.url, httpobj.params, httpobj.type).then(httpobj.successfn);
      },
      formatter(row, column, columnIndex, rowIndex) {
        //格式数据
        if (column.formatter) {
          return column.formatter(row, column, columnIndex, rowIndex);
        } else {
          return row[column.prop];
        }
      },
      tableRow({
        row,
        rowIndex
      }) {
        //添加表格斑马线
        if (rowIndex % 2 == 1) {
          return "table-row";
        }
      },
      export2Excel(table, item) {
        let _this = this;
        let {
          url,
          fileName = this.fileTitle
        } = item;
        let params = {
          fileName
        };
        params.pageNumber = params.pageNumber || 1;
        params.pageSize = params.pageSize || this.page.pageSize || 10;
        params = Object.assign({}, this.$route.query, this.query, params);
        this.loading = true;
        let httpobj = {
          url,
          type: _this.axiosType || 'post',
          params,
          successfn(d) {
            _this.loading = false;
            // xls csv
            appBase.downloadFile(d, fileName, 'xls')
          },
          errorfn: function() {}
        }
        axios(httpobj.url, httpobj.params, httpobj.type, 'byte').then(httpobj.successfn);
        //js导出
        // let headers = [];
        // let props = [];
        // table.column.forEach(e => {
        //   if (e.prop) {
        //     props.push(e.prop);
        //     headers.push(e.label);
        //   }
        // });
        // require.ensure([], () => {
        //   const { export_json_to_excel } = require('../../vendor/Export2Excel');
        //   const tHeader = headers;
        //   const filterVal = props;
        //   const list = this.tableData;
        //   const data = this.formatJson(filterVal, list);
        //   export_json_to_excel(tHeader, data, item.name);
        // })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      switchChange(row, column) {
        //Switch 开关回调
        let _this = this;
        let params = {};
        let id = column.idName || _this.tableJson.idName || "id";
        params[id] = row[id];
        params[column.prop] = row[column.prop];
        _this.loading = true;
        _this.Axios({
          url: column.axiosUrl || _this.url,
          type: column.axiosType || _this.axiosType,
          params: params,
          successfn(res) {
            _this.loading = false;
            if (res.code != 200) {
              _this.$alert(res.msg, "温馨提示");
              _this.tableData.map(e => {
                if (e[id] == row[id]) {
                  e[column.prop] =
                    e[column.prop] == column.config.value[0] ?
                    column.config.value[1] :
                    column.config.value[0];
                }
              });
            }
          }
        });
      },
      handleSelectionChange(selection) {
        //勾选选择框
        // console.log(selection);
      },
      handleButtons(handle, scope) {
        if (handle.url) {
          this.$router && this.$router.push({
            path: handle.url
          });
        } else if (handle.onClick) {
          handle.onClick(this, this.$parent, scope.row);
        } else {
          if (handle.type == "delete") {
            this.handleDelete(handle, scope.row);
          }
          handle.callback && handle.callback(this, this.$parent, scope.row);
        }
      },
      handleDelete(handle, row) {
        //删除
        let _this = this;
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            //删除
            _this.loading = true;
            let params = {};
            let id = handle.idName || _this.tableJson.idName || "id";
            params[id] = row[id];
            _this.Axios({
              url: handle.axiosUrl,
              type: handle.axiosType,
              params: params,
              successfn(res) {
                _this.loading = false;
                if (res.code != 200) {
                  _this.$alert(res.msg, "温馨提示");
                  return;
                }
                _this.tableData = _this.tableData.filter(e => {
                  return e[id] != row[id];
                });
                _this.$message({
                  type: "success",
                  message: "删除成功！"
                });
              }
            });
          })
          .catch(() => {
            //取消删除
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      // 分页导航
      handleCurrentChange(val) {
        this.page.pageNumber = val;
        this.getPageData({
          pageNumber: this.page.pageNumber
        });
        this.getData({
          pageNumber: this.page.pageNumber,
          pageSize: this.page.pageSize
        });
      },
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.getData({
          pageNumber: this.page.pageNumber,
          pageSize: this.page.pageSize
        });
      },
      sortable(data) {
        if (data.prop && data.order) {
          let ruleNames = {
            'descending': 'desc',
            'ascending': 'asc'
          };
          this.getData({
            sort: data.prop,
            sortRule: ruleNames[data.order]
          });
        }
      },
      getPageData({
        pageNumber,
        pageSize,
        path
      }) {
        //存储页，条数
        let page = {
          pageNumber: pageNumber || this.page.pageNumber,
          pageSize: pageSize || this.page.pageSize
        };
        let session = {};
        path = path || this.$route.path;
        session[path] = page;
        // sessionStorage.setItem("page", JSON.stringify(session));
        sessionStorage.setItem("page", JSON.stringify({}));
      },
      Axios({
        url,
        type,
        params,
        successfn,
        errorfn
      }) {
        let _data = null;
        type = type || "get";
        params = params || {};
        if (type == "get") {
          _data = {
            params: params
          };
        } else if (type == "post") {
          _data = params;
        }
        this.axios[type](url, _data)
          .then(function(response) {
            //success
            let {
              data
            } = response;
            data.code = data.state;
            data.data = data.result.data;
            data.page = data.result.page;
            successfn && typeof successfn == "function" && successfn(data);
          })
          .catch(function(error) {
            //error
            // console.error('接口异常', error);
            errorfn && typeof errorfn == "function" && errorfn(error);
          });
      }
    },
  };
</script>

<style scoped lang='scss'>
  .nomaltable .el-table,
  .nomaltable .el-table__expanded-cell,
  .nomaltable /deep/ .el-table th,
  .nomaltable /deep/ .el-table tr {
    background: transparent;
  }
  .nomaltable /deep/ .has-gutter {
    color: #abaebb;
    background: #EFF2F5;
    border-radius: 4px;
    height: 40px;
    line-height: 40px;
  }
  .nomaltable /deep/ {
    .has-gutter th {
      border: none;
      padding: 0;
    }
    .el-table__row td {
      border-bottom: 1px solid #EBEEF5;
    }
    .el-button {
      font-size: 14px;
      color: #33ABFB;
      padding: 0;
      .green{
        color: #01D19F;
      }
      .orange{
        color: #FC8635;
      }
    }
  }
  .nomaltable /deep/ .el-table__row {
    color: #333;
    font-size: 14px;
  }
  .pagination {
    // color: rgba(255, 255, 255, .85);
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
  }
  .el-pagination {
    color: rgba(255, 255, 255, .85);
  }
  .el-pagination /deep/ .btn-next,
  .el-pagination /deep/ .btn-prev,
  .pagination /deep/ .el-pager li {
    background: transparent;
    border: 1px solid rgba(0,0,0,0.15);
    color: #333;
    min-width: 32px;
    border-radius: 4px;
    height: 32px;
    line-height: 30px;
    margin-right: 8px;
  }
  .pagination /deep/ .el-pager li.active {
    background: #3196fa;
    border-color: transparent;
    color: #fff;
  }
 
  .pagination /deep/ .el-pagination__editor.el-input {
    width: 30px;
  }
  .pagination /deep/ .el-pagination__editor,
  .pagination /deep/ .el-pagination__editor.el-input .el-input__inner,
  .pagination /deep/ .el-pagination span:not([class*=suffix]) {
    height: 30px;
    line-height: 30px;
    
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background: rgba(255, 255, 255, 0.15);
  }
  .table-button {
    text-align: right;
    // height: 50px;
    height: 10px;
  }
  .between-p {
    font-size: 16px;
    cursor: pointer;
    display: inline-block;
    line-height: 50px;
    position: relative;
    top: -5px;
  }
  .between-p:hover {
    color: #2d8cf0;
  }
</style>
