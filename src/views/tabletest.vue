<template>
<div class="page">    
    <div class="page-content">
        <nomal-table :table-json="tableJson" :url="url">
            <table-search :searchs="searchs"></table-search>
        </nomal-table>
    </div>
</div>
</template>

<script>
import NomalTable from "@/components/table/NomalTable";
import TableSearch from "@/components/table/TableSearch";
import { MockUrl } from "@/http/axios";
export default {
  name: "userlist",
  data() {
    return {
      searchs: {
        list: [
          {
            type: "input-text", //输入文本
            label: "手机号码",
            name: "user_phone",
            value: "",
            placeholder: "手机号"
          },
          {
            type: "input-select", //选择器
            label: "收益来源",
            name: "option",
            value: "all",
            options: [
              {
                name: "全部",
                value: "all"
              },
              {
                name: "option2",
                value: "option2"
              },
              {
                name: "option3",
                value: "option3"
              }
            ]
          },
          {
            type: "input-date", //输入日期
            label: "投入资金",
            name: "date",
            value: ""
          }
        ]
      },
      tableJson: {
        column: [
          //行
          {
            type: "text",
            align: "center",
            label: "用户ID",
            prop: "user_id",
            width: ""
          },
          {
            type: "text",
            align: "center",
            label: "手机号码",
            prop: "user_phone",
            width: ""
          },
          {
            type: "text",
            align: "center",
            label: "金额",
            prop: "user_fund_income_price",
            width: "150"
          },
          {
            type: "text",
            align: "center",
            label: "时间",
            prop: "user_fund_income_ctime",
            width: ""
          },
          {
            type: "text",
            align: "center",
            label: "收益来源",
            prop: "user_fund_income_type",
            width: "",
            formatter(row, column, columnIndex, rowIndex) {
              switch (row.user_fund_income_type) {
                case 1:
                  return "首次注册红包";
                case 2:
                  return "订单评价返现";
                case 3:
                  return "优质评价返现";
                case 4:
                  return "推荐用户提成";
                default:
                  return "error";
              }
            }
          }
        ]
      }
    };
  },
  components: {
    NomalTable,
    TableSearch
  },
  created() {},
  computed: {
    url() {
      return `${MockUrl}/api/testtable`;
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>
