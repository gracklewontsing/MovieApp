<template>
  <div class="underNav">
    <vue-simple-suggest
      v-model="search"
      type="text"
      placeholder="Search a user by his email adress..."
      display-attribute="first_name"
      value-attribute="id"
      @select="request"
      :destyled="true"
      :styles="suggest"
      :list="searchUserByEmail"
      class="my-lg-0"
      :debounce="200"
      :filter-by-query="false"
    />
    <span class="search-icon">
      <i class="fas fa-search"></i>
    </span>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">My Friends</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in friendslist" :key="i">
          <td :id="user.id">{{user.first_name}} {{user.last_name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import VueSimpleSuggest from "vue-simple-suggest";

export default {
  name: "Friendslist",
  data() {
    return {
      search: "",
      friendslist: [],
      users: [],
      suggest: {
        vueSimpleSuggest: "position-relative",
        inputWrapper: "",
        defaultInput: "form-control",
        suggestions: "position-absolute list-group z-1000",
        suggestItem: "list-group-item"
      }
    };
  },
  components: {
    VueSimpleSuggest
  },
  methods: {
    fetchFriendslist() {
      this.extractUser();
      axios
        .get(`http://localhost:3000/users/FriendslistItems/${this.user_id}`)
        .then(res => {
          this.friendslist = res.data;
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
    searchUserByEmail() {
      return axios
        .get(`http://localhost:3000/users/email/${this.search}`)
        .then(res => {
          this.users = res.data;
          return res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    request() {

    }
  },
  mounted() {
    this.fetchFriendslist();
    console.log('friend',this.friendslist);
    
  }
};
</script>