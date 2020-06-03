<template>
  <div>
    <Nav />
    <section>
      <div class="my-1 h-25 d-inline-block">                   
      </div>
    </section>
  </div>
</template>

<script>
//import VueJwtDecode from "vue-jwt-decode";
import Nav from "../components/Nav.vue";

export default {
  components: {
    Nav,
  },
  data() {
    return {
    };
  }//,
  /*methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    }
  },
  created() {
    this.getUserDetails();
  }*/
};
</script>
<style scoped></style>
