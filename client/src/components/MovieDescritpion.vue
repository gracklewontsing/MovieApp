<template>
  <div class="underNav">
    <b-container class="col-lg-12">
      <b-row no-gutters>
        <b-col md="6">
          <b-card class="mb-auto mx-2">  
            <b-card-img :src="movie.Poster" img-alt="Movie poster" start class="rounded-0"/>
            <h2 class="my-2">Description for: {{movie.Title}}</h2>      
            <h4 class="my-2">Year: {{movie.Year}}</h4>
            <b-form-rating
              v-model="value"
              readonly
              show-value
              show-value-max
              precision="2"
              class="my-2"
            ></b-form-rating>                    
            <b-button
              v-if="Object.keys(movie).length !== 0" 
              class="my-2"             
              variant="primary"
              @click="addToWatchlist"
            >Add to watchlist</b-button>   
          </b-card>
        </b-col> 
        <b-col md="6">
           <b-card class="mb-auto mx-2">            
            <b-form @submit="submitReview">
              <b-form-group
                id="input-group-1"
                label="Submit a Review:"
                label-for="input-1"
                description="Please do not spam or use profanity in your review."
              >
                <b-form-textarea
                  id="input-1"
                  v-model="review"
                  type="text"                  
                  placeholder="Write your review here."
                  rows = "16"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Select your review's rating:"
                label-for="input-1"
                description="Please do not spam and rate fairly."
              >
                <b-form-rating v-model="rating" color="indigo" class="mb-2"></b-form-rating>        
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>          
            </b-form>
          </b-card>
        </b-col>
      </b-row>
      <b-table striped hover :fields="fields" :items="reviews"></b-table>
    </b-container>        
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
      movie: {},
      value: '',
      review:'',
      rating: '',
      reviews: [],
      fields: [          
          { key: 'rating', sortable: true },
          { key: 'review', sortable: true },
        ],
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
          this.value = this.movie.imdbRating / 2;
        });
    },
    submitReview() {
      this.extractUser();
      console.log(this.user_id);
      axios
        .post(
          `http://localhost:3000/review/addReviewToMovie/${this.$route.params.movieId}`,
          {
            rating: this.rating,
            userId: this.user_id,
            review: this.review,            
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
    getReviews(){
      axios.get(`http://localhost:3000/review/reviewsByMovie/${this.$route.params.movieId}`)
      .then(results => {
          this.reviews = results.data;   
          console.log(this.reviews) 
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
  },
  mounted(){
    this.getReviews();
  }
};
</script>

<style lang="css">
.underNav {
  margin-top: 60px;
}
</style>