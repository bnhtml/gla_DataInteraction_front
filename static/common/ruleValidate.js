const ruleValidate={
    tel:[
        {   
            type: "string",
            required: true,
            message: "手机号不能为空",
            trigger: "change"
        },
        {
            type: "string",
            pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
            message: "手机号格式不正确",
            trigger: "change" //blur
        }
    ],
    mail:[
        {
            required: true,
            message: "邮箱不能为空",
            trigger: "change"
        },
        {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "change"
        }
    ],
    date:[ { required: true, type: 'date', message: '预约日期不能为空', trigger: 'change' }],
    place:[
        { required: true, message: '办理地点不能为空', trigger: 'change' }
    ],
    timeLength:[ 
        { required: true, message: '时间段不能为空', trigger: 'change' }
    ],
    officeNumber:[ 
        { required: true, message: '办件单号不能为空', trigger: 'change' }
    ],
    commentTextarea:[ 
        { required: true, message: '评论信息不能为空', trigger: 'blur' },
        { type: 'string', min: 20, message: '评论不能少于20字', trigger: 'blur' }
    ],
    address:[{required:true, message: '通讯地址不能为空', trigger: 'blur'}],
  }
  export default ruleValidate;