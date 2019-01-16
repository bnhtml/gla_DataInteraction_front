// 行政区划树封装
<template>
  <div class="administrativeTree">
    <FormItem :label="labelName" :prop="propName">
      <Row>
        <i-col span="18">
          <Input :value="administrative.administrationName" readonly clearable :placeholder="labelTitle" @on-change="clearDeptName"/>
        </i-col>
        <i-col span="6" style="padding:0 10px 0 10px">
           <Button type="primary" @click="openAdministrative">选择</Button>
        </i-col>
      </Row>
    </FormItem> 

    <!-- 选择行政划区-->
    <Modal v-model="queryDept" :title="labelTitle" @on-cancel="cancel" :transfer="false" class="addModal">
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
      name: 'administrativeTree',
      props: ["labelName", "propName"],
      data () {
        return {
          labelTitle: '请选择' + this.labelName,
          zTreeName: 'administrativeDivisionTree',
          queryDept: false, //控制行政区划弹框
          administrative: {
             disCode: "", //行政区划
             administrationName: '',  //行政名称
          },
          administrativeDivisionTreeSetting: {
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: this.getSelectAdministrative,
            } 
          },
          administrativeDivisionTree: [], //行政区划tree数据
        }
      },
      methods: {
        init () {  // 初始化数据；
          this.queryDept = true;
          this.getAdministrativeTree ();
        },
        // 点击选择打开模态框
        openAdministrative () {
            this.cancel(); //销毁
            this.init(); //初始化
        },
        // 获取行政划区ztree
        getAdministrativeTree () {
           this.$api.getStrictsToTree().then(data => {
               this.administrativeDivisionTree = data.data;
              $.fn.zTree.init($("#" + this.zTreeName), this.administrativeDivisionTreeSetting, this.administrativeDivisionTree);
              var treeObj = $.fn.zTree.getZTreeObj(this.zTreeName);
                var nodes = treeObj.getNodes(true);
                if (nodes.length>0) {
                    for(var i=0;i<nodes.length;i++){
                     if (nodes[i].children.length> 0) {
                       treeObj.expandNode(nodes[i].children[0], true, false, false); //默认展开一级菜单中的第一个节点
                     }
                    }
                }
                //  treeDemoObj.expandAll(true); //默认将所有的节点展开
           })
        },
        
        getSelectAdministrative (e, treeId, treeNode) {
          if (treeNode){
            this.administrative.disCode = treeNode.id;
          this.administrative.administrationName = treeNode.name;
          this.$emit('parentDept', this.administrative);
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
          this.administrative.disCode = '';
          this.administrative.administrationName = '';
          this.$emit('parentDept', this.administrative);
            
        },
        emitEvent(id,name){
          this.administrative.disCode = id;
          this.administrative.administrationName = name;
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
        color: #38404C;
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


