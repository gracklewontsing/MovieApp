<template>
    <div class="container my-5">
        <b-container class="col-lg-12">
            
        </b-container>
    </div>
</template>

<script>
//import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
    methods: {    
        extractUser() {
        let token = localStorage.getItem("usertoken");
        if (token) {
            let decoded = VueJwtDecode.decode(token);
            this.user_id = decoded._id;
        }
        },
        mounted()
        {       
            this.extractUser();
        }
    }
}
</script>