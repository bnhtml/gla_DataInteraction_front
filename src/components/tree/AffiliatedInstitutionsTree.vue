// 选择所属机构、 老干部的信息录入树封装
<template>
    <section class="deptTreeBox">
        <div class="search">
            <FormItem :label="labelName" :prop="propName">
                <Row>
                    <i-col span='18'><i-input :value="dept.deptName" readonly clearable :placeholder="labelTitle" @on-change="clearDeptName"></i-input></i-col>
                    <i-col span='6' style="padding:0 10px 0 10px"><i-button type="primary" @click="openDept">选择</i-button></i-col>
                </Row>
            </FormItem>
        </div>
        <!-- 选择所属机构-->
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
    </section>
</template>
<script type='text/javascript'>
    export default {
        name:'deptTree',
        props: ['zTreeName', 'labelName', 'propName'],
        data(){
            return{
                labelTitle: '请选择' + this.labelName,
                queryDept: false, //选择按部门查询弹窗
                dept: {
                    deptName: "",
                    deptId: ""
                },
                deptSetting: {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: this.getSelectDept
                    }
                },
                zDeptNodes: [],   // 所属机构数据
            }
        },
        created () {},
        mounted () {},
        methods:{
            init () {
               this.queryDept = true;
               this.getDeptTree();
            },
            // 点击选择打开模态框
            openDept() {
              this.cancel(); //销毁
              this.init(); //初始化
            },
            //获取所属机构zTree
            getDeptTree() {
                this.$api.getMechanismIdTree().then(data => {
                    this.zDeptNodes = data.data;
                    $.fn.zTree.init($("#" + this.zTreeName), this.deptSetting, this.zDeptNodes);
                    var treeDemoObj = $.fn.zTree.init($("#" + this.zTreeName), this.deptSetting, this.zDeptNodes);
				        treeDemoObj.expandAll(true); //默认将所有的节点展开
                });
            },
            getSelectDept(e, treeId, treeNode) {
                // if(treeNode.id !== 1){
                    this.dept.deptName = treeNode.name;
                    this.dept.deptId = treeNode.id;
                    this.$emit('parentDept',this.dept);
                    this.queryDept = false;
                // }
            },
            cancel() {
                var zTreeObj = $.fn.zTree.getZTreeObj('#' + this.zTreeName);
                if (zTreeObj) {
                    zTreeObj.destroy();
                }
            },
            // 清除input里面的值
            clearDeptName(){
                this.dept.deptName='';
                this.dept.deptId="";
                this.$emit('parentDept',this.dept);
            },
            emitEvent(id,name){
                this.dept.deptName = name;
                this.dept.deptId = id;
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