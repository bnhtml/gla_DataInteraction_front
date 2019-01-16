// 角色设置树封装
<template>
  <div class="roleManagementTree">
    <FormItem :label="labelName" :prop="propName">
      <Row>
        <i-col span="18">
          <i-input :value="fatherRole.parentName" readonly clearable :placeholder="labelTitle" @on-change="clearDeptName"></i-input>
        </i-col>
        <i-col span="6" style="padding:0 10px 0 10px">
           <Button type="primary" @click="openAdministrative">选择</Button>
        </i-col>
      </Row>
    </FormItem> 

    <!-- 选择行政划区-->
    <Modal class-name='modal-center' v-model="queryDept" :title="labelTitle" @on-cancel="cancel" :transfer="false" class="addModal">
        <p slot="header">
            <span>{{labelTitle}}</span>
        </p>
        <div id="checkTree" style="height: 15rem; overflow: auto;">
            <div class="tree-box">
                <div class="zTreeDemoBackground left">
                    <ul :id="zTreeName" class="ztree"></ul>
                    <!-- <ul id="ztree" class="ztree"></ul> -->
                </div>
            </div>
        </div>
    </Modal>   

  </div>
</template>
<script type="text/javascript">
    export default {
      name: 'roleManagementTree',
      props: ["labelName", "propName"],
      data () {
        return {
          labelTitle: '请选择' + this.labelName,
          zTreeName: 'administrativeDivisionTree',
          queryDept: false, //控制行政区划弹框
          fatherRole: {
             uproleId: "", //父角色id
             parentName: '',  //行政名称
          },
           //初始化ztree的配置
          fatherRoleTreeSetting: {
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: this.getSelectFatherRole,
            } 
          },
          fatherRoleTree: [], //父角色tree数据
        }
      },
      methods: {
        init () {  // 初始化数据；
          this.queryDept = true;
          this.getFatherRoleTree ();
        },
        // 点击选择打开模态框
        openAdministrative () {
            this.cancel(); //销毁
            this.init(); //初始化
        },
        // 获取父角色ztree
        getFatherRoleTree () {
           this.$api.getRoleList().then(data => {
               this.fatherRoleTree = data.data;
              $.fn.zTree.init($("#" + this.zTreeName), this.fatherRoleTreeSetting, this.fatherRoleTree);
              var treeObj = $.fn.zTree.getZTreeObj(this.zTreeName);
                  treeObj.expandAll(true); //默认将所有的节点展开
           })
        },
        
        getSelectFatherRole (e, treeId, treeNode) {
          if (treeNode){
            this.fatherRole.uproleId = treeNode.uproleId;
            this.fatherRole.parentName = treeNode.parentName;
            this.$emit('parentDept', this.fatherRole);
            this.queryDept = false;
          }

        },
        cancel () {
           var zTreeObj = $.fn.zTree.getZTreeObj('#' + this.zTreeName);
            if (zTreeObj) {
                zTreeObj.destroy();
            }
        },
         // 清除input里面的值
        clearDeptName () {
            this.fatherRole.uproleId = '';
            this.fatherRole.parentName = '';
            this.$emit('parentDept',this.fatherRole); 
        },
        emitEvent(id,name){
          this.fatherRole.uproleId = name;
          this.fatherRole.parentName = name;
        }
        }   
    }
</script>
<style lang="scss" scoped>
  .addModal {
    .ivu-form-item {
      padding-right: 5%;
    }
    p {
      width: 40%;
      position: relative;
      padding-left: 3%;
       color: rgba(255,255,255,0.85);
      span {
        color: rgba(255,255,255,0.85);
      }
      span:before {
        content: '';
        width: 6px;
        height: 19px;
        background-color: #5E9BE4;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
</style>