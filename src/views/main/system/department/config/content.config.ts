

const departmentConfig = {
  pageName:'department',
  header:{
    title:'部门列表',
    btnTitle:'新建部门'
  },
  propsList:[
    // 1. selection 2. index
    { type:'selection', label:'选择', width:'80px'},
    { type:'index', label:'序号', width:'80px'},

    { type: 'normal', label:'用户名', width:'150px', prop:'name'},
    { type: 'normal', label:'部门领导', width:'150px', prop:'leader'},
    { type: 'normal', label:'上级部门', width:'150px', prop:'parentId'},

    // type 为 custom 是定制化的

    { type: 'timer', label:'创建时间', prop:'createAt'},
    { type: 'timer', label:'更新时间', prop:'updateAt' },

    { type:'handler', label:'操作', width:'150px'}
  ]
}

export default departmentConfig
