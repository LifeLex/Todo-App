import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import Team from '../views/Team.vue'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'

Vue.use(VueRouter)
const router = new VueRouter({
   routes : [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/team',
    name: 'team',
    component: Team,
    meta: {
      requiresAuth: true
    }
  }
]


})
router.beforeEach((to,from,next) =>{
  //Check requiresAuth is true
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //Check if not logged in
    if(!firebase.auth().currentUser){
      //Go to login
      next({
        path: '/login',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      //Proceed to the route
      next();
    }
  }else if (to.matched.some(record => record.meta.requiresGuest)) {
    if(firebase.auth().currentUser){
      //Go to login
      next({
        path: '/',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      //Proceed to the route
      next();
    }
  }else {
    next();
  }
})


export default router
