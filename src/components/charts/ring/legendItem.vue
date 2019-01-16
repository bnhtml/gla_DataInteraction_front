// 环形的图例组件封装
<template>
    <div class="legendItem">
        <ul class="transverse" v-if='className=="transverse"'>
            <li v-for="(v, k) in legendData" :key="k" class="text-nowrap" @click.stop="$emit('handelclick', k)">
                <span class="legend-circle-span" :style="'background:'+bg[k]"></span>
                <span class="legend-name-span" v-if='v.name'>{{v.name}}</span>
                <span class="legend-ratio-span" v-if='v.value || v.value === 0'>{{v.value}}%</span>
                <span class="legend-last-span" v-if="v.number || v.number === 0">{{v.number}}</span>
            </li>
        </ul>
        <!-- legendItem  
                    <li v-for="(v, k) in legendData" :key="k" class="text-nowrap" @click.stop="$emit('handelclick', k)">
                            <span class="legend-circle-span" :style="'background:'+bg[k]"></span>
                          <span class="legend-name-span" v-if='v.name'>{{v.name}}</span>
                              <span class="legend-ratio-span" v-if='v.value || v.value === 0'>{{v.value}}%</span>
                            <span class="legend-last-span" v-if="v.number || v.number === 0">{{v.number}}</span>
                        </li> -->
        <ul v-else class="longitudinal">
            <li>
                <p v-for="(v, k) in legendData" :key="k" @click.stop="$emit('handelclick', k)"> <span class="legend-circle-span" :style="'background:'+bg[k]"></span></p>
            </li>
            <li>
                <p class="legend-name-span" v-if='v.name' v-for="(v, k) in legendData" :key="k" @click.stop="$emit('handelclick', k)">{{v.name}}</p>
            </li>
            <li>
                <p class="legend-ratio-span" v-if='v.value || v.value === 0' v-for="(v, k) in legendData" :key="k" @click.stop="$emit('handelclick', k)">{{v.value}}%</p>
                <!-- <span class="legend-last-span" v-if="v.number || v.number === 0">{{v.number}}</span> -->
            </li>
            <li>
                <p class="legend-last-span" v-if="v.number || v.number === 0" v-for="(v, k) in legendData" :key="k" @click.stop="$emit('handelclick', k)">{{v.number}}</p>
            </li>
        </ul>
    </div>
</template>

<script type='text/javascript'>
    export default {
        name: 'legendItem',
        props:{
            legendData:{
                type:Array,
                default:[]
            },
            bg:{
                type:Array,
                default:[]
            },
            className:{
                type:String,
                default:'transverse'
            }
        },
        // props: ['legendData', 'bg'],
        data() {
            return {}
        },
        mounted() {},
        methods: {}
    }
</script>

<style lang='scss' scoped>
    @import '../../../assets/style/base/index.scss'; // .legendItem {
    //     // padding: 0 10px;
    //     ul {
    //         display: flex;
    //         flex-wrap: wrap;
    //         text-align: left;
    //         li {
    //             display: inline-block;
    //             height: 30px;
    //             line-height: 30px;
    //             margin-right: 10px;
    //             span {
    //                 display: inline-block;
    //                 font-size: 16px;
    //                 color: #fff;
    //                 opacity: .70;
    //                 height: 30px;
    //             }
    //             .legend-circle-span {
    //                 @include nums($w: 8px, $h:8px);
    //                 border-radius: 50%;
    //                 margin-right: 5px;
    //             }
    //             .legend-name-span {
    //                 min-width: 80px;
    //             }
    //             .legend-ratio-span {
    //                 min-width: 60px;
    //             }
    //             .legend-last-span {
    //                 min-width: 50px;
    //             }
    //         }
    //     }
    // }
    .legendItem {
        ul.transverse {
            display: flex;
            flex-wrap: wrap;
            text-align: left;
            li {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                margin-right: 10px;
                span {
                    display: inline-block;
                    font-size: 16px;
                    color: #fff;
                    opacity: .70;
                    height: 30px;
                }
                .legend-circle-span {
                    @include nums($w: 8px, $h:8px);
                    border-radius: 50%;
                    margin-right: 20px;
                }
                .legend-name-span {
                    min-width: 100px;
                }
                .legend-ratio-span {
                    min-width: 100px;
                }
                .legend-last-span {
                    // min-width: 100px;
                }
            }
        }
        ul.longitudinal {
            display: flex;
            flex-wrap: wrap;
            text-align: left;
            li {
                display: inline-block;
                // margin-right: 30px;
                font-size: 14px;
                p {
                    line-height: 40px;
                    height: 40px;
                    position: relative;
                    font-size: 16px;
                    .legend-circle-span {
                        display: block;
                        @include nums($w: 8px, $h:8px);
                        border-radius: 50%;
                        position: absolute;
                        top: 15px;
                        left: -33px;
                    }
                }
                &:nth-child(1){
                    margin-right: 0;
                    
                }
                &:nth-child(2){
                    margin-right: 35px;
                }
                &:nth-child(3){
                    margin-right: 40px;
                }
            }
        }
    }
</style>

