<template>
  <!-- 筛选 -->
  <div class="nomaltable">
    <!-- <div class="search-header">筛选查询</div> -->
    <div class="search-box" v-loading="loading" >
      <el-form :inline="true" :model="searchVal" class='search-box-cont' > 
        <el-form-item :label="search.label" v-for="(search, searchIndex) in searchs.list" :key="searchIndex">
          <!-- 输入框 -->
          <el-input v-if="search.type == 'input-text'" v-model="search.value" :placeholder="search.placeholder" style='width:300px'></el-input>
          <!-- 下拉框 -->
          <el-select @change="selectChange(arguments[0], search)" v-else-if="search.type == 'input-select'" v-model="search.value" :placeholder="search.placeholder">
            <el-option v-for="(option, optionIndex) in search.options" :key="optionIndex" :label="option.name" :value="option.value"></el-option>
          </el-select>
          <!-- 日期 -->
          <el-date-picker v-else-if="search.type == 'input-date'" v-model="search.value" :type="search.datetype || 'daterange'" :align="search.align || 'center'" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="search.havaFaster && pickerOptions"
            :value-format="search.valueFormat">
          </el-date-picker>
          <!-- 单选框 -->
          <span v-else-if="search.type == 'input-radio'">
              <el-radio v-for="(radio, index) in search.options" :key="index" v-model="search.value" :label="radio.value">{{radio.name}}</el-radio>
          </span>
        </el-form-item>
        <el-form-item  >
            <el-button type="primary"   @click="search(searchs)">
                {{searchs.btn && searchs.btn.label || '查询'}}
            </el-button>
            <!-- <el-button size="small" plain @click="resetForm(searchs)" class="buttonStyle reset">重置</el-button> -->
        </el-form-item>
        <!-- <p class='more' v-if='searchs.list.length>4' @click="changeMore">更多查询条件 <i :class="'iconfont '+ moreIcon.flag "></i></p> -->
      </el-form>
    </div>
    <!--  操作按钮-->
    <!-- <el-form  style='paddingTop:12px;' class="search-btn" v-if='searchs.list.length>=4'>
      <el-form-item>
        <el-button size="small" class="buttonStyle" @click="search(searchs)" >
          {{searchs.btn && searchs.btn.label || '查询'}}
        </el-button>
        <el-button size="small" plain @click="resetForm(searchs)" class="buttonStyle reset">重置</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {
          //日期
          shortcuts: [{
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        searchVal: {}, //搜索
        loading: false,
        moreIcon: {
          up: 'icon-xiangshang', // 向上
          down: 'icon-xiangxia', // 向下
          flag: 'icon-xiangxia', // 转换
        },
        serachBH: {
          up: 'auto',
          down: '70px',
          flag: '70px',
        }, // 一行的高
        serachBCH: {
          up: 'auto',
          down: '50px',
          flag: '50px',
        },
        searchFlag: 3,
        posBottom:{
          position:'absolute',
          bottom:'-50px'
        }
      };
    },
    props: {
      searchs: Object
    },
    computed: {
      
    },
    mounted() {
      // console.log(this.changePos())
      this.resetForm(this.searchs);
    },
    methods: {
      selectChange(value, {
        change = () => {}
      }) {
        change(this, value);
      },
      search(search) {
        //搜索
        search.list.forEach((e, i) => {
          this.searchVal[e.name] = e.value;
        });
        window.eventBus.$emit('search', this.searchVal);
        console.log('搜索内容', this.searchVal)
      },
      resetForm(search) {
        //重置
        search.list.forEach((e, i) => {
          e.value = "";
          this.searchVal[e.name] = e.value;
        });
      },
      formatter(opt) {
        let arr = [];
        let index = [];
        let _data = null;
        let _this = this;
        opt.forEach((e, i) => {
          if (e.type == "input-select" || e.type == "input-radio") {
            if (!e.url) return;
            this.loading = true;
            let type = e.axiosType || "post";
            let params = e.params || {};
            if (type == "get") {
              _data = {
                params: params
              };
            } else if (type == "post") {
              _data = params;
            }
            arr.push(
              this.promiseAxios({
                url: e.url,
                type,
                data: _data
              })
            );
            index.push(i);
          }
        });
        if (arr.length > 0) {
          this.$axios.all(arr).then(function(res) {
            _this.loading = false;
            index.map((e, i) => {
              if (
                _this.searchs.list[e].formatter &&
                typeof _this.searchs.list[e].formatter == "function"
              ) {
                _this.searchs.list[e].options = _this.searchs.list[e].formatter(
                  res[i].data,
                  i
                );
              } else {
                _this.searchs.list[e].options = res[i].data;
              }
            });
          });
        }
      },
      promiseAxios({
        url,
        type,
        data
      }) {
        return this.$axios[type](url, data);
      },
      changeMore() {
        if (this.moreIcon.flag == this.moreIcon.down) {
          this.$nextTick(() => {
            this.moreIcon.flag = this.moreIcon.up;
            this.serachBH.flag = this.serachBH.up;
            this.serachBCH.flag = this.serachBCH.up;
          })
        } else if (this.moreIcon.flag == this.moreIcon.up) {
          this.$nextTick(() => {
            this.moreIcon.flag = this.moreIcon.down;
            this.serachBH.flag = this.serachBH.down;
            this.serachBCH.flag = this.serachBCH.down;
          })
        }
      },
      // changePos(){
      //   if(this.searchs.list.length<4){
      //     return this.posBottom
      //   }else{
      //     return {position:'',bottom:''}
      // }
      // }
    },
    computed: {},
    watch: {},
    created() {
      this.formatter(this.searchs.list);
    },
    beforeDestroy() {
      window.eventBus.$off('search');
    }
  };
</script>


<style scoped lang='less'>
  .nomaltable /deep/ .el-form-item__content {
    display: inline-block;
  }
  .nomaltable /deep/ .el-form-item__content>button {
    vertical-align: top;
  }
  .search-box {
    position: relative;
    margin: 20px 0 -5px 0px; 
  }
  .search-box /deep/ .el-form-item__label {
    font-size: 16px;
  }
  .buttonStyle.el-button {
    height: 30px;
    color: #06c5ea; //#2d8cf0;
    border-color: #06c5ea; //#2d8cf0;
    background: #1b2850;
    padding: 0 12px;
    font-size: 16px;
  }
  .search-box /deep/ .el-form-item__content,
  .search-box /deep/ .el-input__inner,
  .search-box /deep/ .el-form-item__label,
  .search-box /deep/ .el-input__icon {
    line-height: 30px;
    // background: transparent;
  }
  .search-box /deep/ .el-input__inner {
    height: 30px;
  }
  .nomaltable .el-form-item {
    margin-right: 10px;
  }
  .search-box /deep/ .el-date-editor {
    i.el-icon-date {
      margin-top: -6px;
    }
    input {
      background: transparent;
      // color: #fff;
    }
  }
</style>

<style lang='less' scoped>

  
  
</style>