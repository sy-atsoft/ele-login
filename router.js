export default [
    {
        path: '/login',
        name: 'login',
        title: '系统登录',
        icon: 'el-icon-goods',
        width: '500px',
        menu:false,
        component: () => import('./login.vue')
    }
]