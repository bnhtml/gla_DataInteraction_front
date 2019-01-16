<template>
    <div class="cardColor">
        <dl :style='{ border: "solid 1px "+borderColor,backgroundImage: "linear-gradient(45deg, "+bg[0]+" 0%, "+bg[1]+" 100%)"}'>
            <dt >{{title}}</dt>
            <slot></slot>
        </dl>
    </div>
</template>

<script>
    export default {
        props:{
            title:{
                default:''
            },
            borderColor:{
                 default:'#154b70'
            },
            bg:{
                type:Array,
                default:['rgba(43,84,160,0.5)', 'rgba(46,106,198,0.5)']
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '@/assets/style/base/index.scss';
    .cardColor {
        dl {
            border-radius: 8px;
            padding: 10px;
            dt {
                @extend %text;
                font-size: 16px;
                color: rgba(255, 255, 255, 1);
                height: 27px;
            }
        }
    }
</style>
