<template>
  <!-- eslint-disable -->
  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div class="d-lg-flex d-block flex-row mx-lg-auto mx-0">
<<<<<<< HEAD
        <router-link to="/" class="navbar-brand" href="#">
=======
        <router-link to="/Home" class="navbar-brand" href="#">
>>>>>>> gracklewontsing
          <strong class="">MovieApp</strong>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse mr-auto" id="navbarNav">
          <div class="navbar-nav">
<<<<<<< HEAD
            <router-link v-if="auth=='loggedin'" to="/Watchlist" class="nav-item nav-link"
              >Watchlist</router-link
            >
            <router-link v-if="auth=='loggedin'" to="/{user.username}" class="nav-item nav-link"
              >Profile</router-link
            >
            <router-link v-if="auth=='loggedin'" to="/Friends" class="nav-item nav-link"
              >Friends</router-link
            >
            <router-link v-if="auth==''" class="nav-link" to="/login">Login</router-link>
            <router-link v-if="auth==''" class="nav-link" to="/register">Register</router-link>
            <a  v-if="auth=='loggedin'" class="nav-link" href="" v-on:click="logout">Logout</a>             
            <vue-simple-suggest
            v-if="auth=='loggedin'" 
=======
            <router-link to="/Home" class="nav-item nav-link">Home</router-link>
            <router-link to="/Watchlist" class="nav-item nav-link"
              >Watchlist</router-link
            >
            <router-link to="/{user.username}" class="nav-item nav-link"
              >Profile</router-link
            >
            <router-link to="/Friends" class="nav-item nav-link"
              >Friends</router-link
            >                        
            <vue-simple-suggest 
>>>>>>> gracklewontsing
            v-model="chosen" 
            display-attribute='Title'
            value-attribute="id" 
            @select="redirect" 
            :destyled=true :styles="suggest" 
            :list="query" 
            class="my-lg-0" 
            placeholder="Search Movies..."
            :debounce="200"
            :filter-by-query="false"
           />
          </div>          
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
//add button function
<<<<<<< HEAD
//import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import VueSimpleSuggest from 'vue-simple-suggest'
import EventBus from './EventBus'

EventBus.$on('logged-in', test => {
  console.log(test)
})
=======
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import VueSimpleSuggest from 'vue-simple-suggest'

>>>>>>> gracklewontsing


export default {
  name: "Nav",
  data () {
    return {
<<<<<<< HEAD
      auth: '',
      user: '',
=======
>>>>>>> gracklewontsing
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
    getUserDetails() {
<<<<<<< HEAD
    /*
=======
>>>>>>> gracklewontsing
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      */
    },
    logout() {
      localStorage.removeItem('usertoken');
    },    
    onSubmit(){
      // empty, just to avoid warnings
    },
<<<<<<< HEAD
=======
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },    
    onSubmit(){
      // empty, just to avoid warnings
    },
>>>>>>> gracklewontsing
    query(value){            
      return axios.get(`http://www.omdbapi.com/?s=${value}&apikey=31b52ae1`).then((res)=> {return res.data.Search});      
    },
    redirect(value){
      console.log(value);
      this.$router.push(`movie/${value.imdbID}`);
    }
  },
<<<<<<< HEAD
  mounted () {
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  },
=======
>>>>>>> gracklewontsing
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
<<<<<<< HEAD
}

.navbar .navbar-collapse {
  text-align: center;
}
</style>

=======
}

.navbar .navbar-collapse {
  text-align: center;
}
</style>
>>>>>>> gracklewontsing
