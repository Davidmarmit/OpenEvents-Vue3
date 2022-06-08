import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventView from '../views/EventView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from "@/views/RegisterView";
import ProfileView from "@/views/ProfileView";
import FriendsView from "@/views/FriendsView";
import UserView from "@/views/UserView";
import UsersView from "@/views/UsersView";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/friends',
    name: 'friends',
    component: FriendsView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/userviewer',
    name: 'userviewer',
    component: UserView
  },
  {
    path: '/eventviewer',
    name: 'eventviewer',
    component: EventView
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
