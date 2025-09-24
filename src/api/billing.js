import request from '@/utils/request';

// Payment Methods
export function createPaymentMethod(data) {
  return request({ url: '/billing/payment-methods', method: 'post', data });
}

export function listPaymentMethods() {
  return request({ url: '/billing/payment-methods', method: 'get' });
}

// Subscriptions
export function createSubscription(data) {
  return request({ url: '/billing/subscriptions', method: 'post', data });
}

export function listSubscriptions() {
  return request({ url: '/billing/subscriptions', method: 'get' });
}




