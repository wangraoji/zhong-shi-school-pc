import request from '@/util/request'
import api from '@/util/api';

// 获取读书会列表
const getBookClubList = (data: any) => {
    return request({
        url: api + '/reading/list',
        method: 'get',
        params: data || {}
    })
}

// 获取读书会详情
const getBookClub = (data: any) => {
    return request({
        url: api + '/reading/get',
        method: 'get',
        params: data || {}
    })
}
export { getBookClubList, getBookClub } 