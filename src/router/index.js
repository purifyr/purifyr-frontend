import { createRouter, createWebHistory } from 'vue-router'
import ReportDetails from '@/components/ReportDetails.vue'
import ReportList from '@/components/ReportList.vue'

const routes = [
  {
    path: '/',
    name: 'ReportsList',
    component: ReportList,
  },
  {
    path: '/report/:id',
    name: 'ReportDetails',
    component: ReportDetails,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
