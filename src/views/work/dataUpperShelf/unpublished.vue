// 未发布
<template>
  <div class="unpublished">
    <!-- <c-admin :deptType="deptType"> -->
    <el-card shadow="always" class="unpublished-header">
      <p class="titleLeftBorder">筛选查询</p>
      <TableSearch :searchs='searchs' v-if='isShow'></TableSearch>
    </el-card>
    <el-card shadow="always" class="unpublished-cont mt20">
      <p class="titleLeftBorder">
        未发布数据接口列表
        <span class="right"><i class="icon iconfont icon-gantanhao"></i>共有数据接口XXX个</span>
      </p>
      <div>
        <NomalTable :table-json="tableJson" :data="data" v-if='isShow'></NomalTable>
      </div>
    </el-card>
    <!-- </c-admin> -->
  </div>
</template>

<script>
  import NomalTable from "@/components/table/NomalTable.vue";
  import TableSearch from "../../../components/table/TableSearch.vue";
  import FileUpload from "@/components/fileUpload";
  import cAdmin from "../admin.vue";
  import {
    unpublished
  } from './table.js'
  export default {
    data() {
      return {
        searchs: {}, // 搜索类型数据
        tableJson: {}, // 表头标题
        data: [], //表格数据
        tableQuery: unpublished,
        isShow: false,
      };
    },
    components: {
      NomalTable,
      cAdmin,
      TableSearch,
      FileUpload
    },
    mounted() {
      this.init();
    },
    methods: {
      fileUpload() {
        const h = this.$createElement;
        this.$confirm(
            h(
              "div", {
                style: {
                  display: "flex"
                }
              }, [
                h("p", null, "接口说明文档："),
                h("div", {
                  style: {
                    lineHeight: '40px'
                  }
                }, [
                  h(
                    "span", {
                      src: "a.txt",
                      style: {
                        display: 'block',
                        color: "#33ABFB",
                        lineHeight: '24px',
                        position: 'relative'
                      }
                    }, [
                      h("i", {
                        style: {
                          position: "absolute",
                          zIndex: '10',
                          left: '60px',
                          top: '-6px',
                          color: '#666',
                          fontSize: '10px',
                          cursor: 'pointer'
                        }
                      }, 'x'),
                      "接口文档"
                    ]
                  ),
                  h("FileUpload", null),
                  h(
                    "a", {
                      src: "a.txt",
                      style: {
                        color: "#33ABFB",
                        marginLeft: "10px"
                      }
                    },
                    "模板下载"
                  ),
                  h(
                    "p", {
                      style: {
                        color: "#999"
                      }
                    },
                    "支持扩展名：.rar .zip .doc .docx .pdf"
                  )
                ])
              ]
            ),
            "数据接口文档上传", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              showCancelButton: true,
              showConfirmButton: true,
              showClose: false
            }
          )
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      init() {
                this.isShow = false;
                let tableJson = this.tableQuery.tableJson;
                let searchs = this.tableQuery.searchs;
                let data = this.tableQuery.data;
                this.searchs = searchs;
                this.tableJson = tableJson;
                this.data = data;
                this.$nextTick(() => {
                    this.isShow = true;
                })
            },
    },
    beforeRouteUpdate(to, from, next) {
      this.deptType = to.query.deptType - 0;
      next();
    }
  };
</script>

<style scoped lang="scss">

</style>


