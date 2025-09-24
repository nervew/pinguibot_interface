const Layout = () => import('@/layout/index.vue');

const billingRouter = {
  path: '/billing',
  component: Layout,
  redirect: '/billing/payment-methods',
  name: 'Billing',
  meta: { title: 'Billing', icon: 'money', roles: ['admin'] },
  children: [
    {
      path: 'payment-methods',
      component: () => import('@/views/billing/payment-methods.vue'),
      name: 'PaymentMethods',
      meta: { title: 'Payment Methods', icon: 'money' }
    },
    {
      path: 'subscriptions',
      component: () => import('@/views/billing/subscriptions.vue'),
      name: 'Subscriptions',
      meta: { title: 'Subscriptions', icon: 'tab' }
    }
  ]
};

export default billingRouter;


