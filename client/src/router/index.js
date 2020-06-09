import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";
import Login from "../views/login";
import Register from "@/views/register";
import User from "@/components/User";
import Friendslist from "@/components/Friendslist";
import Watchlist from "@/components/Watchlist";
import Movie from "../views/Movie";
import VueJwtDecode from "vue-jwt-decode";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/user",
      name: "User",
      component: User,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/friends",
      name: "Friends",
      component: Friendslist,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/watchlist",
      name: "Watchlist",
      component: Watchlist,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/movie/:movieId",
      name: "Movie",
      component: Movie,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        guest: true,
      },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        guest: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("usertoken") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      let token = localStorage.getItem("usertoken");
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        let user = decoded;

        if (user) next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("usertoken") == null) {
      next();
    }
  } else {
    next();
  }
});

export default router;
