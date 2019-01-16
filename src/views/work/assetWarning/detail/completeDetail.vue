<template>
    <div class="completeDetail" v-breadcrumb='breadcrumb'>
        <Title :title='$route.query.tableTitle+" - 完备度明细"'></Title>
        <nomal-table class='table-cont' v-if='isShow' :table-json="tableJson" :data="data" :noid="true" :nohead="true " axiosType="post"></nomal-table>
    </div>
</template>

<script>
    import {
        businessJson,
        businessFormat
    } from '@/views/work/business/detail/businessDetail.js';
    import {
        dataAssetsJson,
        dataAssetsFormat,
        ECSJson,
        ECSFormat,
        RDSJson,
        RDSFormat,
        SLBJson,
        SLBFormat,
        OSSJson,
        OSSFormat,
        rjJson,
        yjJson,
        yjFormat
    } from '../../special/detail/specialDetail.js'
    import {
        pcRoomJson,
        pcRoomFormat
    } from '../../ITBasicResources/defaultJson.js'
    import {
        SERVER_BASE_URL
    } from '@/http/config.js';
    import Title from '@/components/title/index.vue';
    import NomalTable from "@/components/table/NomalTable";
    import TableSearch from "@/components/table/TableSearch";
    export default {
        data() {
            /* dataAssets: this.$api.dataAssetQuery,
            ECS: this.$api.getCloudResourcesDetail,
            RDS: this.$api.getCloudResourcesDetail,
            SLB: this.$api.getCloudResourcesDetail,
            OSS: this.$api.getCloudResourcesDetail,
            servers: this.$api.ITBasic.serversdetails,
            */
            let JSONArr = [0, 'business', 'pcRoom', 'yj', 'rj', 'dataAssets', 'ECS', 'OSS', 'RDS', 'SLB']
            let json = {
                pcRoom: {
                    url: this.$api.ITBasic.jifangDefault,
                    json: pcRoomJson,
                    format: pcRoomFormat,
                },
                business: {
                    url: this.$api.systemQuery,
                    json: businessJson,
                    format: businessFormat,
                },
                dataAssets: {
                    url: this.$api.dataAssetQuery,
                    json: dataAssetsJson,
                    format: dataAssetsFormat
                },
                ECS: {
                    url: this.$api.getCloudResourcesDetail,
                    json: ECSJson,
                    format: ECSFormat
                },
                RDS: {
                    url: this.$api.getCloudResourcesDetail,
                    json: RDSJson,
                    format: RDSFormat
                },
                SLB: {
                    url: this.$api.getCloudResourcesDetail,
                    json: SLBJson,
                    format: SLBFormat
                },
                OSS: {
                    url: this.$api.getCloudResourcesDetail,
                    json: OSSJson,
                    format: OSSFormat
                },
                rj: {
                    url: this.$api.softwaresQuery,
                    json: rjJson,
                    format: {}
                },
                yj: {
                    url: this.$api.equipmentQuery,
                    json: yjJson,
                    format: yjFormat
                }
            }[JSONArr[this.$route.query.type]]
            let {
                query,
                fullPath
            } = this.$route
            let typeThree = (query.isCityState == 'true') || (query.isCityState == true) ? 2 : query.radioBtn == 1 ? 1 : 0
            let leftname = ['全省总体', '省直部门', '市州部门'][typeThree];
            let parent = [{
                name: '全省总体分析',
                url: '/home/index/assetWarning'
            }, {
                name: '省直部门分析',
                url: '/home/index/warningDepartment'
            }, {
                name: '市州部门分析',
                url: '/home/index/warningCityState'
            }][typeThree];
            let backQuery=JSON.parse(this.$route.query.backQuery)
            return {
                breadcrumb: [{
                        icon: 'dingwei',
                        name: '资产填报预警'
                    },
                    parent,
                    {
                        name: backQuery.title,
                        url: {
                            name: backQuery.backPathName,
                            query: backQuery
                        }
                    }, {
                        name: '明细'
                    }
                ],
                data: [],
                filedName: [],
                tableTitle: '',
                isShow: false,
                tableJson: {
                    column: [{
                            type: "text",
                            align: "right",
                            label: "详情",
                            prop: "name",
                            width: "250",
                            'class-name': 'table-left-label'
                        },
                        {
                            type: "text",
                            align: "left",
                            label: "详情明细",
                            prop: "value",
                            width: ""
                        },
                        {
                            type: "text",
                            align: "right",
                            label: "详情",
                            prop: "name1",
                            width: "250",
                            'class-name': 'table-left-label'
                        },
                        {
                            type: "text",
                            align: "left",
                            label: "详情明细",
                            prop: "value1",
                            width: "",
                            'class-name': 'table-right-value'
                        }
                    ]
                },
                url: json.url,
                json: json
            }
        },
        components: {
            Title,
            NomalTable,
            TableSearch,
        },
        mounted() {
            this.getSystemQuery()
        },
        methods: {
            getSystemQuery() {
                this.url({
                    pageSize: 10,
                    pageNumber: 1,
                    ...this.$route.query
                }).then((res = {}) => {
                    let column = [];
                    let i = 0;
                    let obj = {};
                    if (res.data.length == 0) {
                        this.data = column;
                        this.isShow = true;
                        return;
                    }
                    let keys = Object.keys(this.json.json);
                    for (let resname in this.json.json) {
                        let name = ['name', 'name1'][i % 2];
                        let value = ['value', 'value1'][i % 2];
                        obj[name] = this.json.json[resname];
                        let data0 = res.data[0] || res.data;
                        let val = ''
                        /* 合规 */
                        if (this.filedName && this.filedName.length) {
                            for (let fKey in this.filedName) {
                                /* 匹配异常字段 */
                                if (resname == this.filedName[fKey]) {
                                    val = `<span class='color-red border-red'>${data0[resname]}</span>`;
                                    if (this.json.format[resname]) {
                                        val = `<span class='color-red border-red'>${this.json.format[resname](data0[resname])}</span>`;
                                    }
                                    break;
                                } else {
                                    /* 合规字段 (并且值不为空)*/
                                    val = data0[resname];
                                    if (this.json.format[resname]) {
                                        val = this.json.format[resname](data0[resname]);
                                    }
                                }
                            }
                        } else {
                            /* 非合规 */
                            val = data0[resname];
                            if (this.json.format[resname]) {
                                val = this.json.format[resname](data0[resname]);
                            }
                        }
                        obj[value] = val;
                        if (i % 2 === 1) {
                            column.push(obj);
                            obj = {};
                        }
                        if (i === keys.length - 1 && i % 2 === 0) {
                            column.push({ ...obj,
                                name1: '',
                                value1: ''
                            });
                        }
                        i++;
                    }
                    this.data = column;
                    this.tableTitle = this.data[5].value1;
                    this.isShow = true;
                })
            },
        }
    }
</script>

<style>

</style>
