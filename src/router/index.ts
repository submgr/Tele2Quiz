import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/onboarding'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'onboarding',
        component: () => import('@/views/AppOnboarding.vue')
      },
      {
        path: 'auth',
        redirect: '/tabs/auth/googleauth'
      },
      {
        path: 'auth/phoneauth',
        component: () => import('@/views/Auth/PhoneAuth.vue')
      },
      {
        path: 'chat',
        component: () => import('@/views/ChatScreen.vue')
      },
      {
        path: 'auth/googleauth',
        component: () => import('@/views/Auth/GoogleAuth.vue')
      },
      {
        path: 'home',
        component: () => import('@/views/HomeScreen.vue')
      },
      {
        path: 'reward',
        component: () => import('@/views/RewardScreen.vue')
      },
      {
        path: 'edu',
        component: () => import('@/views/EducationScreen.vue')
      },
      {
        path: 'quiz',
        component: () => import('@/views/QuizScreen.vue')
      },
      {
        path: 'pickusername',
        component: () => import('@/views/UsernamePickScreen.vue')
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
