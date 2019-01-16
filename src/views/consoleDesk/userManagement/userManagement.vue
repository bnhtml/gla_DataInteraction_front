// 用户管理
<template>
	<section class="userManagement_container">
		<Card>
			<section class="head mb20">
				<Row>
					<i-col span="16">
						<div class="operation">
							<i-button type="primary" @click="openAddUserModal('addUser')">添加用户</i-button>
							<!-- <i-button type="primary" @click="judgeModifySelect('formValidate')">
								<Icon class="icon" type="edit"></Icon>&nbsp;修改用户</i-button> -->
							<i-button type="error" @click="userDel">删除用户</i-button>
						</div>
					</i-col>
					<i-col span="8">
						<!-- <Row> -->
						<div class="search">
							<i-input search  :value="pageInfo.staffName" placeholder="请输入要搜索的姓名" @on-search="search" @on-enter="search" enter-button="搜索"></i-input>
							<!-- <i-button type="primary" @click="openDept">选择部门</i-button> -->
							<!-- <i-input search v-model="pageInfo.staffName" clearable placeholder="请输入要搜索的姓名"  enter-button="搜索"></i-input> -->
							<!-- <i-button type="primary" @click="search" class='btn-search'>搜索</i-button> -->
						</div>
						<!-- </Row> -->
					</i-col>
				</Row>
			</section>
			<section class="userList">
				<myTable :columns='columns' :data="userList" v-on:getSelectColumn='getSelectColumns'></myTable>
				<div class="myPage_box">
					<myPage :totalCount="totalCount" v-on:getPageIndexs='getPageIndex' v-on:getPageSizes='getPageSize'></myPage>
				</div>
			</section>
			<!-- 添加用户弹出窗 -->
			<Modal width="600" v-model="addUserModal" @on-cancel="usesrExit('addUser')" class="addUserModal">
				<p slot="header">
					<span class="add_span">{{modalTitle}}</span>
				</p>
				<Form :model="userformItem" :label-width="80" ref="addUser" :rules="ruleValidate">
					<Row>
						<i-col span="12">
							<FormItem label="用户名" prop="staffUsername">
								<Input v-model="userformItem.staffUsername" placeholder="请输入用户名"/>
							</FormItem>
						</i-col>
						<i-col span="12">
							<FormItem label="姓名" prop="staffName">
								<Input v-model="userformItem.staffName" placeholder="请输入姓名"/>
							</FormItem>
						</i-col>
					</Row>
					<Row>
						<i-col span="12">
							<FormItem label="手机" prop="staffPhone">
								<Input v-model="userformItem.staffPhone" placeholder="请输入手机号"/>
							</FormItem>
						</i-col>
						<i-col span="12">
							<FormItem label="电话">
								<Input v-model="userformItem.staffCellphone" placeholder="请输入电话"/>
							</FormItem>
						</i-col>
					</Row>
					<Row>
						<i-col span="12">
							<FormItem label="邮箱" prop="staffEmail">
								<Input v-model="userformItem.staffEmail" placeholder="请输入邮箱"/>
							</FormItem>
						</i-col>
						<i-col span="12">
							<FormItem label="序号">
								<Input v-model="userformItem.orders" placeholder="请输入序号"/>
							</FormItem>
						</i-col>
					</Row>
					<Row>
						<i-col span="12">
							<mechanismTree ref="chilDept" v-on:parentDept='getDeptData' zTreeName='treeDemo' labelName="所属机构" propName="deptName"></mechanismTree>
						</i-col>
						<i-col span="12">
							<FormItem label="性别" prop="gender">
								<RadioGroup v-model="userformItem.gender">
									<Radio label="1">男</Radio>
									<Radio label="2">女</Radio>
								</RadioGroup>
							</FormItem>
						</i-col>
					</Row>
					<!-- {{userformItem}} --><!-- v-if='$store.state.userInfo.clientId == userformItem' -->
					<Row >
						<i-col span="24">
							<jurisdictionTree ref="chilJurisdiction" v-on:parentDept='getJurisdictionData' zTreeName='addJurisdictionDept' labelName="管辖范围"></jurisdictionTree>
						</i-col>
					</Row>
					<FormItem label="角色设置" prop="roleArray" class="roleItem">
						<Select v-model="selectRoleList" multiple>
							<Option v-for="item in roleList" :value="item.roleId" :key="item.value">{{ item.roleName }}</Option>
						</Select>
					</FormItem>
				</Form>
				<div slot="footer">
					<Button :loading='userAddLoading' type="primary" @click="userAdd('addUser')">提交</Button>
					<Button type="default" @click="handleReset ('addUser')" style="margin-left: 8px">重置</Button>
				</div>
			</Modal>
			<!-- 删除确认弹框 -->
			<Modal v-model="operationDel" width="360">
				<p slot="header" style="color:#f60;text-align:center">
					<Icon type="information-circled"></Icon>
					<span >删除提示</span>
				</p>
				<div style="text-align:center;color:rgba(255,255,255,0.85)">
					<p>确定要删除已选中的用户</p>
				</div>
				<div slot="footer">
					<Button type="error" size="large" long :loading="modal_loading" @click="delOk">确定删除</Button>
				</div>
			</Modal>
			<!-- 表格操作中的删除弹框 -->
			<Modal v-model="confirmDel" width="360">
				<p slot="header" style="color:#f60;text-align:center">
					<Icon type="information-circled"></Icon>
					<span >删除提示</span>
				</p>
				<div style="text-align:center;color:rgba(255,255,255,0.85)">
					<p>确定要删除该用户</p>
				</div>
				<div slot="footer">
					<Button type="error" size="large" long :loading="modal_loading" @click="del">确定删除</Button>
				</div>
			</Modal>
			<!-- 选择部门弹出框-->
			<Modal v-model="queryDept" class="choiceModal">
				<p slot="header">
					<span class="choice_span">选择部门</span>
				</p>
				<div id="checkTree" style="height: 9rem; overflow: auto;">
					<div class="tree-box">
						<div class="zTreeDemoBackground left">
							<ul id="deptTree" class="ztree"></ul>
						</div>
					</div>
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
	import mechanismTree from '../../../components/tree/AffiliatedInstitutionsTree.vue';
	import jurisdictionTree from '../../../components/tree/jurisdictionTree'
	export default {
		data() {
			const validateRoleArray = (rule, value, callback) => {
				if (this.selectRoleList === "" || this.selectRoleList.length == 0) {
					callback(new Error("请选择角色"));
				} else {
					callback();
				}
			};
			const validateDeptArray = (rule, value, callback) => {
				if (this.userformItem.deptName === "") {
					callback(new Error("请选择所属机构"));
				} else {
					callback();
				}
			};
			const Nameexist = (rule, value, callback) => {
				if (this.oldstaffName != value) {
					this.$api.NameExist({
						staffName: value
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
				isModal: 1, // 1、添加   2、修改
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
				//部门tree集合
				zNodes: [],
				oldstaffName: "asdf asdf", //修改时旧的名称
				selectzNode: [],
				//选择部门ztree
				zDeptNodes: [],
				selectDeptNodes: [],
				//添加用户属性
				userformItem: {
					staffUsername: "", //用户名
					staffName: "", //姓名
					staffPhone: "", //手机
					staffEmail: "", //邮箱
					gender: "1", //性别
					staffCellphone: "",
					orders: "",
					roleArray: [],
					deptName: '', // 所属机构名称
					deptArray: [], // 所属机构id集合
					staffType: 0,
					jurisdictionDeptIdArray: [], //用户管辖范围
					jurisdictionDeptNames: '', // 用户管辖范围名称
				},
				ruleValidate: {
					staffUsername: [{
							required: true,
							message: "用户名不能为空",
							trigger: "blur"
						},
						{
							////用户名正则，4到16位（字母，数字，下划线）
							type: "string",
							pattern: /^[a-zA-Z0-9_]{4,16}$/,
							message: "格式有误,长度(4-16),字母数字下划线",
							trigger: "blur" //blur
						},
						{
							required: true,
							validator: Nameexist,
							trigger: "blur"
						}
					],
					staffName: [{
							required: true,
							message: "姓名不能为空",
							trigger: "change"
						},
						{
							type: "string",
							pattern: /^[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z·s]{2,50}$/,
							message: "姓名格式不正确",
							trigger: "change" //blur
						}
					],
					staffPhone: [{
							required: true,
							message: "手机号不能为空",
							trigger: "change"
						},
						{
							type: "string",
							pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
							message: "手机号格式不正确",
							trigger: "change" //blur
						}
					],
					staffEmail: [{
							required: true,
							message: "邮箱不能为空",
							trigger: "change"
						},
						{
							type: "email",
							message: "邮箱格式不正确",
							trigger: "change"
						}
					],
					gender: [{
						required: true,
						message: "请选择性别",
						trigger: "change"
					}],
					roleArray: [{
						required: true,
						validator: validateRoleArray,
						trigger: "change"
					}],
					deptName: [{
						required: true,
						validator: validateDeptArray,
						trigger: "change"
					}]
				},
				totalCount: 0,
				pageInfo: {
					pageNum: 1, //当前页码
					pageSize: 10, //当前页显示条数
					deptName: "", // 所属部门
					deptId: '',
					staffName: "",
					staffType: 0,
					staffId:this.$store.state.userInfo.clientId
				},
				roleList: [], //添加用户所要,选的角色设置
				selectRoleList: [], //添加用户所选的角色
				//表格中选中列集合
				userTableSelectItem: [],
				confirmDel: false, //删除确认弹出框
				operationDel: false, // 操作中的删除
				modal_loading: false, //删除确认模态框加载特效
				modifyUserModal: false, //修改用户弹窗
				addUserModal: false, //添加用户弹窗
				queryDept: false, //选择按部门查询弹窗
				loading: false, //是否开启加载特效
				value: "", //搜索框中输入的值
				modalTitle: '', // 模态框标题
				columns: [{
						type: "selection",
						align: "center",
						width: 50
					},
					{
						type: "index",
						align: "center",
						title: "序号",
						width: 100
					},
					{
						title: '用户名称',
						// align: "center",
						key: 'staffName',
						tooltip: true,
					},
					{
						title: "帐号",
						// align: "center",
						key: "staffUsername",
						tooltip: true,
					},
					{
						title: "性别",
						align: "center",
						key: "gender",
						render: (h, params) => {
							return h("div", [
								h("span", params.row.gender == 1 ? "男" : "女")
							]);
						}
					},
					{
						title: "手机",
						align: "center",
						key: "staffPhone",
						tooltip: true,
					},
					{
						title: "电话号码",
						align: "center",
						key: "staffCellphone",
						tooltip: true,
					},
					{
						title: "所属部门",
						key: "deptName",
						tooltip: true,
					},
					{
						title: "排序",
						align: "center",
						key: "orders",
					},
					{
						title: "操作",
						key: "action",
						width: 120,
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
											marginRight: "10px",
											color: "#2d8cf0"
										},
										on: {
											click: () => {
												this.isModal = 2;
												this.selectRoleList = [];
												this.selectzNode = [];
												this.userformItem.deptArray = [];
												this.userformItem.staffId = params.row.staffId;
												this.selectzNode[0] = params.row.deptId;
												// this.$refs["addUser"].resetFields();
												let a = [];
												this.$api.getUserRole(params.row.staffId).then(data => {
													for (let index = 0; index < data.data.length; index++) {
														a[index] = data.data[index].roleId;
													}
													this.selectRoleList = a;
												});
												//回显管辖范围
												this.$api.getJurisdictionList({
													staffId: params.row.staffId
												}).then(data => {
													let ids = [],
														names = '';
													if (data.data) {
														data.data.forEach((item, idx) => {
															ids.push(item.deptId);
															names += item.deptName + ',';
														})
													}
													if (names.length > 0) names = names.substring(0, names.length - 1);
													this.userformItem.jurisdictionDeptIdArray = ids;
													this.userformItem.jurisdictionDeptNames = names;
													this.$refs.chilJurisdiction.emitEvent(this.userformItem.jurisdictionDeptIdArray, this.userformItem.jurisdictionDeptNames);
												});
												this.addUserModal = true;
												this.modalTitle = '修改用户';
												this.userformItem.gender = params.row.gender + "";
												this.userformItem.staffName = params.row.staffName; // 角色设置
												this.userformItem.deptId = params.row.deptId;
												this.userformItem.deptName = params.row.deptName; // 所属机构
												this.oldstaffName = params.row.staffUsername;
												this.userformItem.staffUsername = params.row.staffUsername; //用户名
												this.userformItem.staffPhone = params.row.staffPhone; // 手机
												this.userformItem.staffEmail = params.row.staffEmail;
												this.userformItem.staffCellphone = params.row.staffCellphone // 办公电话
												this.userformItem.orders = params.row.orders; // 序号
												this.$refs.chilDept.emitEvent(this.userformItem.deptId, this.userformItem.deptName);
												this.userTableSelectItem.length = 0;
											}
										}
									},
									"修改"
								),
								h(
									"a", {
										props: {
											type: "error",
											size: "small"
										},
										style: {
											color: '#F85B5B'
										},
										on: {
											click: () => {
												this.userTableSelectItem[0] = params.row.staffId; //params.row.staffId
												this.sosureDel();
											}
										}
									},
									"删除"
								)
							]);
						}
					}
				],
				//表格中要显示的用户数据
				userList: [],
				userAddLoading:false
			};
		},
		components: {
			mechanismTree, // 注册所属机构
			jurisdictionTree, // 注册管辖范围
			myPage,
			myTable
		},
		mounted() {
			this.getUserList();
			// 调用角色设置接口
			this.getRoleList();

		},
		methods: {
			//搜索
			search(e) {
				this.pageInfo.pageNum = 1;
				this.pageInfo.pageSize = 10;
				this.pageInfo.staffName = e;
				this.getUserList();
			},
			/*清空搜索里部门*/
			// clearDeptName() {
			// 	this.pageInfo.deptName = '';
			// 	this.pageInfo.deptId = "";
			// },
			// 重置
			handleReset(name) {
				this.$refs[name].resetFields();
				this.cleanUserFrom();
			},
			//------------------组件回显值设置---start---------------
			getDeptData(dept) {
				if (dept) {
					this.userformItem.deptId = dept.deptId;
					this.userformItem.deptName = dept.deptName;
				}
			},
			getJurisdictionData(dept) {
				if (dept) {
					this.userformItem.jurisdictionDeptNames = dept.jurisdictionNames,
						this.userformItem.jurisdictionDeptIdArray = dept.jurisdictionIds;
					this.$refs.chilJurisdiction.emitEvent(dept.jurisdictionIds, dept.jurisdictionNames);
				}
			},
			// 获取部门选择的部门名称
			getSelectDept(e, treeId, treeNode) {
				this.pageInfo.deptName = treeNode.name;
				this.pageInfo.deptId = treeNode.id;
				this.queryDept = false;
			},
			show(index) {
				this.$Modal.info({
					title: "User Info",
					content: `Name：${this.userList[index].name}<br>Age：${
					          this.userList[index].id
					        }<br>Address：${this.userList[index].address}`
				});
			},
			remove(index) {
				this.userList.splice(index, 1);
			},
			getUserList() {
				this.$api.getUserList(this.pageInfo).then(data => {
					this.userList = data.data;
					this.totalCount = data.page.totalCount;
				});
			},
			/*点击添加用户按钮，弹出添加模态框*/
			openAddUserModal(name) {
				this.isModal = 1;
				this.cleanUserFrom(); //初始化数据
				this.addUserModal = true;
				this.modalTitle = '添加用户';
			},
			// 获取角色设置接口
			getRoleList() {
				this.$api.getRoleList({}).then(data => {
					this.roleList = data.data;
				});
			},
			openDept() {
				this.queryDept = true;
				this.getDeptTree();
			},
			//获取部门zTree
			getDeptTree() {
				this.$api.getMechanismIdTree().then(data => {
					this.zDeptNodes = data.data;
					var deptDomeObj = $.fn.zTree.init($("#deptTree"), this.deptSetting, this.zDeptNodes);
					deptDomeObj.expandAll(true); //默认将所有的节点展开
				});
			},
			//添加用户
			userAdd(name) {
				
				this.$refs[name].validate(valid => {
					if (valid) {
						this.userformItem.roleArray = this.selectRoleList;
						this.userformItem.deptArray.push(this.userformItem.deptId);
						if (!this.userformItem.jurisdictionDeptNames) {
							this.$Message.config('管辖范围不能为空')
						} else {
							this.userAddLoading = true;
							if (this.isModal == 1) { // 添加
								this.$api.addUser(this.userformItem).then(data => {
									this.$Message.success("添加成功");
									this.userformItem.deptArray = [];
									this.$refs[name].resetFields();
									this.getUserList();
									this.cleanUserFrom();
									this.addUserModal = false;
									this.userAddLoading = false;
								})
							} else { // 修改
								this.$api.updateUser(this.userformItem).then(data => {
									this.$Message.success("修改成功");
									this.addUserModal = false;
									this.userformItem.deptArray = [];
									this.getUserList();
									this.cleanUserFrom();
									this.userTableSelectItem.length = 0;
									this.userAddLoading = false;
								});
							}
							
						}
					} else {
						this.$Message.error("表单输入有误，请重新输入!");
					}
				});
			},
			//删除用户
			userDel() {
				if (this.userTableSelectItem.length == 0) {
					this.$Message.info("请选择一个用户删除");
					return;
				} else {
					this.confirmDel = true;
				}
			},
			//表格操作中的直接删除
			sosureDel() {
				this.operationDel = true;
			},
			// 表格操作中的确认删除
			delOk() {
				this.modal_loading = true;
				let data = {
					staffIds: this.userTableSelectItem[0],
				};
				this.$api.delUser(data).then(data => {
					this.modal_loading = false;
					this.operationDel = false;
					this.$Message.success("删除成功！");
					this.getUserList(); // 表格重新调用下
					this.cleanUserFrom();
					this.userTableSelectItem.length = 0;
					this.userformItem.deptArray = [];
				});
			},
			//确定删除选定用户
			del() {
				this.modal_loading = true;
				//要删除的用户编号
				let staffId = [];
				for (let index = 0; index < this.userTableSelectItem.length; index++) {
					staffId[index] = this.userTableSelectItem[index].staffId;
				}
				this.$api.delUser({
					staffIds: staffId
				}).then(data => {
					this.modal_loading = false;
					this.confirmDel = false;
					let count = 0;
					for (let index = 0; index < staffId.length; index++) {
						for (let index2 = 0; index2 < this.userList.length; index2++) {
							if (this.userList[index2].staffId == staffId[index]) {
								this.remove(index2);
								break;
							}
						}
					}
					this.$Message.success("删除成功！");
					this.getUserList();
					this.cleanUserFrom();
					this.userformItem.deptArray = [];
				});
				this.userTableSelectItem = [];
			},
			//弹窗框关闭调用清除方法
			usesrExit(name) {
				this.$Message.info("取消操作");
				// this.$refs[name].resetFields();
				this.selectRoleList = [];
				this.cleanUserFrom();
			},
			//清除添加用户form表单
			cleanUserFrom() {
				this.$refs['addUser'].resetFields();
				this.userformItem.staffId = '';
				this.userformItem.deptId = '';
				this.userformItem.deptName = '';
				this.userformItem.gender = '1';
				this.userformItem.staffName = "";
				this.userformItem.staffEmail = "";
				this.userformItem.staffPhone = "";
				this.userformItem.staffUsername = "";
				this.userformItem.staffCellphone = "";
				this.userformItem.orders = "";
				this.selectRoleList = [];
				this.clearChildEvent();
			},
			//清除组件数据
			clearChildEvent() {
				//调用子组件的方法，child是上边ref起的名字，emitEvent是子组件的方法
				this.$refs.chilDept.emitEvent('', '');
				this.$refs.chilJurisdiction.emitEvent([], '');
			},
			//获取表格中所选中的行
			getSelectColumns(even) {
				this.userTableSelectItem = even;
			},
			// 3.17 接收从父组件传过来的值：表格所选中的行
			// getSelectColumn(data) {
			// 	this.userTableSelectItem = data;
			// },
			//修改时判断选中的个数
			judgeModifySelect(name) {
				if (this.userTableSelectItem.length == 0) {
					this.$Message.info("修改请选择一个用户");
				} else if (this.userTableSelectItem.length == 1) {
					this.selectRoleList = [];
					this.selectzNode = [];
					this.userformItem.deptArray = [];
					this.userformItem.staffId = this.userTableSelectItem[0].staffId;
					this.userformItem.staffCellphone = this.userTableSelectItem[0].staffCellphone
					this.userformItem.orders = this.userTableSelectItem[0].orders;
					this.$api.getRoleList(null).then(data => {
						let a = [];
						this.$api.getUserRole(this.userformItem.staffId).then(data => {
							for (let index = 0; index < data.data.length; index++) {
								a[index] = data.data[index].roleId;
							}
							this.selectRoleList = a;
						});
					});
					//回显管辖范围
					this.$api.getJurisdictionList({
						staffId: this.userformItem.staffId
					}).then(data => {
						if (data.data) {
							let ids = [],
								names = '';
							data.data.forEach((item, idx) => {
								ids.push(item.deptId);
								names += item.deptName + ','
							})
							if (names.length > 0) names = names.substring(0, names.length - 1);
							this.userformItem.jurisdictionDeptIdArray = ids;
							this.userformItem.jurisdictionDeptNames = names;
							this.$refs.chilJurisdiction.emitEvent(this.userformItem.jurisdictionDeptIdArray, this.userformItem.jurisdictionDeptNames);
						}
					});
					this.userformItem.deptName = this.userTableSelectItem[0].deptName;
					// this.userformItem.deptId = this.userTableSelectItem[0].deptId;
					this.userformItem.gender = this.userTableSelectItem[0].gender + "";
					this.userformItem.staffName = this.userTableSelectItem[0].staffName;
					this.oldstaffName = this.userTableSelectItem[0].staffUsername;
					this.userformItem.staffUsername = this.userTableSelectItem[0].staffUsername;
					this.userformItem.staffPhone = this.userTableSelectItem[0].staffPhone;
					this.userformItem.staffEmail = this.userTableSelectItem[0].staffEmail;
					this.$refs.chilDept.emitEvent(this.userformItem.deptId, this.userformItem.deptName);
					this.addUserModal = true;
					this.isModal = 2;
					this.modalTitle = '修改用户';
				} else if (this.userTableSelectItem.length > 1) {
					this.$Message.info("修改只能择一个用户");
					// this.userTableSelectItem.length = 0;
				}
			},
			getPageIndex(index) {
				this.pageInfo.pageNum = index;
				this.getUserList();
			},
			getPageSize(pageSize) {
				this.pageInfo.pageSize = pageSize;
				this.getUserList();
			},
		}
	};
</script>
<style lang="less" scoped>
	p{
		span{
			color:rgba(255,255,255,0.85)
		}
	}
	.ivu-radio-wrapper{
		color:rgba(255,255,255,0.85)
	}
</style>