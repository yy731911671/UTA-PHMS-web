import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/sys/login/restful?username='+username+'&password='+password,
    method: 'post',
  })
}

export function getInfo() {
  return request({
    url: '/sys/login',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/users/register',
    method: 'post',
    data: data
  })
}

export function updateProfiles(data) {
  return request({
    url: '/users/updateInfo',
    method: 'put',
    data: data
  })
} 

export function fetchList(params) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/admin/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/admin/delete/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: data
  })
}
