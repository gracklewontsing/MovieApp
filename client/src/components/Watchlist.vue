<template>
  <div class="underNav">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Movie</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, i) in movielist" :key="i" @click="goToMovie($event)">
          <td :id="movie.imdbID">{{movie.Title}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import router from "../router";

export default {
  name: "Watchlist",
  data() {
    return {
      movielist: []
    };
  },
  methods: {
    fetchWatchlist() {
      this.extractUser();
      axios
        .get(`http://localhost:3000/watchlist/watchlistItems/${this.user_id}`)
        .then(res => {
          //console.log(res.data);
          for (let movieId in res.data) {
            this.fetchMovie(res.data[movieId]);
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
    fetchMovie(movieId) {
      return axios
        .get(`http://www.omdbapi.com/?i=${movieId}&apikey=31b52ae1`)
        .then(res => {
          this.movielist.push(res.data);
        });
    },
    goToMovie(event) {
      //console.log(event.target.id);
      let movieId = event.target.id;
      router.push({ name: "Movie", params: { movieId: movieId } });
    }
  },
  mounted() {
    this.fetchWatchlist();
  }
};
</script>

<style lang="css">
.underNav {
  margin-top: 60px;
}
</style>