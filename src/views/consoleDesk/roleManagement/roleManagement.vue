// 角色管理模块
<template>
    <section class="roleManagement_container">
        <Card>
            <section class="head mb20">
                <Row>
                    <i-col span="16">
                        <div class="operation">
                            <i-button type="primary" @click="openAddRolemodal">添加角色</i-button>
                            <i-button type="primary" @click="judgeModifySelect">修改角色</i-button>
                            <i-button type="error" @click="roleDel">删除角色</i-button>
                        </div>
                    </i-col>
                    <i-col span="8">
                        <Input search enter-button="搜索" v-model="pageInfo.roleName" placeholder="请输入您要搜索的名称" @on-search='search'  @on-enter='search' />
                    </i-col>
                </Row>
            </section>
            <section class="roleList userList">
                <myTable :columns="columns" :data="roleList" v-on:getSelectColumn='getSelectColumns'></myTable>
                <div class="myPage_box">
                    <myPage :totalCount='totalCount' v-on:getPageIndexs='getPageIndex' v-on:getPageSizes='getPageSize'></myPage>
                </div>
            </section>
            <!-- 添加角色弹窗 @on-ok="roleAdd"-->
            <Modal class-name='modal-center' v-model="addRolemodal" @on-cancel="roleExit('addRole')" class="addRoleModal">
                <p slot="header">
                    <span class="addRole_span">添加角色</span>
                </p>
                <Form :model="roleFormItem" :label-width="90" ref="addRole" :rules="ruleValidate">
                    <Row>
                        <i-col span="12">
                            <FormItem label="角色编码" prop="roleCode">
                                <i-input v-model="roleFormItem.roleCode" placeholder="请输入角色名称"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem label="角色名称" prop="roleName">
                                <i-input v-model="roleFormItem.roleName" placeholder="请输入角色名称"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem label="角色描述" prop="roleDesc">
                                <i-input v-model="roleFormItem.roleDesc" placeholder="请输入角色描述"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem label="角色序号" prop="roleOrder">
                                <i-input v-model="roleFormItem.roleOrder" placeholder="角色序号" @on-blur='orderBlur'></i-input>
                                <span class="errHints" v-if='orderError'>{{this.errOrder}}</span>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem label="角色状态" prop="roleStatus">
                                <Select v-model="roleFormItem.roleStatus">
                                  <Option value='1'>启用</Option>
                                  <Option value='0'>不启用</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem label="角色类型" prop="roleType" class="typeItem">
                                <i-input v-model="roleFormItem.roleType" placeholder="请输入角色类型" @on-blur="eventBlur"></i-input>
                                <span class="errHints" v-if="typeError">{{this.errType}}</span>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="24">
                            <FormItem label="备注" prop="remark">
                                <i-input v-model="roleFormItem.remark" placeholder="请输入备注"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <FormItem label="父角色" prop="uproleId">
                        <div id="checkTree" style="">
                            <div class="tree-box" style="overflow: auto;">
                                <div class="zTreeDemoBackground left">
                                    <ul id="parentRoleTree" class="ztree"></ul>
                                </div>
                            </div>
                        </div>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button :loading='roleAddLoading' type="primary" @click="roleAdd('addRole')">提交</Button>
                    <Button type="default" @click="handleReset('addRole')" style="margin-left: 8px">重置</Button>
                </div>
            </Modal>
            <!-- 修改角色弹出框 -->
            <Modal class-name='modal-center' v-model="modifyRoleModal" title="修改角色" @on-cancel="roleExit('updateRole')" class="modifyRoleModal">
                <p slot="header">
                    <span class="modifyRole_span" style='color:rgba(252, 250, 250, 0.85)'>修改角色</span>
                </p>
                <Form :model="roleFormItem" :label-width="90" ref="updateRole" :rules="ruleValidate">
                    <Row>
                        <i-col span="12">
                            <FormItem label="角色代码" prop="roleCode">
                                <i-input v-model="roleFormItem.roleCode" placeholder="请输入角色名称"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem label="角色名称" prop="roleName">
                                <i-input v-model="roleFormItem.roleName" placeholder="请输入角色名称"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem label="角色描述" prop="roleDesc">
                                <i-input v-model="roleFormItem.roleDesc" placeholder="请输入角色描述"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem label="角色序号" prop="roleOrder">
                                <i-input v-model="roleFormItem.roleOrder" placeholder="请输入角色序号"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem label="角色状态" prop="roleStatus">
                                <Select v-model="roleFormItem.roleStatus">
                                  <Option value='1'>启用</Option>
                                  <Option value='0'>不启用</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem label="角色类型" prop="roleType">
                                <i-input v-model="roleFormItem.roleType" placeholder="请输入角色类型"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem label="备注" prop="remark">
                                <i-input v-model="roleFormItem.remark" placeholder="请输入角色备注"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <FormItem label="父角色" prop="uproleId">
                        <div id="checkTree" style="">
                            <div class="tree-box" style="overflow: auto;">
                                <div class="zTreeDemoBackground left">
                                    <ul id="updateParentRoleTree" class="ztree"></ul>
                                </div>
                            </div>
                        </div>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button :loading='roleModifyLoading' type="primary" @click="roleModify('updateRole')">提交</Button>
                    <Button type="default" @click="handleReset('updateRole')" style="margin-left: 8px">重置</Button>
                </div>
            </Modal>
            <!-- 删除确认弹框 -->
            <Modal class-name='modal-center' v-model="confirmDel" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除提示</span>
                </p>
                <div style="color:rgba(255,255,255,0.85);text-align:center">
                    <p>确定要删除已选中的角色</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long :loading="modal_loading" @click="del">确定删除</Button>
                </div>
            </Modal>
        </Card>
    </section>
</template>

<script>
    import '../../../../static/vendor/ztree/jquery-1.4.4.min';
    import "../../../../static/vendor/ztree/icomoon_styles.css";
    import "../../../../static/vendor/ztree/metroStyle.css";
    import "../../../../static/vendor/ztree/jquery.ztree.core.js";
    import "../../../../static/vendor/ztree/jquery.ztree.excheck.js";
    import myPage from '@/components/base/myPage.vue';
    import myTable from '@/components/base/myTable.vue';
    export default {
        data() {
            const validateUproleId = (rule, value, callback) => {
                if (this.selectzNode === "" || this.selectzNode.length == 0) {
                    callback(new Error("请选择父角色"));
                } else if (this.selectzNode == this.roleFormItem.roleId) {
                    callback(new Error("父角色不能选本身"));
                } else if (this.roleIdArr.indexOf(this.selectzNode[0]) != -1) {
                    callback(new Error("父角色不能选本身以及子角色"));
                } else {
                    callback();
                }
            };
            const roleCodeexist = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('角色编码不能为空'))
                }
                if (this.oldroleCode != value) {
                    this.$api.roleCodeexist({
                        roleCode: value
                    }).then(data => {
                        if (data.code == "error") {
                            callback(new Error("用户名已存在"));
                        } else {
                            callback();
                        }
                    });
                } else {
                    callback();
                }
            };
            return {
                roleIdArr:[],
                orderError: false, // 角色序号
                errOrder: '',
                typeError: false, // 角色类型
                errType: '',
                //初始化ztree的配置
                setting: {
                    check: {
                        enable: true,
                        nocheckInherit: false,
                        chkboxType: {
                            Y: "ps",
                            N: "ps"
                        }
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onCheck: this.addRoleTreeOnClick
                    }
                },
                powerSettingTreeSetting: {
                    check: {
                        enable: true,
                        nocheckInherit: false,
                        chkboxType: {
                            Y: "p",
                            N: "s"
                        }
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: this.findbtn,
                        onCheck: this.updatedPower
                    }
                },
                zNodes: [], //权限树中要显示的集合
                selectzNode: [], //权限树选择的集合
                rolesToTreee: [], //角色树要显示的集合
                selectRoleTree: [],
                btnIds: [],
                //获取checked选中的角色
                roleTableSelectItem: [],
                //添加角色属性
                roleFormItem: {
                    roleId: "", //角色id
                    roleName: "", //角色名称
                    roleDesc: "", //角色描述
                    roleStatus: "1", //角色状态
                    roleType: "", //角色类型
                    roleOrder: "", //角色序号
                    remark: "", //备注
                    uproleId: "", //父角色ID
                    roleCode: "" //角色编码
                },
                oldroleCode: "",
                ruleValidate: {
                    roleCode: [{
                        required: true,
                        // message: '角色编码不能为空',
                        validator: roleCodeexist,
                        trigger: "blur",
                    }],
                    roleName: [{
                            required: true,
                            message: "角色名不能为空",
                            trigger: "blur"
                        },
                        {
                            type: "string",
                            pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,50}$/,
                            message: "角色名格式不正确",
                            trigger: "blur" //blur
                        },
                    ],
                    roleDesc: [{
                        required: true,
                        message: "角色描述不能为空",
                        trigger: "blur"
                    }],
                    roleStatus: [{
                        required: true,
                        message: "请选择角色状态",
                        trigger: "blur"
                    }],
                    uproleId: [{
                        required: true,
                        validator: validateUproleId,
                        trigger: "blur"
                    }]
                },
                //分配权限
                allocationPermissions: {
                    roleId: "" //要分配的角色id
                },
                btnList: "",
                roleName: "",
                selectAuthority: "", //角色赋予的权限集合
                addRolemodal: false, //添加角色弹窗
                modifyRoleModal: false, //修改角色弹窗
                confirmDel: false, //删除确认框
                loading: false, //是否开启加载特效
                modal_loading: false, //删除确认模态框加载特效
                allocationPermissionsModal: false, //权限设置弹窗
                value: "", //搜索框中输入的值
                totalCount: 0,
                checkedId: "",
                pageInfo: {
                    pageNum: 1, //当前页码
                    pageSize: 10 //当前页显示条数
                },
                columns: [{
                        type: "selection",
                        align: "center",
                        width: 60,
                    },
                    {
                        align: "center",
                        title: "序号",
                        type: "index",
                        width: 100,
                    },
                    {
                        title: "角色名称",
                        key: "roleName",
                        tooltip: true,
                    },
                    {
                        title: "角色代码",
                        key: "roleId",
                        tooltip: true,
                    },
                    {
                        title: "父角色名称",
                        key: "parentName",
                        tooltip: true,
                    },
                    {
                        title: "角色状态",
                        key: "roleStatus",
                        // align: "center",
                        width:100,
                        render: (h, params) => {
                            return h("div", [
                                h("strong", params.row.roleStatus == 1 ? "启用" : "未启用")
                            ]);
                        }
                    },
                    {
                        title: "角色编码",
                        key: "roleCode",
                        tooltip: true,
                    },
                    {
                        title: "角色描述",
                        key: "roleDesc",
                        tooltip: true,
                    },
                    {
                        title: "操作",
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
                                                this.setting.callback.onCheck = this.updateRoleTreeOnClick;
                                                this.roleFormItem.roleId = params.row.roleId; //角色id
                                                this.roleFormItem.roleName = params.row.roleName; //角色名称
                                                this.roleFormItem.roleDesc = params.row.roleDesc; //角色描述
                                                this.roleFormItem.roleStatus = params.row.roleStatus + ""; //角色状态
                                                this.roleFormItem.roleType = params.row.roleType; //角色类型
                                                this.roleFormItem.roleOrder = params.row.roleOrder; //角色序号
                                                this.roleFormItem.remark = params.row.remark; //备注
                                                this.roleFormItem.uproleId = params.row.uproleId; //父角色ID
                                                this.roleFormItem.roleCode = params.row.roleCode;
                                                this.oldroleCode = params.row.roleCode;
                                                this.selectzNode = params.row.uproleId;
                                                this.$api.getRoleList().then(data => {
                                                    this.zNodes = data.data;
                                                    this.setting.check = {
                                                        enable: true,
                                                        chkStyle: "radio",
                                                        radioType: "all"
                                                    };
                                                    for (
                                                        let index = 0; index < this.zNodes.length; index++
                                                    ) {
                                                        if (
                                                            this.roleFormItem.uproleId == this.zNodes[index].id
                                                        ) {
                                                            this.zNodes[index].checked = true;
                                                        }
                                                    }
                                                    $.fn.zTree.init(
                                                        $("#updateParentRoleTree"),
                                                        this.setting,
                                                        this.zNodes
                                                    );
                                                });
                                                this.modifyRoleModal = true;
                                                 this.isRoleId();
                                            }
                                        }
                                    },
                                    "修改"
                                ),
                            ]);
                        }
                    }
                ],
                //表格中要显示的角色数据
                roleList: [],
                //权限列表
                authorityList: [],
                treeNodemdlid: "",
                roleAddLoading:false,
                roleModifyLoading:false,
            };
        },
        components: {
            myPage,
            myTable
        },
        mounted() {
            this.getRoleList();
        },
        methods: {
            //搜索
            search(e) {
                this.pageInfo.pageNum = 1;
                this.pageInfo.pageSize = 10;
                this.pageInfo.roleName = e;
                this.getRoleList();
            },
            /*判断角色序号是不是数字*/
            orderBlur() {
                let reg = /^[0-9]+.?[0-9]*$/;
                if (this.roleFormItem.roleOrder == '') {
                    this.errOrder = '请输入角色序号';
                    this.orderError = true;
                } else {
                    if (reg.test(this.roleFormItem.roleOrder)) {
                        this.orderError = false;
                    } else {
                        this.errOrder = '序号必须为数字';
                        this.typeOrder = true;
                    }
                }
            },
            /*判断角色类型是不是数字*/
            eventBlur() {
                let reg = /^[0-9]+.?[0-9]*$/;
                if (this.roleFormItem.roleType == '') {
                    this.errType = '请输入角色类型';
                    this.typeError = true;
                } else {
                    if (reg.test(this.roleFormItem.roleType)) {
                        this.typeError = false;
                    } else {
                        this.errType = '类型必须为数字';
                        this.typeError = true;
                    }
                }
            },
            checkTree() {
                var treeObj = $.fn.zTree.getZTreeObj("powerSettingTree");
                var node = treeObj.getNodeByParam("id", this.checkedId, null); //通过id获取节点
                treeObj.checkNode(node, true, false);
            },
            //查询菜单所属按钮
            findbtn(e, treeId, treeNode) {
                this.checkedId = treeNode.id; //点击按钮选中tree节点
                //菜单下的按钮
                this.$api.getBtnList({
                    mdlId: treeNode.id
                }).then(data => {
                    this.btnList = data.data;
                    this.treeNodemdlid = treeNode.id;
                });
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            addRoleTreeOnClick(e, treeId, treeNode) {
                this.selectzNode = [];
                let treeObj = $.fn.zTree.getZTreeObj("parentRoleTree"),
                    nodes = treeObj.getCheckedNodes(true),
                    v = "";
                for (let i = 0; i < nodes.length; i++) {
                    v += nodes[i].name + ",";
                    this.selectzNode[i] = nodes[i].id;
                }
            },
            updateRoleTreeOnClick(e, treeId, treeNode) {
                this.selectzNode = [];
                let treeObj = $.fn.zTree.getZTreeObj("updateParentRoleTree"),
                    nodes = treeObj.getCheckedNodes(true),
                    v = "";
                for (let i = 0; i < nodes.length; i++) {
                    v += nodes[i].name + ",";
                    this.selectzNode[i] = nodes[i].id;
                }
            },
            show(index) {
                this.$Modal.info({
                    title: "User Info",
                    content: `Name：${this.roleList[index].name}<br>Age：${
                      this.roleList[index].age
                    }<br>Address：${this.roleList[index].address}`
                });
            },
            getRoleList() {
                this.$api.getRoleList(this.pageInfo).then(data => {
                    this.roleList = data.data;
                    this.totalCount = data.page.totalCount;
                });
            },
            remove(index) {
                this.roleList.splice(index, 1);
            },
            //打开角色添加模态框
            openAddRolemodal() {
                this.selectzNode = [];
                this.addRolemodal = true;
                this.$api.getRoleList().then(data => {
                    this.rolesToTreee = data.data;
                    this.setting.check = {
                        enable: true,
                        chkStyle: "radio",
                        radioType: "all"
                    };
                    $.fn.zTree.init($("#parentRoleTree"), this.setting, this.rolesToTreee);
                });
            },
            //等待调用api 添加角色弹出框的提交按钮触发的事件
            roleAdd(name) {
                this.roleFormItem.uproleId = this.selectzNode;
                this.$refs[name].validate(valid => {
                    if (valid) {
                        this.roleAddLoading = true
                        this.$api.addRole(this.roleFormItem).then(data => {
                            this.$Message.info("角色添加成功");
                            this.getRoleList();
                            this.addRolemodal = false;
                            this.formClean();
                            this.roleAddLoading  = false
                        });
                    } else {
                        this.$Message.error("信息输入有误,请重新输入!");
                    }
                });
            },
            //角色修改
            roleModify(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        this.roleModifyLoading = true
                        this.roleFormItem.uproleId = this.selectzNode;
                        this.$api.updateRole(this.roleFormItem).then(data => {
                            this.$Message.info("角色修改成功");
                            this.getRoleList();
                            this.modifyRoleModal = false;
                            this.formClean();
                            this.roleModifyLoading = false
                        });
                    } else {
                        this.$Message.error("表单输入有问题!");
                    }
                });
            },
            //修改时判断选中的个数
            judgeModifySelect() {
                if (this.roleTableSelectItem.length == 0) {
                    this.$Message.info("修改请选择一个角色");
                } else if (this.roleTableSelectItem.length == 1) {
                    this.setting.callback.onCheck = this.updateRoleTreeOnClick;
                    this.roleFormItem.roleId = this.roleTableSelectItem[0].roleId; //角色id
                    this.roleFormItem.roleName = this.roleTableSelectItem[0].roleName; //角色名称
                    this.roleFormItem.roleDesc = this.roleTableSelectItem[0].roleDesc; //角色描述
                    this.roleFormItem.roleStatus = this.roleTableSelectItem[0].roleStatus + ""; //角色状态
                    this.roleFormItem.roleType = this.roleTableSelectItem[0].roleType; //角色类型
                    this.roleFormItem.roleOrder = this.roleTableSelectItem[0].roleOrder; //角色序号
                    this.roleFormItem.remark = this.roleTableSelectItem[0].remark; //备注
                    this.roleFormItem.uproleId = this.roleTableSelectItem[0].uproleId; //父角色ID
                    this.roleFormItem.roleCode = this.roleTableSelectItem[0].roleCode;
                    this.oldroleCode = this.roleTableSelectItem[0].roleCode;
                    this.selectzNode = this.roleTableSelectItem[0].uproleId;
                    this.$api.getRoleList().then(data => {
                        this.zNodes = data.data;
                        this.setting.check = {
                            enable: true,
                            chkStyle: "radio",
                            radioType: "all"
                        };
                        for (let index = 0; index < this.zNodes.length; index++) {
                            if (this.roleFormItem.uproleId == this.zNodes[index].id) {
                                this.zNodes[index].checked = true;
                            }
                        }
                        $.fn.zTree.init(
                            $("#updateParentRoleTree"),
                            this.setting,
                            this.zNodes
                        );
                    });
                    this.modifyRoleModal = true;
                     this.isRoleId();
                } else if (this.roleTableSelectItem.length > 1) {
                    this.$Message.info("修改只能择一个角色");
                }
            },
            //角色删除
            roleDel() {
                if (this.roleTableSelectItem.length == 0) {
                    this.$Message.info("请选择一个角色删除");
                    return;
                } else {
                    this.confirmDel = true;
                }
            },
            //确定删除选定角色
            del() {
                this.modal_loading = true;
                //要删除的角色编号
                let roleNo = [];
                for (let index = 0; index < this.roleTableSelectItem.length; index++) {
                    roleNo[index] = this.roleTableSelectItem[index].roleId;
                }
                this.$api.delRoleList({
                    roleId: roleNo
                }).then(data => {
                    this.modal_loading = false;
                    this.confirmDel = false;
                    let count = 0;
                    for (let index = 0; index < roleNo.length; index++) {
                        for (let index2 = 0; index2 < this.roleList.length; index2++) {
                            if (this.roleList[index2].roleId == roleNo[index]) {
                                this.remove(index2);
                                break;
                            }
                        }
                    }
                    this.$Message.success("删除成功！");
                });
            },
            roleExit(name) {
                this.$refs[name].resetFields();
                this.$Message.info("取消操作");
                this.formClean();
            },
            //表单数据清除
            formClean() {
                this.roleFormItem.roleName = "";
                this.roleFormItem.roleDesc = "";
                this.roleFormItem.roleStatus = 1 + "";
                this.roleFormItem.roleType = "";
                this.roleFormItem.roleOrder = "";
                this.roleFormItem.remark = "";
                this.roleFormItem.uproleId = "";
                this.btnIds = [];
                this.btnList = [];
            },
            //获取表格中所选中的行
            getSelectColumns(even) {
                this.roleTableSelectItem = even;
            },
            getPageIndex(index) {
                this.pageInfo.pageNum = index;
                this.getRoleList();
            },
            getPageSize(pageSize) {
                this.pageInfo.pageSize = pageSize;
                this.getRoleList();
            },
            /*  根据角色ID 来获得所有子角色的ID集合 */
            isRoleId() {
                this.$api.roleId({
                    roleId: this.roleFormItem.roleId
                }).then(res => {
                    this.roleIdArr = res.roleId;
                })
            }
        }
    };
</script>

<style scoped lang='scss'>
.addRole_span{
    color: rgba(255,255,255,0.85)
}
</style>

