<template>
    <div>
        <dl class="list">
            <dt>{{title}}</dt>
            <dd>
                <slot></slot>
            </dd>
        </dl>
    </div>
</template>

<script>
    export default {
        name:'list',
        props:['title'],
        data(){
            return{
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '@/assets/style/base/index.scss';
    .list {
        padding: 11px;
        background: rgba(41, 153, 243, 0.09);
        color: rgba(255,255,255,0.85);
        border:solid 1px rgb(26, 81, 130);
        dt {
            @include font($fz: 16px, $color:#00ffe7);
            height: 20px;
            line-height: 20px;
            margin-bottom: 10px;
        }
        dd {
            margin-bottom: 10px;
            height: 280px;
            overflow-y: auto;
            ul {
                li {
                    height: 35px;
                    line-height: 35px;
                    padding-left: 17px;
                    padding-right: 60px;
                    position: relative;
                    @extend %text;
                    @include font($fz:16px,$color:#fff);
                    label {
                        display: inline-block;
                        width: 23px;
                        height: 23px;
                        vertical-align: middle;
                        text-align: center;
                        line-height: 23px;
                    }
                    span {
                        position: absolute;
                        right: 20px;
                    }
                }
                li:nth-child(2n) {
                    background: rgba(10, 66 ,134 ,0.9);
                }
                li:nth-child(1) label {
                    background: url('../../assets/img/icon/list_bg_1.png') no-repeat;
                }
                li:nth-child(2) label {
                    background: url('../../assets/img/icon/list_bg_2.png')  no-repeat;
                }
                li:nth-child(3) label {
                    background: url('../../assets/img/icon/list_bg_3.png') no-repeat;
                }
            }
        }
    }
</style>
