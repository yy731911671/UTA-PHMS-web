import request from '@/utils/request'

export function getNoteList() {
  return request({
    url: 'http://127.0.0.1:8080/notes',
    method: 'get',
  })
}

export function createNote(data) {
  return request({
    url: 'http://127.0.0.1:8080/notes',
    method: 'post',
    data
  })
}

export function deleteNote(id) {
  return request({
    url: '/notes/'+id,
    method: 'delete',
  })
}

export function editNote(data) {
  return request({
    url: 'http://127.0.0.1:8080/notes',
    method: 'put',
    data
  })
}
