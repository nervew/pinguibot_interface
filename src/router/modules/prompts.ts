const Layout = () => import('@/layout/index.vue');

const promptsRouter = {
  path: '/prompts',
  component: Layout,
  redirect: '/prompts/list',
  name: 'Prompts',
  meta: { title: 'Prompts', icon: 'form', roles: ['admin', 'editor'] },
  children: [
    {
      path: 'list',
      component: () => import('@/views/prompts/list.vue'),
      name: 'PromptList',
      meta: { title: 'List', icon: 'list' }
    },
    {
      path: 'create',
      component: () => import('@/views/prompts/create.vue'),
      name: 'PromptCreate',
      meta: { title: 'Create', roles: ['admin', 'editor'] }
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/prompts/edit.vue'),
      name: 'PromptEdit',
      meta: { hidden: true, title: 'Edit', activeMenu: '/prompts/list', roles: ['admin', 'editor'] }
    }
  ]
};

export default promptsRouter;


