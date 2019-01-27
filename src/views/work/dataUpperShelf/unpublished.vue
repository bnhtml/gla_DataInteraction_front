// 未发布
<template>
  <div class="unpublished">
    <el-card shadow="always" class="unpublished-header">
      <p class="titleLeftBorder">筛选查询</p>
      <TableSearch :searchs='searchs' v-if='isShow'></TableSearch>
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
      this.init()
    },
    mounted() {},
    methods: {
      init(){
        this.isShow = false;
        this.$nextTick(() => this.isShow = true);

      },
      receive(res) {
        this.totalCount = res.page.totalCount;
      },
      fileUpload(row) {
        const h = this.$createElement;
        this.$confirm(
          h("FileUpload", {
            key: row.resourceId,
            props: {
              sendData: {resourceId: row.resourceId},
              fileLink: row.filedDownloadUrl,
              fileName1: row.fileName
            }
          }),
            "数据接口文档上传", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              showCancelButton: false,
              showConfirmButton: true,
              showClose: false
            }
          )
          .then(() => {
            this.init();
          })
      },
      publish(resourceId) {
        // debugger
        this.$api.interface_commit({
          resourceId
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.init();
        }, error => {
          this.$message({
            type: 'error',
            message: error
          })
        })
      },
      testApi(query) {

        const loading = this.$loading({
          lock: true,
          // text: 'Loading',
          // spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$api.testApikey(query).then(res => {
          if (res.data) {
            loading.close();
            this.$confirm(`
              <div style="display:flex;"><p>APIkey：</p><p>${res.data.apiKey}</p></div>
              <div style="display:flex;"><p>有效期：</p><p>${res.data.effectiveTime}</p></div>
              <div style="display:flex;"><p>当前状态：</p><p>${['失效', '有效'][res.data.apiKeyStatus]}</p></div>
            `, "测试APIkey", {
              confirmButtonText: '确定',
              showCancelButton: false,
              showConfirmButton: true,
              dangerouslyUseHTMLString: true,
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


