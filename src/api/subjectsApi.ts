import request from '@/util/request'
import api from '@/util/api';

// 获取课程列表
const getSubjectsList = (data: any) => {
    return request({
        url: api + '/subjects/list',
        method: 'get',
        params: data
    })
}
// 获取课程详情
const getSubjects = (data: any) => {
    return request({
        url: api + '/subjects/get',
        method: 'get',
        params: data,
    })
}

// 课程新增
const subjectsAdd = (data: any) => {
    return request({
        url: api + '/subjects/add',
        method: 'post',
        data: data
    })
}
// 课程修改
const subjectsEdit = (data: any) => {
    return request({
        url: api + '/subjects/edit',
        method: 'post',
        data: data
    })
}

// 课程删除
const subjectsDel = (data: any) => {
    return request({
        url: api + '/subjects/del',
        method: 'post',
        data: data
    })
}
export {getSubjects, getSubjectsList,subjectsAdd,subjectsEdit,subjectsDel } 