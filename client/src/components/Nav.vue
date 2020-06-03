<template>
<!-- eslint-disable -->
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link to="/Home" class="navbar-brand" href="#">
          <strong class="is-size-4">Wolf&uumlhl</strong>
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
        <div
          class="collapse navbar-collapse"
          id="navbarNav"
        >        
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link to="/Home" class=" btn btn-light mx-1 navbar-item">Home</router-link>
              <router-link to="/Fore" class="btn btn-light mx-1 navbar-item">Forecast</router-link>
            </li>
          </ul>
        </div>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >        
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="btn nav-link" @click="logUserOut">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "Nav",
  methods:{
  getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    }
  }
}
</script>

<style scoped lang="scss">
nav {
  margin-top: 25px;
  margin-bottom: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #d88d00;
    }
  }
}
</style>