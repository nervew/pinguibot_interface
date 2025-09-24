import request from '@/utils/request';

export function fetchList(params) {
  return request({ url: '/users', method: 'get', params });
}

export function fetchOne(id) {
  return request({ url: `/users/${id}`, method: 'get' });
}

export function create(data) {
  return request({ url: '/auth/signup', method: 'post', data });
}

// No explicit update/delete swagger endpoints; keeping placeholders if backend supports later
export function update(id, data) {
  return request({ url: `/users/${id}`, method: 'put', data });
}

export function remove(id) {
  return request({ url: `/users/${id}`, method: 'delete' });
}




