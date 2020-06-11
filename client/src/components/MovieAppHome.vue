<template>
    <div class="container my-5">
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
                        <h2 class="my-2">What's up, you pleb.</h2>      
                        <h4 class="my-2">Haha, just kidding, we got a random movie for you: <br> {{movie.Title}}</h4>                   
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

function pad(number, length) {
  var str = '' + number;
  while(str.length < length) {
    str = '0' + str;
  }
  return str;
}

let random_movie= "tt" + pad(Math.floor((Math.random() * 2155529) + 1), 7); //warning: dangerous but also hilarious
export default {
    name:"MovieAppHome",
    data() {
    return {
        user_id: "",
        movie: {},
        value: '',                    
        };
    },
    methods: {
    fetchMovie() {
        console.log(random_movie);
      return axios
            .get(
            `http://www.omdbapi.com/?i=${random_movie}&apikey=31b52ae1`
            )
            .then(res => {
            this.movie = res.data;
            this.value = this.movie.imdbRating / 2;
            });
        },
    },
    addToWatchlist() {     
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
    },
    mounted()
    {
        this.fetchMovie();
        this.extractUser();
    }
}
</script>