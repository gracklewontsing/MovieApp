<template>
  <!-- eslint-disable -->
  <div>
    <nav class="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark">
      <div class="d-lg-flex d-block flex-row mx-lg-auto mx-0">
        <router-link to="/Home" class="navbar-brand" href="#">
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
            <router-link to="/Home" class="nav-item nav-link">Home</router-link>
            <router-link to="/Movies" class="nav-item nav-link"
              >Movie List</router-link
            >
            <router-link to="/Watchlist" class="nav-item nav-link"
              >Watchlist</router-link
            >
            <router-link to="/{user.username}" class="nav-item nav-link"
              >Profile</router-link
            >
            <router-link to="/Friends" class="nav-item nav-link"
              >Friends</router-link
            >
            <form class="form-inline my-2 my-lg-0">
             <input class="form-control mr-sm-2" type="search" placeholder="Movie" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search a Movie!</button> 
    </form>
          </div>          
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
//add button function
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "Nav",
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
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
