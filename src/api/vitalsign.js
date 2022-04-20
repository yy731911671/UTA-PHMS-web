import request from '@/utils/request'

export function getVitalSignList() {
  return request({
    url: 'http://127.0.0.1:8080/vitalsign',
    method: 'get',
  })
}

export function createVitalSign(data) {
  return request({
    url: 'http://127.0.0.1:8080/vitalsign',
    method: 'post',
    data
  })
}

export function deleteVitalSign(id) {
  return request({
    url: '/vitalsign/'+id,
    method: 'delete',
  })
}

export function editVitalSign(data) {
  return request({
    url: 'http://127.0.0.1:8080/vitalsign',
    method: 'put',
    data
  })
}
