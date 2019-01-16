<template>
  <div class="homepage" :style="{background:'url('+homepageBg+') no-repeat center center','backgroundSize':'cover'}">
    <myHeader :bg='"transparent"'></myHeader>
    <div class="wrapper">
      <div class="home_img">
        <ul class="pos-relative">
          <li v-for="(v,i) in homeMenu" :key="i"  :style="{background:'url('+v.img+') no-repeat center center','backgroundSize':'cover'}"  @click="goPath(v.pathName)">
              <div class="daily-shade" v-if="v.isHave">
                <div v-for="(item, index) in v.children" :key="index" class="shadeLi" @click.stop="goPath(item.mdlhref)" v-if='i!=0'><span class="top_span">{{item.mdlname}}</span></div>
                <div  class="shadeLi"  v-if='i==0'><span class="top_span">{{v.cont}}</span></div>
              </div>
          </li>
        </ul>
      </div>
      <!-- <div class="wrapper-top">
        <div>
          <ul class="wrapper-top-left">
            <li v-for='(v,i) in leftTop' :key='i' :id='v.ref' class="animated fadeInDown" @mouseover="selectClass(v.ref) " @mouseout="outClass(v.ref)">
              <p><i :class="'iconfont '+v.icon"></i>{{v.cont}}</p>
              <img :src="v.img" alt="" @click='goRouter(v)'>
            </li>
          </ul>
        </div>
        <div>
          <ul class="wrapper-top-right">
            <li v-for='(v,i) in rightTop' :key='i' :id='v.ref' class="animated fadeInDown" @mouseover="selectClass(v.ref) " @mouseout="outClass(v.ref)">
              <p><i :class="'iconfont '+v.icon"></i>{{v.cont}}</p>
              <img :src="v.img" alt="" @click='goRouter(v)'>
            </li>
          </ul>
        </div>
      </div> -->
      <!-- <div class="wrapper-bottom">
        <ul class="">
          <li v-for='(v,i) in bottom' :key='i' :id='v.ref' class="animated fadeInDown" @mouseover="selectClass(v.ref) " @mouseout="outClass(v.ref)">
            <p><i :class="'iconfont '+v.icon"></i>{{v.cont}}</p>
            <img :src="v.img" alt="" @click='goRouter(v)'>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>
<script>
  import myHeader from '../header/headerBar.vue'
  import {mapState} from 'vuex';
  export default {
    name: 'homepage',
    data() {
      return {
      homeImgList:[
          {
            img: require('../../assets/img/bg/data_home.png'),
            cont: '数据资产综合分析',
             pathName: 'specialIndex',
          },
          {
            img: require('../../assets/img/bg/IT_home.png'),
            ref:'ref3',
            pathName: 'ITBasicResources',
            childrenPath:['ITBasicResources','ITdepartment','ITcityState']
          },
          {
            img: require('../../assets/img/bg/yewu_home.png'),
            ref:'ref2',
            pathName: 'businessIndex',
            childrenPath:['businessIndex','businessDepartment','businessCityState']
          },
          {
            img: require('../../assets/img/bg/warn_home.png'),
           ref:'ref4',
           pathName: 'assetWarning',
           childrenPath:['assetWarning','warningDepartment','warningCityState']
          },
        ],
        homepageBg: require('../../assets/img/bg/homepage_bg_0928.png'),
        leftTop: [{
          cont: '数据资产综合分析',
          icon: 'icon-shujuziyuanzonghefenxi',
          img: require('../../assets/img/icon/homepage_top_1.gif'),
          pathName: 'specialIndex',
          ref: 'menu1',
        }],
        rightTop: [{
          cont: '机房分析',
          icon: 'icon-ziyoujifangfenxi',
          img: require('../../assets/img/icon/homepage_top_2.gif'),
          pathName: 'ITBasicResources',
          ref: 'menu3'
        }, {
          cont: 'CPU资源',
          icon: 'icon-zhuanti',
          img: require('../../assets/img/icon/homepage_top_3.gif'),
          pathName: 'ITBasicResources',
          ref: 'menu5',
        }, {
          cont: '内存资源',
          icon: 'icon-ruanjianzichanfenxi',
          img: require('../../assets/img/icon/homepage_top_4.gif'),
          pathName: 'ITBasicResources',
          ref: 'menu4',
        }, {
          cont: '存储资源分析',
          icon: 'icon-neicunziyuan',
          img: require('../../assets/img/icon/homepage_top_5.gif'),
          pathName: 'ITBasicResources',
          ref: 'menu6',
        }],
        bottom: [{
            cont: '资产填报预警',
            icon: 'icon-zichantianbaoyujing',
            img: require('../../assets/img/icon/homepage_bottom_1.gif'),
            ref: 'menu7',
            pathName: 'assetWarning',
          },
          {
            cont: '业务系统分析',
            icon: 'icon-zhuantifenxi',
            img: require('../../assets/img/icon/homepage_bottom_2.gif'),
            ref: 'menu8',
            pathName: 'businessIndex',
          },
        ]
      }
    },
    computed: {
      ...mapState(['homeRouterList']),
      homeMenu(){
        let firstLevels = this.homeRouterList.map(o => o.shorthref);
        return  this.homeImgList.map(o => {
          let idx = firstLevels.indexOf(o.pathName);
          let isHave = idx > -1;
          return { ...o, isHave, ...(isHave && this.homeRouterList[idx] || {})}
        });
      }
    },
    components: {
      myHeader
    },
    created(){
      this.$api.isLogin();
    },
    mounted() {
    },
    methods: {
      goPath(urlname){
         if(this.$store.state.token){
            let isJurisdiction = false; // 判断是否有权限查看该模块
            function searchRouteName(list){

              for (let index = 0; index < list.length; index++) {
                if (urlname && urlname === list[index].shorthref && list[index].children.length === 0) {
                  isJurisdiction = true;
                }
                list[index].children.length && searchRouteName(list[index].children);
              }

            }
            searchRouteName(this.$store.state.homeRouterList);
            if (isJurisdiction == false) {
              this.$Message.info('Sorry，您没有权限查看');
            }else{
              window.sessionStorage.removeItem('openUrl');
              if(urlname === 'specialIndex'){
                let routeData = this.$router.resolve({
                  name: urlname
                });
                window.localStorage.setItem('checked', '');
                window.open(routeData.href, "_blank");
              }else{
                this.$router.push({name: urlname})
              }
            }
         }else{
          this.$Message.info('请重新登录');
          this.$router.push({
              path: '/login'
          })
        }
      },
      goSpecialIndex() {
        let routeData = this.$router.resolve({
          name: 'specialIndex',
          query: {
            orgType: 2,
          },
        });
        window.open(routeData.href, "_blank");
      },
      /* 滑入动画 */
      selectClass() {
        // document.getElementById(ref).className = 'animated pulse';
        document.getElementById('ref0').className = 'animated pulse';
      },
      /* 滑出动画 */
      outClass() {
        // document.getElementById(ref).className = '';
         document.getElementById('ref0').className =  ''
      },
    }
  }
</script>
<style scoped lang='scss'>
  @import '../../assets/style/base/index.scss';
  @media screen and (max-width: 1920px) {
    .wrapper {
      transform: scale(1.15)!important
    }
  }
  @media screen and (max-width: 1650px) {
    .wrapper {
      transform: scale(1.15)!important
    }
  }
  @media screen and (max-width: 1440px) {
    .wrapper {
      transform: scale(1)!important
    }
  }
  @media screen and (max-width: 1280px) {
    .wrapper {
      transform: scale(0.9)!important
    }
  }
  .homepage {
    @include nums($w: 100%, $h:100%);
    position: absolute;
    top: 0;
    bottom: 0; // margin-top: -64px;
    .wrapper {
      margin: 0 auto;
      @include nums($w: 1285px);
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -620px;
      // margin-top: -250px;
      margin-top:-150px;
      .home_img{
        ul{
          display: flex;
          position: relative;
          li{
            position:absolute;
             position: relative;
             width: 25%;
             height: 398px;
             cursor: pointer;
              box-shadow:5px 2px 6px rgba(89, 59, 18, 0.31);
              border-radius: 20px;
              .daily-shade {
                  position: absolute;
                  transition: all .2s ease;
                  width: 100%;
                  opacity: 0;
                  height: 100%;
                  top: 0;
                  left: 0;
                  background: rgba(0, 0, 0, 0.8);
                  z-index: 10000;
                  // display: none;
                  border-radius: 20px;
                  display: flex;
                  justify-content: center;
                  flex-direction: column;
                  .shadeLi{
                    transform: translate(0, 100px);
                    transition: all .2s ease;
                    font-size: 24px;
                    text-align: center;
                    position: relative;
                    line-height: 75px;
                  }
                  .shadeLi:hover{
                    color: #00ffe7;
                    
                  }
                    
                }
          }
          /* :not(:first-child) */
          li:hover{
              .daily-shade{
                opacity: 1;
                .shadeLi{
                  transform: translate(0, 0);

                }
              }
              // .top_span{
              //   animation: moveTop 2s ease;
              //   -webkit-animation-name: moveTop;
              //   }
          }
          li:not(:last-child){
              margin-right:40px;
          }
          li:nth-child(1){
            animation: moveLeft1 4s  ease;
          }
          li:nth-child(2){
            animation: moveLeft2 2s  ease;
           
          }
           li:nth-child(3){
            animation: moveRight1 2s  ease;
           
          }
           li:nth-child(4){
            animation: moveRight2 4s  ease;
          }
        }
      }
      .wrapper-top {
        @include nums($w: 1285px);
        margin-bottom: 20px;
        .wrapper-top-left {
          display: inline-block;
          @include nums($w: 400px, $h:320px);
          margin-right: 20px;
          li {
            position: relative;
            top: 3px;
          }
        }
        div {
          display: inline-block;
          vertical-align: middle;
          .wrapper-top-right {
            @include flex-wrap($wrap: wrap);
            @include nums($w: 860px, $h:320px);
            li {
              margin-right: 20px;
              margin-bottom: 20px;
              position: relative;
              img {
                display: block;
                @include nums($w: 400px, $h:150px);
              }
            }
          }
        }
      }
      .wrapper-bottom {
        ul {
          @include flex-wrap($wrap: wrap);
          li {
            position: relative;
            &:first-child {
              margin-right: 22px;
            }
          }
        }
      }
    }
  }
  p {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1px;
    color: #fff;
    font-size: 20px;
    margin: 14px 0 0 20px;
    i {
      font-size: 22px;
      vertical-align: middle;
      margin-right: 8px;
    }
  }
  img {
    border-radius: 10px;
  }


@keyframes moveLeft1{
    0% {
      left:-5000px;
    }
    50% {
      left:-30px;
    }
    100% {
      left:0;
    
    }
  }
  @keyframes moveLeft2{
    0% {
      left:-5000px;
    }
    50% {
      left:-30px;
    }
    100% {
      left:0px;
    }
  }

  @keyframes moveRight1{
    0% {
      right:-5000px;
    }
    50% {
      right:-30px;
    }
    100% {
      right:0px;
    }
  }
    @keyframes moveRight2{
    0% {
      right:-5000px;
    }
    50% {
      right:-30px;
    }
    100% {
      right:0px;
    }
  }

  @keyframes moveTop{
    from {
      opacity: 0;
       -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
@-webkit-keyframes moveTop {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}


</style>
