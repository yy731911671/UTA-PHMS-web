import request from '@/utils/request'

export function getDietList() {
  return request({
    url: 'http://127.0.0.1:8080/diet',
    method: 'get',
  })
}

export function createDiet(data) {
  return request({
    url: 'http://127.0.0.1:8080/diet',
    method: 'post',
    data
  })
}

export function deleteDiet(id) {
  return request({
    url: '/diet/'+id,
    method: 'delete',
  })
}

export function editDiet(data) {
  return request({
    url: 'http://127.0.0.1:8080/diet',
    method: 'put',
    data
  })
}
