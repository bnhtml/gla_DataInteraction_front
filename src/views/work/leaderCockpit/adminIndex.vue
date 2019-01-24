<!--  -->
<template>
<div class='leaderCockpit'>
	<el-row :gutter="20">
		<el-col :span="15">
			<el-card>
				<p class="titleLeftBorder">
					省直部门数据区建设概况
				</p>
				<div class="">
				</div>
			</el-card>
			
		</el-col>
		<el-col :span="9">
			<el-card>
				<p class="titleLeftBorder">
					省直部门数据区概况
				</p>
			</el-card>
			
		</el-col>
	</el-row>

		<el-card class="mt20">
			<p class="titleLeftBorder">
				市州部门数据概况
			</p>
			<div class="g-city-info mt10">
				<el-row gutter="20">
					<el-col span="12">
						<div class="g-leftbox">
							<div class="g-all">
								<p class="g-all-t">未建设数据区部门</p>
								<p class="g-all-n">64</p>
							</div>
							<div class="g-one">
								<div class="g-a flex-between">
									<p class="g-a-t">已建设数据区部门</p>
									<p class="g-a-n">35</p>
								</div>
								<div class="g-a flex-between">
									<p class="g-a-t">未建设数据区部门</p>
									<p class="g-a-n">29</p>
								</div>
							</div>
						</div>
					</el-col>
					<el-col span="6">
					
					</el-col>
					<el-col span="6">
					
					</el-col>
				</el-row>
			</div>
		</el-card>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.$api.get_firstdir({depart: '贵州省大数据局'}).then(res => {
    console.log(res, '====')
  })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.g-leftbox{
	background: #333
}
</style>