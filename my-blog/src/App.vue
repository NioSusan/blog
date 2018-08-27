<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" exact>Home</router-link> 
      <router-link to="/posts" exact>Blog</router-link> 
      <router-link to="/new-post" exact>Coming Feature</router-link>  
      <router-link v-show="!token" to="/signin" exact>Sign In</router-link> 
      <router-link v-show="!token" to="/signup" exact>Sign Up</router-link>  
      <router-link @click.native="logout" v-show="token" to="/logout" exact>logout</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      token : localStorage.getItem('token'),
    }
  },
  created(){
    this.token = localStorage.getItem('token')
  },
  methods:{
    logout(){
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      window.location.href='/'
    }
  },
  
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  font-size: 20px;
  color: #2c3e50;
  margin : auto 30px auto 30px
}

#nav a.router-link-exact-active {
  color: #42b983;
  
}
</style>
