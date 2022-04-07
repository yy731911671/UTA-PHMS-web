import request from '@/utils/request'

export function getCommunications() {
  return request({
    url: 'http://10.128.246.204:8080/communications',
    method: 'get',
  })
}

export function createCommunication(data) {
  return request({
    url: 'http://10.128.246.204:8080/communications',
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
    url: 'http://10.128.246.204:8080/communications',
    method: 'put',
    data
  })
}

