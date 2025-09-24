const Layout = () => import('@/layout/index.vue');

const messagesRouter = {
  path: '/messages',
  component: Layout,
  redirect: '/messages/conversations',
  name: 'Messages',
  meta: { title: 'Messages', icon: 'message', roles: ['admin', 'editor'] },
  children: [
    {
      path: 'conversations',
      component: () => import('@/views/messages/conversations.vue'),
      name: 'ConversationList',
      meta: { title: 'Conversations', icon: 'list' }
    },
    {
      path: 'conversations/:id',
      component: () => import('@/views/messages/detail.vue'),
      name: 'ConversationDetail',
      meta: { hidden: true, title: 'Detail', activeMenu: '/messages/conversations' }
    }
  ]
};

export default messagesRouter;


