import request from '@/utils/request';

export function fetchConversations(params) {
  return request({ url: '/messages/conversations', method: 'get', params });
}

export function fetchConversation(conversationId) {
  return request({ url: `/messages/conversations/${conversationId}`, method: 'get' });
}

export function updateConversationStatus(conversationId, status) {
  return request({ url: `/messages/conversations/${conversationId}/status`, method: 'put', params: { status } });
}

export function sendMessage(data) {
  return request({ url: '/messages/send', method: 'post', data });
}




