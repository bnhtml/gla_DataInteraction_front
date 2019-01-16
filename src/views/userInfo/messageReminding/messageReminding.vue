
//消息提醒
<template>
    <div class="messageReminding" id='messageReminding'>
        <card>
            <dl>
                <dt class="card-title">消息提醒</dt>
                <dd>
                    <ul class="list">
                        <li v-for='(v,i) in list' :key='i' @click="dataShow(v)">
                            <span>{{i+1}}.{{v.title}}</span>
                            <time>{{v.time}}</time>
                        </li>
                    </ul>
                    <myPage :url='url' :axiosType='"get"'></myPage>
                </dd>
            </dl>
        </card>
    </div>
</template>

<script>
    import myPage from '@/components/page/page.vue';
    import {
        MockUrl
    } from "@/http/axios";
    export default {
        data() {
            return {
                list: [],
                modal2: true
            }
        },
        components: {
            myPage
        },
        computed: {
            url() {
                return `${MockUrl}/api/userInfo/messageReminding`;
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            dataShow(e) {
                this.$Modal.info({
                    title: e.time,
                    content: '<br/>'+e.title,
                    closable: true,
                    width: 500,
                })
            },
            getList() {
                this.$api.messageReminding().then(res => {
                    this.list = res.data;
                }).catch(err => {
                    this.$Message.warning(this.$store.state.network)
                })
            }
        }
    }
</script>

<style scoped lang='scss'>
    .ivu-btn-primary,
    .ivu-btn-large {
        display: none;
    }
    .messageReminding {
        .list {
            margin-top: 20px;
            li {
                position: relative;
                height: 40px;
                line-height: 40px;
                padding: 0 15px;
                cursor: pointer;
                &:nth-child(2n-1), // &:hover
                {
                    background: #1A2247;
                }
                time {
                    position: absolute;
                    right: 15px;
                    top: 0;
                }
            }
        }
    }
</style>
