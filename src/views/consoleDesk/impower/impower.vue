
<template>
    <section class="impower-head">
        <Card>
            <Row>
                <i-col span="10">
                    <div class="operation" v-if='zNodes'>
                        <div id="checkTree" style="">
                            <div class="tree-box" style="overflow: auto;">
                                <div class="zTreeDemoBackground left">
                                    <ul id="RoleTree" class="ztree"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else style='font-size:14px;' class="tip">
                        <Icon type="information-circled"></Icon>
                        暂无角色
                    </div>
                </i-col>
                <i-col span="2">
                    <i-button @click="updated" type="primary">授权</i-button>
                </i-col>
                <i-col span="12">
                    <div id="checkTree">
                        <div class="tree-box" style="overflow: auto;">
                            <div class="zTreeDemoBackground left">
                                <ul id="powerSettingTree" class="ztree"></ul>
                            </div>
                        </div>
                    </div>
                </i-col>
            </Row>
        </Card>
    </section>
</template>

<script>
    // import $ from 'jquery';
    import '../../../../static/vendor/ztree/jquery-1.4.4.min';
    import "../../../../static/vendor/ztree/icomoon_styles.css";
    import "../../../../static/vendor/ztree/metroStyle.css";
    import "../../../../static/vendor/ztree/jquery.ztree.core.js";
    import "../../../../static/vendor/ztree/jquery.ztree.excheck.js";
    export default {
        data() {
            return {
                //初始化ztree的配置
                setting: {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: this.getSelectzNode
                    }
                },
                powerSettingTreeSetting: {
                    check: {
                        enable: true,
                        nocheckInherit: false,
                        chkboxType: {
                            "Y": "ps",
                            "N": "s"
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
                //分配权限
                allocationPermissions: {
                    roleId: "", //要分配的角色id
                    permissionArray: ""
                },
            }
        },
        mounted() {
            this.getRoleTree();
            this.getMenuTree();
        },
        methods: {
            //获取角色树
            getRoleTree() {
                this.$api.getRoleList().then(data => {
                    this.rolesToTreee = data.data;
                    $.fn.zTree.init($("#RoleTree"), this.setting, this.rolesToTreee);
                });
            },
            //获取菜单树
            getMenuTree() {
                this.$api.getMenuListAlls().then(data => {
                    this.zNodes = data.data;
                    $.fn.zTree.init($("#powerSettingTree"), this.powerSettingTreeSetting, this.zNodes);
                });
            },
            getSelectzNode(e, treeId, treeNode) {
                this.allocationPermissions.roleId = treeNode.id;
                var treeObj = $.fn.zTree.getZTreeObj("powerSettingTree");
                treeObj.checkAllNodes(false);
                this.$api.getBindRole(treeNode.id).then(data => {
                    for (let index = 0; index < data.data.length; index++) {
                        var node = treeObj.getNodeByParam("id", data.data[index].mdlId, null);
                        treeObj.checkNode(node, true, false);
                    }
                });
            },
            updatedPower(e, treeId, treeNode) {
                this.selectzNode = [];
                let treeObj = $.fn.zTree.getZTreeObj("powerSettingTree"),
                    nodes = treeObj.getCheckedNodes(true),
                    v = "";
                for (let i = 0; i < nodes.length; i++) {
                    v += nodes[i].name + ",";
                    this.selectzNode[i] = nodes[i].id;
                }
            },
            updated() {
                this.allocationPermissions.permissionArray = this.selectzNode;
                this.$api.bindPermissionForRole(this.allocationPermissions).then(data => {
                    this.$Message.info("授权成功");
                });
            }
        },
    };
</script>

<style lang="" scoped>
    .ivu-btn-primary {
        position: relative;
        top: 4px;
    }
    .tip {
        line-height: 50px;
        text-align: center;
    }
</style>