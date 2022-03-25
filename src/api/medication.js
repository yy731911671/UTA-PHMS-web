import request from '@/utils/request'

export function getMedicationList() {
  return request({
    url: '/medications',
    method: 'get',
  })
}

export function createMedication(data) {
  return request({
    url: '/medications',
    method: 'post',
    data
  })
}

export function deleteMedication(id) {
  return request({
    url: '/medications/'+id,
    method: 'delete',
  })
}

export function editMedication(data) {
  return request({
    url: '/medications',
    method: 'put',
    params: data
  })
}
export function getListByDoctorName(name) {
  return request({
    url: '/medications/search/'+name,
    method: 'get',
  })
}