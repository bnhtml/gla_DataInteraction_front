// 选择管辖范围组件的封装
<template>
  <div class="jurisdictionTree">
     <FormItem :label="labelName">
        <Row>
            <i-col span='21'><i-input :value="jurisdiction.jurisdictionNames" readonly clearable :placeholder="labelTitle" @on-change="clearDeptName"></i-input></i-col>
            <i-col span='3' style="padding:0 10px 0 10px"><i-button type="primary" @click="openDept">选择</i-button></i-col>
        </Row>
     </FormItem>

       <!-- 选择管辖范围-->
      <Modal class-name='modal-center' v-model="queryDept" :title="labelTitle" @on-cancel="cancel" @on-ok="getSelectDept" :transfer="false" class="addModal">
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
      name: 'jurisdictionTree',
      props:['zTreeName', 'labelName'],
      data () {
        return {
          labelTitle: '请选择' + this.labelName,
          queryDept: false, //选择按部门查询弹窗
            jurisdiction: {
                jurisdictionNames: "",
                jurisdictionIds: []
            },
            jurisdictionSetting: {
                check: {
                  enable: true,
                  // nocheckInherit: false,
                  chkboxType: { Y: "", N: ""}
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                   beforeClick: this.beforeClick,
                    // onClick: this.getSelectDept
                }
            },
            // zDeptNodes: [],   // 管辖范围数据
        }
      },
      created () {},
      mounted () {},
      methods:{
            init () {
               this.queryDept = true;
               this.getJurisdictionTree();
            },
            // 点击选择打开模态框
            openDept() {
              this.cancel(); //销毁
              this.init(); //初始化
            },
            //获取管辖范围zTree
            getJurisdictionTree() {
                this.$api.getMechanismIdTree().then(data => {
                    let zDeptNodes = data.data;
                    if(zDeptNodes) {
                      zDeptNodes.forEach((v, i) => {
                        this.jurisdiction.jurisdictionIds && this.jurisdiction.jurisdictionIds.forEach((item, index) => {
                          if(Number(v.id) == Number(item)) {
                            v.checked = true;
                          }  
                        }) 
                      });
                    }
                     var addJurisdictionDeptObj = $.fn.zTree.init($("#" + this.zTreeName), this.jurisdictionSetting, zDeptNodes);
				         addJurisdictionDeptObj.expandAll(true); //默认将所有的节点展开
                  
                });
            },
            beforeClick(treeId, treeNode) {
              var zTree = $.fn.zTree.getZTreeObj(this.zTreeName);
              zTree.checkNode(treeNode, !treeNode.checked, null, true);
              return false;
            },
            getSelectDept(e, treeId, treeNode) {
              var zTree = $.fn.zTree.getZTreeObj(this.zTreeName),
                  nodes = zTree.getCheckedNodes(true),
                  vIds=[], vNames="";
                  for (var i=0, l=nodes.length; i<l; i++) {
                    vIds.push(nodes[i].id);
                    vNames += nodes[i].name + ",";
                  }
                  if (vNames.length > 0 ) vNames = vNames.substring(0, vNames.length-1);

                    this.jurisdiction.jurisdictionNames = vNames;
                    this.jurisdiction.jurisdictionIds = vIds;
                    this.$emit('parentDept',this.jurisdiction);
            },
            cancel() {
                var zTreeObj = $.fn.zTree.getZTreeObj('#' + this.zTreeName);
                if (zTreeObj) {
                    zTreeObj.destroy();
                }
            },
            // 清除input里面的值
            clearDeptName(){
                this.jurisdiction.jurisdictionNames='';
                this.jurisdiction.jurisdictionIds="";
                this.$emit('parentDept',this.jurisdiction);
            },
            emitEvent(id,name){
                this.jurisdiction.jurisdictionNames = name;
                this.jurisdiction.jurisdictionIds = id;
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

