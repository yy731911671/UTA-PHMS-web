import request from '@/utils/request'

export function getCommunications() {
  return request({
    url: 'http://127.0.0.1:8080/communications',
    method: 'get',
  })
}

export function createCommunication(data) {
  return request({
    url: 'http://127.0.0.1:8080/communications',
    method: 'post',
    data
  })
}

export function deleteCommunication(id) {
  return request({
    url: '/communications/'+id,
    method: 'delete',
  })
}

export function editCommunication(data) {
  return request({
    url: 'http://127.0.0.1:8080/communications',
    method: 'put',
    data
  })
}

