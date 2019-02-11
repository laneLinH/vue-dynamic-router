const api={
    cadreAudit_audithisthory:'/cad/cadreAudit/audithistory',//根据干部id获取审核历史
    cadreBase_audit:'/cad/cadreBase/audit',//审核归档申请
    cadreBase_auditedit:'/cad/cadreBase/auditedit',//审核修改申请
   // cadreBase_agreeedit:'/cad/cadreBase/agreedit',//同意修改申请
    cadreBase_batchupdate:'/cad/cadreBase/batchupdate',//批量修改干部信息
    cadreBase_curentinfo:'/cad/cadreBase/curentinfo',//根据干部id拉取干部信息
    cadreBase_delete:'/cad/cadreBase/delete',//根据干部id逻辑删除干部记录
    cadreBase_exportexcel:'/cad/cadreBase/exportexcel',//导出已归档干部信息列表
    cadreBase_getcadreByorgNo:'/cad/cadreBase/getcadreByorgNo',//根据部门no拉取部门下的干部
    cadreBase_insert:'/cad/cadreBase/insert',//根据干部id获取审核历史
    cadreBase_pageauditlist:'/cad/cadreBase/pageauditlist',
    cadreBase_pagelist:'/cad/cadreBase/pagelist',
    cadreBase_reject:'/cad/cadreBase/reject',
    cadreBase_rejectedit:'/cad/cadreBase/rejectedit',
    cadreBase_savetemp:'/cad/cadreBase/savetemp',
    cadreBase_update:'/cad/cadreBase/update',
    cadreBase_applyedit:'/cad/cadreBase/applyedit',//提交修改申请
    sysAccount_cadrelogin:'/cad/sysAccount/cadrelogin',
    sysAccount_changepwd:'/cad/sysAccount/changepwd',
    sysAccount_create:'/cad/sysAccount/create',
    sysAccount_logout:'/cad/sysAccount/logout',
    sysAccount_pagelist:'/cad/sysAccount/pagelist',
    sysAccount_delete:'',
    sysOrganization_copinfos:'/cad/sysOrganization/copinfos',
    sysOrganization_delcop:'/cad/sysOrganization/delcop',
    sysOrganization_insertorg:'/cad/sysOrganization/insertorg',
    sysOrganization_orginfos:'/cad/sysOrganization/orginfos',
    sysOrganization_deldep:'/cad/sysOrganization/deldep',
    sysUploadFileInfo_downloadtemplet:'/cad/sysUploadFileInfo/downloadtemplet',
    sysUploadFileInfo_findphoto:'/cad/sysUploadFileInfo/findphoto',
    sysUploadFileInfo_upload:'/cad/sysUploadFileInfo/upload',
}


export default api
