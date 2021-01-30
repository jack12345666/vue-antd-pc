import request from '@/utils/request';
import { stringify } from 'qs'


// // 获取区域列表
// export function getAreaList(data) {
//   return request({
//     url: '/area/listArea',
//     method: 'post',
//     data: stringify(data)
//   })
// }

// 获取厂房列表
export function getLeaseList(data) {
  return request({
    url: '/building/listByUser',
    method: 'post',
    data: stringify(data)
  })
}

// 获取厂房详情
export function getLeaseDetail(id) {
  return request({
    url: `/building/detail/${id}`,
    method: 'get'
  })
}

// 获取区域列表
export function getAreaList(data) {
  return request({
    url: '/commonCategory/categoryList',
    method: 'post',
    data: stringify(data)
  })
}
