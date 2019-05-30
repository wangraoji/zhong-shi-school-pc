import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout.vue'),
      children: [
        // 内容编辑 + 列表 + 推送
        {
          path: 'contentActive',
          name: 'contentActive',
          component: () => import('@/views/content/contentActive/index.vue'),
        },
        {
          path: 'contentList',
          name: 'contentList',
          component: () => import('@/views/content/contentList/index.vue'),
        },
        {
          path: 'contentPush',
          name: 'contentPush',
          component: () => import('@/views/content/contentPush/index.vue'),
        },
        // 课程编辑 + 列表
        {
          path: 'courseActive',
          name: 'courseActive',
          component: () => import('@/views/course/courseActive/index.vue'),
        },
        {
          path: 'courseList',
          name: 'courseList',
          component: () => import('@/views/course/courseList/index.vue'),
        },
        // 报名列表
        {
          path: 'enterNameList',
          name: 'enterNameList',
          component: () => import('@/views/enterName/enterNameList/index.vue'),
        },
        // 读书会编辑 + 列表
        {
          path: 'bookClubActive',
          name: 'bookClubActive',
          component: () => import('@/views/bookClub/bookClubActive/index.vue'),
        },
        {
          path: 'bookClubList',
          name: 'bookClubList',
          component: () => import('@/views/bookClub/bookClubList/index.vue'),
        },
        // 基础设置
        {
          path: 'baseSetting',
          name: 'baseSetting',
          component: () => import('@/views/baseSetting/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    // }
  ]
})
