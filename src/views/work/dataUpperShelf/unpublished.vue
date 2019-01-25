// 未发布
<template>
  <div class="unpublished">
    <el-card shadow="always" class="unpublished-header">
      <p class="titleLeftBorder">筛选查询</p>
      <TableSearch :searchs='searchs' v-if='isShow'></TableSearch>
      <el-radio-group v-model="query.isEncap" size="small" class="radio">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="待发布"></el-radio-button>
        <el-radio-button label="未封装"></el-radio-button>
      </el-radio-group>
    </el-card>
    <el-card shadow="always" class="unpublished-cont mt20 g-tableCard">
      <p class="titleLeftBorder">
        未发布数据接口列表
        <span class="right"><i class="icon iconfont icon-gantanhao"></i>共有数据接口{{totalCount}}个</span>
      </p>
      <div>
        <NomalTable :table-json="tableJson" :url="url" :query="query" axiosType="post" @receive="receive" v-if='isShow'></NomalTable>
      </div>
    </el-card>
  </div>
</template>

<script>
  import NomalTable from "@/components/table/NomalTable.vue";
  import TableSearch from "../../../components/table/TableSearch.vue";
  import FileUpload from "@/components/fileUpload";
  import cAdmin from "../admin.vue";
  import {
    unpublished
  } from './table.js';
  export default {
    data() {
      return {
        isShow: false,
        query: {
          depart: this.$route.query.user === 'admin' ? '' : this.$route.query.user,
          isEncap: '',
        },
        totalCount: 0,
        url: this.$SERVER_BASE_URL + '/new_interface/getUnpublished_interface',
        ...unpublished,
      };
    },
    components: {
      NomalTable,
      cAdmin,
      TableSearch,
      FileUpload
    },
    created() {
      this.isShow = false;
      this.$nextTick(() => this.isShow = true);
    },
    mounted() {},
    methods: {
      receive(res) {
        this.totalCount = res.page.totalCount;
      },
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
      publish(resourceId) {
        this.$api.interface_commit({
          resourceId
        }).then(res => {}).catch(error => this.$message({
          type: 'error',
          message: error
        }))
      },
      testApi(query) {
        this.$api.testApikey(query).then(res => {
          if (res.data && res.data.apiKey) {
            this.$confirm(res.data.apiKey, "APIkey", {
              confirmButtonText: '确定',
              showCancelButton: false,
              showConfirmButton: true,
              showClose: false,
            })
          }
        })
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.deptType = to.query.deptType - 0;
      next();
    }
  };
</script>

<style scoped lang="scss">
  .unpublished-header {
    position: relative;
    .radio {
      position: absolute;
      left: 560px;
      top: 51px;
    }
  }
</style>


