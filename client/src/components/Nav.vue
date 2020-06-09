<template>
  <!-- eslint-disable -->
  <div>
    <b-navbar toggleable="lg" class="navbar fixed-top navbar-dark bg-dark">      
      <div class="container justify-content-center">
        <router-link to="/" class="navbar-brand" href="#">
          <strong class="">MovieApp</strong>
        </router-link>
        <b-navbar-toggle
          class="navbar-toggler"
          type="button"
          target="navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </b-navbar-toggle>
        <b-collapse class="mr-auto" id="navbarNav" is-nav>
          <b-navbar-nav class="mx-auto">            
            <router-link v-if="auth=='loggedin'" to="/watchlist" class="nav-item nav-link"
              >Watchlist</router-link
            >
            <router-link v-if="auth=='loggedin'" to="/user" class="nav-item nav-link"
              >{{user.first_name}}'s Profile</router-link
            >
            <router-link v-if="auth=='loggedin'" to="/friends" class="nav-item nav-link"
              >Friends</router-link
            >
            <router-link v-if="auth==''" class="nav-link" to="/login">Login</router-link>
            <router-link v-if="auth==''" class="nav-link" to="/register">Register</router-link>
            <a  v-if="auth=='loggedin'" class="nav-link" href="" v-on:click="logout">Logout</a>             
            <vue-simple-suggest
            v-if="auth=='loggedin'"
            v-model="chosen" 
            display-attribute='Title'
            value-attribute="imdbID" 
            @select="redirect" 
            :destyled=true :styles="suggest" 
            :list="query" 
            class="my-lg-0" 
            placeholder="Search Movies..."
            :debounce="200"
            :filter-by-query="false"
           />
          </b-navbar-nav>          
        </b-collapse>    
      </div>  
    </b-navbar>
  </div>
</template>
<script>
//add button function

import axios from "axios";
import VueSimpleSuggest from 'vue-simple-suggest'
import EventBus from './EventBus'
import VueJwtDecode from 'vue-jwt-decode'
import router from '../router'

export default {
  name: "Nav",
  data () {
    return {
      auth: '',
      user: '',
      chosen: '',
      suggest:{
        vueSimpleSuggest: "position-relative",
          inputWrapper: "",
          defaultInput : "form-control",
          suggestions: "position-absolute list-group z-1000",
          suggestItem: "list-group-item"
      }
    }
  },
  components:{
    VueSimpleSuggest
  },
  methods: {
    
    logout() {
      localStorage.removeItem('usertoken');
    },    
    onSubmit(){
      // empty, just to avoid warnings
    },
    query(value){            
      return axios.get(`http://www.omdbapi.com/?s=${value}&apikey=31b52ae1`).then((res)=> res.data.Search);      
    },
    redirect(value){
      //console.log(value);
      router.push({ name: 'Movie', params: { movieId: value.imdbID } });
    }

  },
  mounted () {
    EventBus.$on('logged-in', status => { 
      this.auth = status;
      if (this.auth === "loggedin"){
      let token = localStorage.getItem("usertoken");
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;    
      }  
    }
    })
    
    
    let token = localStorage.getItem("usertoken");
    if (token) {
      EventBus.$emit('logged-in', 'loggedin'); 
    }  
    
  },
  watch:{
    
  },
  filters: {
    stringify(value) {
      return JSON.stringify(value, null, 2)
    }
  },
};
</script>

<style scoped lang="scss">
.navbar .navbar-nav {
  float: none;
  vertical-align: top;
}

.navbar .navbar-collapse {
  text-align: center;
}
</style>

