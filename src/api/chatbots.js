import request from '@/utils/request';

export function fetchList(params) {
  return request({ url: '/chatbots', method: 'get', params });
}

export function fetchOne(chatbotId) {
  return request({ url: `/chatbots/${chatbotId}` , method: 'get' });
}

export function create(data) {
  return request({ url: '/chatbots', method: 'post', data });
}

export function update(chatbotId, data) {
  return request({ url: `/chatbots/${chatbotId}`, method: 'put', data });
}

export function remove(chatbotId) {
  return request({ url: `/chatbots/${chatbotId}`, method: 'delete' });
}




