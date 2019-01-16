// 服务器详情
export let serversJson = {
  orgname: '部门单位名称',
  "eqpnm": "设备名称",                
  "brandmodel": "设备品牌及型号",                
  "eqptype": "设备类型",                
  "ip": "局域网IP地址",                
  "ram": "内存容量",                
  "rom": "硬盘容量",                
  "os": "设备操作系统",                
  "fixedassetnumber": "固定资产编号",                
  "equprice": "硬件采购价格(万元)",                
  "usedate": "投入使用时间",                
  "mac": "设备MAC地址",                
  "sbfb": "设备分布",                
  "eqppurdate": "采购时间",                
  "supplierpeople": "供应商联系人",                
  "sbxh": "设备型号",                
  "manufacturer": "生产厂商",                
  "jzywfy": "截至2017年底产生的运维费用（万元）",                
  "supplier": "供应商",                
  "supplierphone": "供应商联系方式"                
}
export let serversFormat = {
  eqptype:v=>['服务器','专用设备','ECS','UPS','其他','机柜','空调','安全设备','网络设备','路由器','交换机'][v-1] || '未反馈',
}