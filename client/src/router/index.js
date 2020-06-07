import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import Login from '../views/login';
import Register from '@/views/register';
import User from '@/components/User';
import Friendslist from '@/components/Friendslist';
import Watchlist from '@/components/Watchlist';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/friends',
      name: 'Friends',
      component: Friendslist
    },
    {
      path: '/watchlist',
      name: 'Watchlist',
      component: Watchlist
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})