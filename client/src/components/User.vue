<template>
    <div class="container my-5">
        <b-container class="my-2 col-lg-12">
            <h1>User's data</h1>
            <h4>{{user.first_name}}</h4>
            <h4>{{user.last_name}}</h4>
            <h4>{{user.email}}</h4>
            <h4></h4>
        </b-container>
    </div>
</template>

<script>
//import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
    data() {
        return {
            user: '',
        }
    }, 
    mounted()
    {       
      let token = localStorage.getItem("usertoken");
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;    
      }
    }  
}
</script>