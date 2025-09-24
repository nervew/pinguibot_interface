import request from '@/utils/request';

export function fetchList(params) {
  return request({ url: '/prompts', method: 'get', params });
}

export function fetchOne(promptId) {
  return request({ url: `/prompts/${promptId}`, method: 'get' });
}

export function create(data) {
  return request({ url: '/prompts', method: 'post', data });
}

export function update(promptId, data) {
  return request({ url: `/prompts/${promptId}`, method: 'put', data });
}

export function remove(promptId) {
  return request({ url: `/prompts/${promptId}`, method: 'delete' });
}




