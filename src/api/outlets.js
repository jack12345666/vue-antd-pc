import request from '@/utils/request';
import { stringify } from 'qs'

// 获取分类
export function getOutLetsType(data) {
    return request({
        url: '/commonCategory/categoryList',
        method: 'post',
        data: `category=${data}`
    })
}

// 获取网点列表
export function getOutLetsList(data) {
    return request({
        url: '/outlets/outletsList',
        method: 'post',
        data: stringify(data)
    })
}