<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent="login">
                    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" v-model="email" class="form-control" name="email" placeholder="Enter Email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" v-model="password" class="form-control" name="password" placeholder="Enter Password">
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login () {
      axios.post('http://localhost:3000/users/login', {
        email: this.email,
        password: this.password
      }).then(res => {
        if (res.data.error) {
          console.log(res.data.error);
          return ;
        }
        localStorage.setItem('usertoken', res.data);
        this.email = '';
        this.password = '';
        this.emitMethod()
        router.push({ name: 'Home' });
      }).catch(err => {
        console.log(err);
      })
    },
    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin');
    }
  }
}
</script>