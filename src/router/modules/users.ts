const Layout = () => import('@/layout/index.vue');

const usersRouter = {
  path: '/users',
  component: Layout,
  redirect: '/users/index',
  name: 'Users',
  meta: { title: 'Users', icon: 'people', roles: ['admin'] },
  children: [
    {
      path: 'index',
      component: () => import('@/views/users/index.vue'),
      name: 'UsersAdmin',
      meta: { title: 'Administration', icon: 'people', roles: ['admin'] }
    }
  ]
};

export default usersRouter;




