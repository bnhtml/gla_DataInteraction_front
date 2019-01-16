<template>
    <div>
        <div class="pagination" v-if="page.total > page.pageSize">
            <div class="pageInfo">共{{page.total}}条记录 第{{page.currentPage}}/{{allPage}}页</div>
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="page.currentPage" :page-size="page.pageSize" :total="page.total" layout="prev, pager, next, jumper">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                page: {
                    currentPage: 1, //当前页
                    pageSize: 10
                }
            }
        },
        props: {
            url: String,
            axiosType: String,
        },
        computed: {
            allPage() {
                return Math.ceil(this.page.total / this.page.pageSize)
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                //初始加载
                let page = JSON.parse(sessionStorage.getItem("page"));
                let path = this.$route.path;
                if (page) {
                    if (page[path]) {
                        this.page.currentPage = page[path].currentPage;
                        this.page.pageSize = page[path].pageSize;
                    }
                    sessionStorage.removeItem("page");
                }
                this.page.pageSize = this.pageSize || this.page.pageSize;
                this.getPageData({
                    //记录当前页码、每页条数
                    currentPage: this.page.currentPage,
                    pageSize: this.page.pageSize || this.pageSize
                });
                this.getData({
                    page: this.page.currentPage,
                    pageSize: this.page.pageSize
                });
            },
            // 分页导航
            handleCurrentChange(val) {
                this.page.currentPage = val;
                this.getPageData({
                    currentPage: this.page.currentPage
                });
                this.getData({
                    page: this.page.currentPage,
                    pageSize: this.page.pageSize
                });
            },
            getPageData({
                currentPage,
                pageSize,
                path
            }) {
                //存储页，条数
                let page = {
                    currentPage: currentPage || this.page.currentPage,
                    pageSize: pageSize || this.page.pageSize
                };
                let session = {};
                path = path || this.$route.path;
                session[path] = page;
                sessionStorage.setItem("page", JSON.stringify(session));
            },
            // 获取数据
            getData(params, type) {
                let _this = this;
                params.page = params.page || 1;
                params.pageSize = params.pageSize || this.page.pageSize || 10;
                this.loading = true;
                this.Axios({
                    url: _this.url,
                    type: type || _this.axiosType,
                    params: params,
                    successfn(d) {
                        _this.loading = false;
                        if (d.code != 200) {
                            _this.$alert(d.msg, "温馨提示");
                            return;
                        }
                        // if (
                        //     _this.tableJson.formatter &&
                        //     typeof _this.tableJson.formatter == "function"
                        // ) {
                        //     _this.tableData = _this.tableJson.formatter(d.data);
                        // } else {
                        //     _this.tableData = d.data;
                        // }
                        let page = d.page;
                        // page = {
                        //     current_page:1,
                        //     pageSize:10,
                        //     total:158
                        // }
                        _this.page.currentPage = parseInt(page.currentPage);
                        _this.page.pageSize = parseInt(page.pageSize);
                        _this.page.total = parseInt(page.total);
                        _this.getPageData({
                            currentPage: _this.page.currentPage,
                            pageSize: _this.page.pageSize
                        });
                    },
                    errorfn: function() {}
                });
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
                    .then((response)=> {
                        //success
                        let {
                            data
                        } = response;
                        data.code = data.status;
                        data.data = data.result.data;
                        data.page = data.result.page;
                        this.page = data.page;
                        successfn && typeof successfn == "function" && successfn(data);
                    })
                    .catch(function(error) {
                        //error
                        errorfn && typeof errorfn == "function" && errorfn(error);
                    });
            }
        }
    }
</script>

<style scoped>

.pagination{
  color: rgba(255,255,255,.85);
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.el-pagination{
  color: rgba(255,255,255,.85);
  
}
.el-pagination /deep/ .btn-next, .el-pagination /deep/ .btn-prev,.pagination /deep/ .el-pager li{
  background: transparent;
  border: 1px solid #495374;
  color: rgba(255,255,255,.85);
  min-width: 22px;
  border-radius: 4px;
  height: 22px;
  line-height: 18px;
  margin-right: 8px;
}
.pagination /deep/ .el-pager li.active{
  background: #2d8cf0;
}
.pagination /deep/ .el-pagination__jump{
  color: rgba(255,255,255,.85);
}
.pagination /deep/ .el-pagination__editor.el-input{
  width: 30px;
}
.pagination /deep/ .el-pagination__editor,.pagination /deep/ .el-pagination__editor.el-input .el-input__inner,.pagination /deep/ .el-pagination span:not([class*=suffix]){
  height: 20px;
  line-height: 20px;
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  background: rgba(255, 255, 255, 0.15);
}
</style>

