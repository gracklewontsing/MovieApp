<template>
    <div class="underNav">        
        <vue-simple-suggest
            @input = "searchUserByEmail()"
            v-model="search.text"
            type="text"
            placeholder="Search a user by his email adress..."
            display-attribute='email'
            value-attribute="id" 
            @select="request" 
            :destyled=true :styles="suggest" 
            :list="query" 
            class="my-lg-0" 
            :debounce="200"
            :filter-by-query="false"
        />
        <span class="search-icon"> <i class="fas fa-search"></i></span>          
        <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">My Friends</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(users, i) in friendslist" :key="i">
                <td :id="user.id">{{user.first_name}} {{user.last_name}}</td>
                </tr>
            </tbody>
        </table>        
    </div>    
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import VueSimpleSuggest from 'vue-simple-suggest';

export default {
name: "Friendslist",
  data() {
    return {
      friendslist: [],
      suggest:{
        vueSimpleSuggest: "position-relative",
          inputWrapper: "",
          defaultInput : "form-control",
          suggestions: "position-absolute list-group z-1000",
          suggestItem: "list-group-item"
      }
    };
  },
  components:{
    VueSimpleSuggest
  },
  methods: {
    fetchFriendslist() {
      this.extractUser();
      axios
        .get(`http://localhost:3000/friendslist/FriendslistItems/${this.user_id}`)
        .then(res => {
          //console.log(res.data);
          for (let userId in res.data) {
            this.fetchUser(res.data[userId]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    extractUser() {
      let token = localStorage.getItem("usertoken");
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        this.user_id = decoded._id;
      }
    },
    fetchUser(userId) {
      return axios
        .get(`http://www.omdbapi.com/?i=${userId}&apikey=31b52ae1`)
        .then(res => {
          this.friendslist.push(res.data);
        });
    }
  },
  mounted() {
    this.fetchFriendslist();
  }
}
</script>