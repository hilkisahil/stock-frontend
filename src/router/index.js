import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import InternetBanking from "@/views/InternetBanking";
import ManageStock from "@/views/ManageStock";

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: { name: 'Home' } },
  {
    path: '/home', name: 'Home',
    component: Home, meta: { requiresAuth: false }
  },
  {
    path: '/internet-banking', name: 'Internet Banking',
    component: InternetBanking, meta: { requiresAuth: true }
  },
  {
    path: '/manage-stock', name: 'Manage Stock',
    component: ManageStock, meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

export default router
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    if(localStorage.user) next()
    else router.replace({path: '/home'}).then()
  }else {
    if(localStorage.user) router.replace({ path: '/internet-banking'}).then()
    else next()
  }
})