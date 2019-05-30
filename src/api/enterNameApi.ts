import request from '@/util/request'
import api from '@/util/api';

// 获取报名列表
const getEnterNameList = (data: any) => {
    return request({
        url: api + '/sign/list',
        method: 'get',
        params: data || {}
    })
}

export { getEnterNameList } 