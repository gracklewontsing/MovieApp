<template>
  <div class="underNav">
    <h2>Description for: {{movie.Title}}</h2>
    <img :src="movie.Poster" alt="Movie poster" />
    <h4>Year: {{movie.Year}}</h4>
    <button
      v-if="Object.keys(movie).length !== 0"
      type="button"
      class="btn btn-primary"
      @click="addToWatchlist"
    >Add to watchlist</button>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "MovieDescription",
  data() {
    return {
      user_id: "",
      movie: {}
    };
  },
  methods: {
    fetchMovie() {
      return axios
        .get(
          `http://www.omdbapi.com/?i=${this.$route.params.movieId}&apikey=31b52ae1`
        )
        .then(res => {
          this.movie = res.data;
        });
    },
    addToWatchlist() {
      this.extractUser();
      axios
        .post(
          `http://localhost:3000/watchlist/addMovieToWatchlist/${this.user_id}`,
          {
            movieId: this.movie.imdbID
          }
        )
        .then(res => {
            //console.log(res);
            
          this.$toast.open(res.data);
        })
        .catch(err => {
            console.log(err);
            
          this.$toast.open(err.data);
        });
    },
    extractUser() {
      let token = localStorage.getItem("usertoken");
      if (token) {
        let decoded = VueJwtDecode.decode(token);
        this.user_id = decoded._id;
      }
    }
  },
  created() {
    this.fetchMovie();
  }
};
</script>

<style lang="css">
.underNav {
  margin-top: 60px;
}
</style>