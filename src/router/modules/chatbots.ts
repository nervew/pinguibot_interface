const Layout = () => import('@/layout/index.vue');

const chatbotsRouter = {
  path: '/chatbots',
  component: Layout,
  redirect: '/chatbots/list',
  name: 'Chatbots',
  meta: { title: 'Chatbots', icon: 'component', roles: ['admin', 'editor'] },
  children: [
    {
      path: 'list',
      component: () => import('@/views/chatbots/list.vue'),
      name: 'ChatbotList',
      meta: { title: 'List', icon: 'list' }
    },
    {
      path: 'create',
      component: () => import('@/views/chatbots/create.vue'),
      name: 'ChatbotCreate',
      meta: { title: 'Create', roles: ['admin'] }
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/chatbots/edit.vue'),
      name: 'ChatbotEdit',
      meta: { hidden: true, title: 'Edit', activeMenu: '/chatbots/list', roles: ['admin'] }
    }
  ]
};

export default chatbotsRouter;


