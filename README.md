# 数据资产辅助决策系统
>## vue + vue-router + vuex + axios + iview (echarts)
>## webpack ; scss

* npm install 下载依赖包
    * --save 表示的是这个依赖在部署之后仍需要
* npm run dev 启动项目
* npm run build 打包项目

## build 构建脚本目录
## config 构建配置目录
## node_modules 依赖的node工具包目录
## src 源码目录
* assest 资源目录
    * style 样式
        *  base 基本样式 
            >* index 封装样式
            >* reset 重置浏览器
            >* common 共用class（不合适可删除）            
        *  cover 覆盖UI框架

        *  common class共用样式 （适用于本项目）

    * font icon字体图标

    * img 图片 请不要直接把图片放在img文件夹下，会觉得乱

        >* icon 类
        >* banner 类
        >* bg 类
        >* logo 类
        >* other 未知类

* components 组件目录（封装）
    * HelloWorld 类似一个测试案例，有$http调用,scss @minix % 继承 （可删，仅仅用于让其他前端人员了解方法使用）
    * 开发人员组件封装时，建立文件夹，文件夹内是该功能组件
* http 封装 axios -- 持续优化中
* router 路由配置  （包含动态路由）
    >* index 基本路由
    >* routerUtils 动态路由配置
* server 后台服务/接口 支持 post get 
* store vuex状态管理目录
* views 路由页面
        页面布局参考iview布局 尽可能的使用组件 页面组件背景视情况使用card 灵活使用 风格统一
* App.vue 页面级Vue组件
* main.js 页面入口JS文件



## static 第三方静态资源文件目录
* common 共用JS方法

* gitignore 提交配置（去除目录）

* eslintrc.js  ES语法检查配置

* package.json 项目描述文件

* index.html 入口页面


> eslint

#### 2d8cf0   主题蓝


