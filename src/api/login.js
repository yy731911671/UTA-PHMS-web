import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'http://10.128.246.204:8080/sys/login/restful?username='+username+'&password='+password,
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


