// 菜单管理
<template>
    <div class="menuManagement">
        <Card>
            <Row>
                <i-col span="5">
                    <h4 class="">菜单管理预览</h4>
                    <div id="checkTree">
                        <div class="tree-box" style="overflow: auto;margin-right:10px">
                            <div class="zTreeDemoBackground left">
                                <ul id="treeDemo" class="ztree"></ul>
                            </div>
                        </div>
                    </div>
                </i-col>
                <!-- 右侧数据展示 -->
                <i-col span="19">
                    <Form ref="updateform" v-if="hidden" :model="menuFormItem" :rules="ruleItem" :label-width="90">
                        <Row>
                            <i-col span="12">
                                <FormItem label="菜单名称" prop="mdlname">
                                    <i-input v-model="menuFormItem.mdlname" placeholder="请输入菜单名称"></i-input>
                                </FormItem>
                            </i-col>
                            <i-col span="12">
                                <FormItem label="所属系统">
                                    <i-input v-model="menuFormItem.apptitle" readonly></i-input>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="12">
                                <FormItem label="链接">
                                    <i-input v-model="menuFormItem.mdlhref" placeholder="请输入菜单链接路径"></i-input>
                                </FormItem>
                            </i-col>
                            <i-col span="12">
                                <FormItem label="类型">
                                    <Select v-model="menuFormItem.ismenu">
                                                                        <Option value="1">内部菜单</Option>
                                                                        <Option value="2">外部菜单</Option>
                                                                        <Option value="0">按钮</Option>
                                                                    </Select>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="12">
                                <FormItem label="事件">
                                    <i-input v-model="menuFormItem.mdlaction" placeholder="请输入事件"></i-input>
                                </FormItem>
                            </i-col>
                            <i-col span="12">
                                <FormItem label="顺序号" prop="mdlorderindex">
                                    <i-input v-model="menuFormItem.mdlorderindex" placeholder="请选择菜单顺序"></i-input>
                                </FormItem>
                            </i-col>
                        </Row>
                        <Row>
                            <i-col span="12">
                                <FormItem label="弹出位置">
                                    <Select v-model="menuFormItem.mdltarget">
                                                                        <Option value="_self">本窗口</Option>
                                                                        <Option value="_blank">新窗口</Option>
                                                                    </Select>
                                </FormItem>
                            </i-col>
                            <i-col span="12">
                                <FormItem label="是否启用">
                                    <Select v-model="menuFormItem.mdlenable">
                                                                        <Option value="1">启用</Option>
                                                                        <Option value="0">不启用</Option>
                                                                    </Select>
                                </FormItem>
                            </i-col>
                        </Row>
                        <FormItem style="text-align:center">
                            <Button :loading='updateLoading' type="primary" @click="update('updateform')">修改</Button>
                        </FormItem>
                    </Form>
                    <section class="head mb20">
                        <div class="operation">
                            <Button type="primary" @click="addMenumodal = true" >添加下级节点</Button>
                            <Button type="error" @click="menuDel" >删除</Button>
                        </div>
                    </section>
                    <section class='userList mr20'>
                        <myTable :columns="columns" :data="menuList" v-on:getSelectColumn='getSelectColumns'></myTable>
                        <section class="myPage_box">
                            <myPage :totalCount="totalCount" v-on:getPageIndexs='getPageIndex' v-on:getPageSizes='getPageSize'></myPage>
                        </section>
                    </section>
                </i-col>
            </Row>
            <!-- 添加菜单弹窗 -->
            <Modal class-name='modal-center' :styles="{width:'40%'}" v-model="addMenumodal" @on-cancel="menuExit('addform')" title="添加菜单" class='addMenuModal'>
                <p slot="header">
                    <span class="addMenu_span">添加菜单</span>
                </p>
                <Form ref="addform" :model="menuFormItemadd" :rules="ruleItem" :label-width="90" class='form-radio'>
                    <FormItem label="所属系统" style="display:none">
                        <i-input v-model="menuFormItemadd.appMetaId" placeholder="请输入菜单名称"></i-input>
                    </FormItem>
                    <FormItem label="父菜单" style="display:none">
                        <i-input v-model="menuFormItemadd.mdlparent" placeholder="请输入菜单名称"></i-input>
                    </FormItem>
                    <Row>
                        <i-col span="12">
                            <FormItem label="菜单名称" prop="mdlname">
                                <i-input v-model="menuFormItemadd.mdlname" placeholder="请输入菜单名称"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem label="弹出位置">
                                <Select v-model="menuFormItemadd.mdltarget">
                                                        <Option value="_self">本窗口</Option>
                                                        <Option value="_blank">新窗口</Option>
                                                    </Select>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem label="链接">
                                <i-input v-model="menuFormItemadd.mdlhref" placeholder="请输入菜单链接路径"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem label="类型">
                                <Select v-model="menuFormItemadd.ismenu">
                                                        <Option value="1">内部菜单</Option>
                                                        <Option value="2">外部菜单</Option>
                                                        <Option value="0">按钮</Option>
                                                    </Select>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem label="事件">
                                <i-input v-model="menuFormItemadd.mdlaction" placeholder="请输入事件"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="12">
                            <FormItem label="顺序号" prop="mdlorderindex">
                                <i-input v-model="menuFormItemadd.mdlorderindex" placeholder="请选择菜单顺序"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="12">
                            <FormItem label="是否启用">
                                <Select v-model="menuFormItemadd.mdlenable">
                                                        <Option value="1">启用</Option>
                                                        <Option value="0">不启用</Option>
                                                    </Select>
                            </FormItem>
                        </i-col>
                    </Row>
                </Form>
                <div slot="footer">
                    <Button :loading='menuAddLoading' type="primary" @click="menuAdd('addform')">提交</Button>
                    <Button type="default" @click="handleReset('addform')" style="margin-left: 8px">重置</Button>
                </div>
            </Modal>
            <!-- 删除确认弹框 -->
            <Modal class-name='modal-center' v-model="confirmDel" width="30">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除提示</span>
                </p>
                <div style="text-align:center;color:rgba(255,255,255,0.85)">
                    <p>将删除所有子菜单及与角色关系,确定要删除已选中的菜单</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long :loading="modal_loading" @click="del">确定删除</Button>
                </div>
            </Modal>
        </Card>
    </div>
</template>

<script>
    // import $ from "jquery";
    import '../../../../static/vendor/ztree/jquery-1.4.4.min';
    import "../../../../static/vendor/ztree/icomoon_styles.css";
    import "../../../../static/vendor/ztree/metroStyle.css";
    import "../../../../static/vendor/ztree/jquery.ztree.core.js";
    import "../../../../static/vendor/ztree/jquery.ztree.excheck.js";
    import myPage from '@/components/base/myPage.vue';
    import myTable from '@/components/base/myTable.vue';
    export default {
        data() {
            return {
                setting1: {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: this.zTreeOnClick
                    }
                },
                //tree
                zNodes: [],
                //获取checked选中的菜单
                menuTableSelectItem: [],
                //添加菜单属性
                totalCount: 0,
                //是否隐藏
                hidden: false,
                menuFormItem: {
                    mdlId: "", //菜单ID
                    appMetaId: "", //系统
                    apptitle: "", //系统名称
                    mdlname: "", //菜单名称
                    mdlhref: "", //菜单路径
                    mdlorderindex: "", //顺序号
                    ismenu: "1", //类别
                    mdliconcss: "", //图标
                    mdlenable: "1",
                    mdlaction: "",
                    mdltarget: "_self", //弹出位置
                },
                menuFormItemadd: {
                    mdlId: "", //菜单ID
                    appMetaId: "", //系统
                    apptitle: "", //系统名称
                    mdlname: "", //菜单名称
                    mdlhref: "", //菜单路径
                    mdlparent: "", //父级菜单ID
                    mdlorderindex: "", //顺序号
                    ismenu: "1", //类别
                    mdliconcss: "", //图标
                    mdlenable: "1",
                    mdlaction: "",
                    mdltarget: "_self", //弹出位置
                },
                ruleItem: {
                    mdlname: [{
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur"
                    }],
                    mdlorderindex: [{
                        type: "number",
                        min: -100,
                        max: 100,
                        message: "请输入-100至100的数字",
                        trigger: "change",
                        transform(value) {
                            return Number(value);
                        }
                    }],
                },
                mdlname: "",
                addMenumodal: false, //添加菜单弹窗
                modifyMenuModal: false, //修改菜单弹窗
                confirmDel: false, //删除确认框
                loading: false, //是否开启加载特效
                modal_loading: false, //删除确认模态框加载特效
                confirmForceDel: false, //强制删除确认弹窗
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    mdlparent: "",
                    appMetaId: "",
                },
                columns: [{
                        type: "selection",
                        width: 60,
                        align: "center"
                    },
                    {
                        type: "index",
                        align: "center",
                        title: "序号",
                        width:100,
                    },
                    {
                        title: "菜单名称",
                        key: "mdlname",
                    },
                    {
                        title: "菜单路径",
                        key: "mdlhref",
                        tooltip: true,
                    },
                    {
                        title: "顺序号",
                        key: "mdlorderindex",
                    },
                    {
                        title: "添加时间",
                        key: "addtime",
                        align: 'center',
                        render: (h, params) => {
                            return h('span', {}, params.row.addtime !== '' ? this.$appBase.getTime(params.row.addtime) : '');
                        }
                    },
                    {
                        title: "添加人",
                        key: "addpeople",
                        tooltip: true,
                    },
                ],
                menuList: [],
                cityList: [],
                menuAddLoading:false,
                updateLoading:false,
            };
        },
        components: {
            myPage,
            myTable
        },
        mounted() {
            $.fn.zTree.init($("#treeDemo"), this.setting1, this.zNodes);
            this.getAppList();
            this.getMenuListAll();
        },
        methods: {
            getPPT() {
                var cmd = new ActiveXObject('WScript.Shell');
                cmd.Run('winword F://a.doc');
            },
            //获取所有系统
            getAppList() {
                this.$api.getAppList().then(data => {
                    this.cityList = data.data;
                    this.menuFormItemadd.appMetaId = data.data[0].value;
                    this.pageInfo.mdlparent = "1";
                    this.pageInfo.appMetaId = data.data[0].value;
                    this.menuFormItemadd.mdlparent = "1";
                    this.getMenuList();
                });
            },
            //表单重置
            handleReset(name) {
                this.$refs[name].resetFields();
                this.formClean();
            },
            zTreeOnClick(e, treeId, treeNode) {
                this.pageInfo.appMetaId = treeNode.appMetaId;
                this.pageInfo.pageNum = 1;
                this.menuFormItem.mdlId = treeNode.id;
                this.menuFormItem.mdliconcss = treeNode.mdliconcss;
                this.menuFormItem.mdlname = treeNode.mdlname;
                this.menuFormItem.mdlhref = treeNode.mdlhref;
                this.menuFormItem.mdlorderindex = treeNode.mdlorderindex;
                this.menuFormItem.apptitle = treeNode.apptitle;
                this.menuFormItem.mdlaction = treeNode.mdlaction;
                this.menuFormItem.mdlenable = treeNode.mdlenable + "";
                this.menuFormItem.ismenu = treeNode.ismenu + "";
                this.menuFormItem.mdltarget = treeNode.mdltarget;
                this.menuFormItemadd.appMetaId = treeNode.appMetaId;
                this.menuFormItemadd.apptitle = treeNode.apptitle;
                if (treeNode.level == 0) {
                    this.menuFormItemadd.mdlparent = "1";
                    this.pageInfo.mdlparent = "1";
                } else {
                    this.menuFormItemadd.mdlparent = treeNode.id;
                    this.pageInfo.mdlparent = treeNode.id;
                }
                if (this.menuFormItem.ismenu == -1) {
                    this.hidden = false;
                } else {
                    this.hidden = true;
                }
                this.getMenuList();
            },
            //获得菜单列表
            getMenuList() {
                this.$api.getMenuList(this.pageInfo).then(data => {
                    this.menuList = data.data;
                    this.totalCount = data.page.totalCount;
                });
            },
            //获取菜单树
            getMenuListAll() {
                this.$api.getMenuListAll().then(data => {
                    this.zNodes = data.data;
                    $.fn.zTree.init($("#treeDemo"), this.setting1, this.zNodes);
                });
            },
            //添加新菜单
            menuAdd(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        this.menuAddLoading = true
                        this.$api.addMenu(this.menuFormItemadd).then(data => {
                            this.$Message.info("菜单添加成功");
                            this.addMenumodal = false;
                            this.getMenuList();
                            this.getMenuListAll();
                            this.formClean();
                            this.menuAddLoading= false;
                        });
                    }
                });
            },
            //菜单修改
            update(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        this.updateLoading = true
                        this.$api.updateMenu(this.menuFormItem).then(data => {
                            this.getMenuList();
                            this.getMenuListAll();
                            this.$Message.info("菜单修改成功");
                            this.formClean();
                            this.updateLoading = false
                        });
                    }
                });
            },
            //菜单删除
            menuDel() {
                if (this.menuTableSelectItem.length == 0) {
                    this.$Message.info("请选择一个菜单删除");
                    return;
                } else {
                    this.confirmDel = true;
                }
            },
            //确定删除选定菜单
            del() {
                this.modal_loading = true;
                //要删除的菜单编号
                let mdlIds = [];
                for (let index = 0; index < this.menuTableSelectItem.length; index++) {
                    mdlIds[index] = this.menuTableSelectItem[index].mdlId;
                }
                this.$api.delMenu({
                    mdlIds: mdlIds
                }).then(data => {
                    this.modal_loading = false;
                    this.confirmForceDel = false;
                    this.confirmDel = false;
                    this.modal_loading = false;
                    this.getMenuListAll();
                    this.getMenuList();
                    this.$Message.success("删除成功！");
                });
                // window.location.reload()
            },
            menuExit(name) {
                this.$Message.info("取消操作");
                this.$refs[name].resetFields();
                this.formClean();
            },
            //表单数据清除
            formClean() {
                this.menuFormItemadd.mdliconcss = "";
                this.menuFormItemadd.mdlname = "";
                this.menuFormItemadd.mdlhref = "";
                this.menuFormItemadd.mdlorderindex = "";
                this.menuFormItemadd.mdlaction = "";
            },
            //获取表格中所选中的行
            getSelectColumns(even) {
                this.menuTableSelectItem = even;
            },
            getPageIndex(index) {
                this.pageInfo.pageNum = index;
                this.getMenuList();
            },
            getPageSize(pageSize) {
                this.pageInfo.pageSize = pageSize;
                this.getMenuList();
            }
        }
    };
</script>

<style lang="" scoped>
    .ivu-col-span-19 {
        /* border-top: solid 1px #ccc; */
        /* border-left: solid 1px #ccc; */
        padding: 20px;
    }
    .addMenu_span{
        color:rgba(255,255,255,0.85);
    }
</style>