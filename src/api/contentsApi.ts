import request from '@/util/request'
import api from '@/util/api';

// 获取内容列表
const getContentsList = (data: any) => {
    return request({
        url: api + '/contents/list',
        method: 'get',
        params: data || {}
    })
}

// 获取内容详情
const getContents = (data: any) => {
    return request({
        url: api + '/contents/get',
        method: 'get',
        params: data
    })
}
// 内容新增
const contentsAdd = (data: any) => {
    return request({
        url: api + '/contents/add',
        method: 'post',
        data: data
    })
}
// 内容修改
const contentsEdit = (data: any) => {
    return request({
        url: api + '/contents/edit',
        method: 'post',
        data: data
    })
}

// 内容删除 
const contentsDel = (data: any) => {
    return request({
        url: api + '/contents/del',
        method: 'post',
        data: data
    })
}
export { getContents, getContentsList, contentsAdd, contentsEdit, contentsDel } 