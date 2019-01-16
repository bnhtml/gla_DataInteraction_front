// 组织结构
<template>
  <section class="organization_structure_container">
    <Card>
      <section class="mechanismList">
        <Row>
          <!-- 左侧组织结构预览 -->
          <i-col span="5" class="scroll">
            <h4 class="organization_structure_title">组织结构预览</h4>
            <div id="deptTree">
              <div class="tree-box">
                <div class="zTreeDemoBackground left">
                  <ul id="treeDemo" class="ztree"></ul>
                </div>
              </div>
            </div>
          </i-col>
          <!-- 右侧 -->
          <i-col span="19">
            <section class="head mb20">
              <Row>
                <i-col span="14">
                  <div class="operation">
                    <i-button type="primary" @click="openAdd">添加机构</i-button>
                    <i-button type="primary" @click="judgeModifySelect">修改机构</i-button>
                    <i-button type="error" @click="mechanismDel">删除机构</i-button>
                  </div>
                </i-col>
                <i-col span="10">
                  <Input search enter-button="搜索" placeholder="请输入部门名称" v-model="pageInfo.deptName" @on-search='query' />
                </i-col>
              </Row>
            </section>
            <myTable :columns="columns" :data="mechanismList" v-on:getSelectColumn='getSelectColumns'></myTable>
            <section class="myPage_box">
              <myPage :totalCount="totalCount" v-on:getPageIndexs='getPageIndex' v-on:getPageSizes='getPageSize'></myPage>
            </section>
          </i-col>
        </Row>
      </section>
      <!-- 添加机构弹出窗 -->
      <Modal v-model="addMechanismModal" @on-cancel="cancel('add')" width='680' height='450' class="addMechanismModal">
        <p slot="header" class="modal-header">
          <span class="add_span">{{modalTitle}}</span>
        </p>
        <Form :model="organizationStructure" ref="add" :label-width="100" :rules="ruleValidate">
          <Row>
            <i-col span="12">
              <FormItem label="部门名称:" prop="deptName">
                <Input v-model="organizationStructure.deptName" placeholder="请输入部门名称"/>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="部门简称:" prop="deptSname">
                <Input v-model="organizationStructure.deptSname" placeholder="请输入部门简称"/>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <FormItem label="部门描述:" prop="deptDesc">
                <Input v-model="organizationStructure.deptDesc" placeholder="请输入部门描述"/>
              </FormItem>
            </i-col>
            <i-col span="12">
              <FormItem label="部门排序:" prop="deptOrder">
                <Input v-model="organizationStructure.deptOrder" placeholder="请输入部门排序(必须是数字)"/>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <FormItem label="备注:" prop="deptRemark" class="remarkItem">
                <Input v-model="organizationStructure.deptRemark" placeholder="请输入部门备注"/>
              </FormItem>
            </i-col>
            <i-col span="12">
               <AffiliatedInstitutionsTree ref="chilSuperiorDept" v-on:parentDept='getSuperiorDeptData' zTreeName='superiorDepartmentTree' labelName="上级部门" propName="superiorDeptName"></AffiliatedInstitutionsTree>
            </i-col>
          </Row>
          <!-- <Row>
            <i-col span="12">
              <FormItem label="部门等级:" prop="deptLevel">
                <Select v-model="organizationStructure.deptLevel">
                        <Option value='1'>一级部门</Option>
                        <Option value='2'>二级部门</Option>
                      </Select>
              </FormItem>
            </i-col>
          </Row> -->
          <Row>
            <!-- <i-col span="12">
                  <administrativeDivisionTree ref="chilAdministrativeDivision" v-on:parentDept='getAdministrativeDivisionData' zTreeName='addJurisdictionDept' labelName="行政划区" propName="disName"></administrativeDivisionTree>
                </i-col> -->
            <!-- <i-col span="12">
                   <AffiliatedInstitutionsTree ref="chilSuperiorDept" v-on:parentDept='getSuperiorDeptData' zTreeName='superiorDepartmentTree' labelName="上级部门" propName="superiorDeptName"></AffiliatedInstitutionsTree>
                </i-col> -->
          </Row>
          <!-- </Row> -->
        </Form>
        <div slot="footer">
          <Button :loading='mechanismAddLoading' type="primary" @click="mechanismAdd('add')">提交</Button>
          <Button type="default" @click="handleReset('add')" style="margin-left: 8px">重置</Button>
        </div>
      </Modal>
      <!-- 删除机构确认弹框 -->
      <Modal v-model="confirmDel" width="360">
        <p slot="header" style="text-align:center" class="modal-header">
          <Icon type="information-circled"></Icon>
          <span>删除提示</span>
        </p>
        <div style="color:rgba(255,255,255,0.85);text-align:center">
          <p>确定要删除已选中的机构</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long :loading="modal_loading" @click="del">确定删除</Button>
        </div>
      </Modal>
      <!-- 查看机构下人员 -->
      <Modal v-model="seeMechanismPersonModal">
        <p slot="header" style="text-align:center" class="modal-header">
          <Icon type="information-circled"></Icon>
          <span>机构人员</span>
        </p>
        <div style="text-align:center">
          <myTable :columns="mechanismPersonColumns" :data="mechanismPersonList"></myTable>
        </div>
        <div slot="footer">
          <Button type="primary" size="large" long :loading="modal_loading" @click="close">关闭</Button>
        </div>
      </Modal>
      <!-- 分配角色 -->
      <Modal v-model="bindRoleModal" @on-ok="bindRole" @on-cancel="Exit" class="distributionRoleModal">
        <p>
          <span class="role_span">分配角色</span>
        </p>
        <Form :model="bindRoleItme" :label-width="80" style="margin: 25px 0;">
          <Select v-model="selectRoleList" multiple>
                  <Option v-for="item in roleList" :value="item.roleId" :key="item.value">{{ item.roleName }}</Option>
                </Select>
        </Form>
      </Modal>
    </Card>
  </section>
</template>

<script>
  import "../../../../static/vendor/ztree/icomoon_styles.css";
  import "../../../../static/vendor/ztree/metroStyle.css";
  import "../../../../static/vendor/ztree/jquery.ztree.core.js";
  import "../../../../static/vendor/ztree/jquery.ztree.excheck.js";
  import administrativeDivisionTree from '@/components/tree/administrativeDivision.vue';
  import AffiliatedInstitutionsTree from '@/components/tree/AffiliatedInstitutionsTree.vue';
  import myPage from '@/components/base/myPage.vue';
  import myTable from '@/components/base/myTable.vue';
  export default {
    data() {
      const validateDisCode = (rule, value, callback) => {
        if (
          this.organizationStructure.disName === ''
        ) {
          callback(new Error("请选择行政区域"));
        } else {
          callback();
        }
      };
      const validateSuperiorDeptId = (rule, value, callback) => {
        if (this.organizationStructure.superiorDeptName === '') {
          callback(new Error("请选择父部门"));
        } else if (this.deptIdArr.indexOf(this.organizationStructure.superiorDeptId)!=-1) {
          callback(new Error("上级部门不能为本身以及子部门"));
        } else {
          callback();
        }
      };
      // 验证部门等级
      const validateDeptLevel = (rule, value, callback) => {
        if (
          this.organizationStructure.deptLevel === ''
        ) {
          callback(new Error('请选择部门等级'));
        } else {
          callback();
        }
      }
      return {
        deptIdArr: [], // 判断时候为子角色
        isModal: 1, // 1、添加   2、修改
        leftSetting: {
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            onClick: this.zTreeQueryOnClick
          }
        },
        //添加组织属性
        organizationStructure: {
          disCode: "", //行政区划id
          // administrativeDisCodeArray: [],  //行政区划id集合
          disName: '', //行政划区名称
          superiorDeptId: "", //上级部门Id
          superiorDeptName: '', // 上级部门名称
          deptName: "", //部门名称
          deptSname: "", //部门简称
          deptDesc: "", //部门描述
          deptOrder: "", //部门排序
          deptLevel: "", //部门等级
          deptRemark: "" //备注
        },
        // 部门等级数据
        deptLevelData: [{
          value: '1',
          label: '一级部门'
        }, {
          value: '2',
          label: '二级部门'
        }],
        //设置部门的角色
        bindRoleItme: {
          deptId: ""
        },
        ruleValidate: {
          disName: [{
            required: true,
            validator: validateDisCode,
            trigger: "change"
          }],
          superiorDeptName: [{
            required: true,
            validator: validateSuperiorDeptId,
            trigger: "change"
          }],
          deptName: [{
              required: true,
              message: "请输入部门名称",
              trigger: "blur"
            },
            {
              type: "string",
              pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,50}$/,
              message: "部门名称只能为中文",
              trigger: "blur" //blur
            }
          ],
          deptSname: [{
            required: true,
            message: "请输入部门简称",
            trigger: "blur"
          }],
          deptDesc: [{
            required: true,
            message: "请输入描述",
            trigger: "blur"
          }],
          // deptLevel: [{
          //   required: true,
          //   message: "请选择部门等级",
          //   trigger: "blur"
          // }],
          deptRemark: [{
            type: "string",
            required: true,
            message: "请输入备注",
            trigger: "blur"
          }]
        },
        totalCount: 0,
        pageInfo: {
          pageNum: 1, //当前页码
          pageSize: 10 //当前页显示条数
        },
        roleList: [], //添加用户所要,选的角色
        selectRoleList: [], //添加用户所选的角色
        mechanismTableSelectItem: [], //表格中选中列集合
        administrativeDivisionTree: [], //行政区划tree
        selectAdministrativeDivisionTree: "", //选的行政区划
        superiorDepartment: [], //上级部门tree
        selectSuperiorDepartment: "", //选中的上级部门
        bindRoleModal: false, //给部门分配角色弹窗
        confirmDel: false, //删除确认弹出框
        modal_loading: false, //删除确认模态框加载特效
        modifyMechanismModal: false, //修改弹窗
        addMechanismModal: false, //添加弹窗
        seeMechanismPersonModal: false, //查看每个机构下的人员
        loading: false, //是否开启加载特效
        value: "", //搜索框中输入的值
        modalTitle: '',
        columns: [{
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            type: "index",
            width: 60,
            align: "center",
            title: "序号"
          },
          {
            title: "组织机构名称",
            key: "deptName",
           tooltip: true,
          },
          {
            title: "组织机构代码",
            key: "deptCode",
            align: "center",
            tooltip: true,
          },
          {
            title: "添加时间",
            align: "center",
            key: "createTime",
            render: (h, params) => {
              return h('span', {}, params.row.createTime !== '' ? this.$appBase.getTime(params.row.createTime) : '');
            }
          },
          {
            title: "机构人员",
            key: "action",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "a", {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      color: "#3399ff"
                    },
                    on: {
                      click: () => {
                        this.show(params.row.deptId);
                      }
                    }
                  },
                  "查看"
                ),
              ]);
            }
          }
        ],
        //表格中要显示的机构数据
        mechanismList: [],
        mechanismPersonColumns: [{
            type: "index",
            align: "center",
            title: "序号"
          },
          {
            title: "人员名称",
            key: "staffName"
          }
        ],
        //每个机构下的人员
        mechanismPersonList: [],
        //组织结构tree数据
        deptTree: [],
        mechanismAddLoading:false
      };
    },
    components: {
      administrativeDivisionTree, // 行政划区组件
      AffiliatedInstitutionsTree, // 上级部门组件
      myPage,
      myTable
    },
    mounted() {
      this.getmechanismList();
      this.getDeptTree();
    },
    methods: {
      //表单重置
      handleReset(name) {
        this.$refs[name].resetFields();
        this.cleanFrom();
      },
      //搜素等待调用接口-------------------------------------------------------
      zTreeQueryOnClick(e, treeId, treeNode) {
        this.pageInfo.pageNum = 1;
        this.pageInfo.deptId = treeNode.id;
        this.mechanismTableSelectItem = [];
        this.getmechanismList();
      },
      //搜素 //搜素等待调用接口----------------------------------------------------
      query() {
        this.pageInfo.pageNum = 1;
        this.getmechanismList();
      },
      //初始化添加模态框
      openAdd() {
        this.isModal = 1;
        this.cleanFrom();
        this.addMechanismModal = true;
        this.modalTitle = '添加机构';
      },
      //关闭查看机构下的模态框
      close() {
        this.seeMechanismPersonModal = false;
      },
      show(code) {
        //等待用部门编号查人员
        this.$api.getUserByMechanismId(code).then(data => {
          this.mechanismPersonList = data.data;
        });
        this.seeMechanismPersonModal = true;
      },
      removeMechanismPerson(index) {
        this.mechanismPersonList.splice(index, 1);
      },
      remove(index) {
        this.mechanismList.splice(index, 1);
      },
      //获取组织结构zTree
      getDeptTree() {
        this.$api.getMechanismIdTree().then(data => {
          this.deptTree = data.data;
          $.fn.zTree.init($("#treeDemo"), this.leftSetting, this.deptTree);
          var treeObj = $.fn.zTree.getZTreeObj('treeDemo');
          var nodes = treeObj.getNodes(true);
          if (nodes.length > 0) {
            for (var i = 0; i < nodes.length; i++) {
              if (nodes[i].children.length > 0) {
                treeObj.expandNode(nodes[i].children[0], true, false, false); //默认展开一级菜单中的第一个节点
              }
            }
          }
          //  treeDemoObj.expandAll(true); //默认将所有的节点展开
        });
      },
      //-----------------------------------获取子组件数据---------------------------------------//
      // 获取行政划区子组件数据
      // getAdministrativeDivisionData (administrative) {
      //   if(administrative) {
      //    this.organizationStructure.disCode = administrative.disCode;
      //    this.organizationStructure.disName = administrative.administrationName;  
      //   }
      // },
      // 获取上级部门子组件数据
      getSuperiorDeptData(superiorDept) {
        if (superiorDept) {
          this.organizationStructure.superiorDeptId = superiorDept.deptId;
          this.organizationStructure.superiorDeptName = superiorDept.deptName;
        }
      },
      // 初始化表格渲染数据
      getmechanismList() {
        this.$api.getmechanismList(this.pageInfo).then(data => {
          this.mechanismList = data.data;
          this.totalCount = data.page.totalCount;
        });
      },
      //给部门绑定角色
      bindRole() {},
      //添加机构
      mechanismAdd(name) {
        // this.organizationStructure.disCode = this.selectAdministrativeDivisionTree; //行政区划
        // this.organizationStructure.superiorDeptId = this.selectSuperiorDepartment; //上级部门名称
        this.$refs[name].validate(valid => {
          if (valid) {
            this.mechanismAddLoading = true;
            if (this.isModal == 1) { // 添加
              this.$api.addDept(this.organizationStructure).then(data => {
                this.$Message.success("添加成功");
                this.mechanismTableSelectItem.length = 0;
                this.addMechanismModal = false;
                this.getmechanismList();
                this.getDeptTree();
                this.cleanFrom();
                this.mechanismAddLoading = false
              });
            } else { // 修改
              this.$api.updateDept(this.organizationStructure).then(data => {
                this.$Message.success("修改成功");
                this.mechanismTableSelectItem = [];
                this.addMechanismModal = false;
                this.getmechanismList();
                this.getDeptTree();
                this.mechanismAddLoading = false
              });
            }
          } else {
            this.$Message.error("信息输入有误，请重新输入!");
          }
        });
      },
      //删除机构
      mechanismDel() {
        if (this.mechanismTableSelectItem.length == 0) {
          this.$Message.info("请选择一个机构删除");
          return;
        } else {
          this.confirmDel = true;
          
        }
      },
      //确定删除选定机构
      del() {
        this.modal_loading = true;
        //要删除的机构编号
        let mechanismId = [];
        for (
          let index = 0; index < this.mechanismTableSelectItem.length; index++
        ) {
          mechanismId[index] = this.mechanismTableSelectItem[index].deptId;
        }
        this.$api.delMechanism({
          deptIds: mechanismId
        }).then(data => {
          this.modal_loading = false;
          this.confirmDel = false;
          let count = 0;
          for (let index = 0; index < mechanismId.length; index++) {
            for (let index2 = 0; index2 < this.mechanismList.length; index2++) {
              if (this.mechanismList[index2].deptId == mechanismId[index]) {
                this.remove(index2);
                break;
              }
            }
          }
          this.$Message.success("删除成功！");
          this.mechanismTableSelectItem = [];
          this.getDeptTree();
        });
      },
      cancel(name) {
        this.$Message.info("取消操作");
        this.$refs[name].resetFields();
      },
      //弹窗框关闭调用清除方法
      Exit() {
        this.$Message.info("取消操作");
        this.cleanFrom();
        (this.selectAdministrativeDivisionTree = []),
        (this.selectSuperiorDepartment = []);
      },
      //清除添加form表单
      cleanFrom() {
        this.organizationStructure.disCode = "";
        this.organizationStructure.superiorDeptId = "";
        this.organizationStructure.deptName = "";
        this.organizationStructure.deptSname = "";
        this.organizationStructure.deptDesc = "";
        this.organizationStructure.deptOrder = "";
        this.organizationStructure.deptLevel = "";
        this.organizationStructure.deptRemark = "";
        this.clearChildEvent();
      },
      //清除组件数据
      clearChildEvent() {
        //调用子组件的方法，child是上边ref起的名字，emitEvent是子组件的方法
        this.$refs.chilSuperiorDept.emitEvent('', '');
      },
      //获取表格中所选中的行
      getSelectColumns(even) {
        this.mechanismTableSelectItem = even;
      },
      //修改时判断选中的个数,修改机构
      judgeModifySelect() {
        if (this.mechanismTableSelectItem.length == 0) {
          this.$Message.info("修改请选择一个机构");
        } else if (this.mechanismTableSelectItem.length == 1) {
          this.organizationStructure.disCode = this.mechanismTableSelectItem[0].disCode; //行政区划disCode
          this.organizationStructure.disName = this.mechanismTableSelectItem[0].disName; //行政区划名称
          this.selectAdministrativeDivisionTree = this.mechanismTableSelectItem[0].disCode;
          this.organizationStructure.superiorDeptId = this.mechanismTableSelectItem[0].superiorDeptId; //上级部门id
          this.organizationStructure.superiorDeptName = this.mechanismTableSelectItem[0].superiorDeptName; // 上级部门名称
          this.selectSuperiorDepartment = this.mechanismTableSelectItem[0].superiorDeptId;
          this.organizationStructure.deptName = this.mechanismTableSelectItem[0].deptName; //部门名称
          this.organizationStructure.deptSname = this.mechanismTableSelectItem[0].deptSname; //部门简称
          this.organizationStructure.deptDesc = this.mechanismTableSelectItem[0].deptDesc; //部门描述
          this.organizationStructure.deptOrder = this.mechanismTableSelectItem[0].deptOrder; //部门排序
          // this.organizationStructure.deptLevel = this.mechanismTableSelectItem[0].deptLevel + ""; //部门等级
          this.organizationStructure.deptRemark = this.mechanismTableSelectItem[0].deptRemark; //备注
          this.organizationStructure.deptId = this.mechanismTableSelectItem[0].deptId;
          this.$refs.chilSuperiorDept.emitEvent(this.organizationStructure.superiorDeptId, this.organizationStructure.superiorDeptName);
          this.addMechanismModal = true;
          this.isModal = 2;
          this.modalTitle = '修改机构';
          this.isDeptId();
        } else if (this.mechanismTableSelectItem.length > 1) {
          this.$Message.info("修改只能择一个机构");
        }
      },
      getPageIndex(index) {
        this.pageInfo.pageNum = index;
        this.getmechanismList();
      },
      getPageSize(pageSize) {
        this.pageInfo.pageSize = pageSize;
        this.getmechanismList();
      },
      /*判断   上级部门是否可选*/
      isDeptId() {
        this.$api.deptId({
          deptId: this.organizationStructure.deptId
        }).then(res => {
          this.deptIdArr = res.deptId;
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  
  .modal-header {
    color: rgba(255, 255, 255, 0.85);
    span {
      color: rgba(255, 255, 255, 0.85);
    }
  }
  .add_span {
    color: rgba(255, 255, 255, 0.85)!important;
  }
  .scroll{
    overflow:auto!important;
  }
 #deptTree{
   width: 400px;
  //  min-height:500px;
  padding-bottom:20px;
   overflow:auto!important;
 }

</style>
