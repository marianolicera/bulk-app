<template>
<div class="animate">
  <nav class="navbar header-top fixed-top navbar-expand-lg navbar-grey bg-light" v-if="!isLogin">
      <a class="navbar-brand">BULK APP</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText"
         aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav animate side-nav bg-light">
        <li class="nav-item space-btw"></li>
          <li class="nav-item space-btw">
            <router-link to="/"><a class="nav-link" title="Dashboard"><img src="./assets/home.svg" class="home-icon">Home<img src="./assets/home.svg" class="hide-home-icon shortmenu animate"></a></router-link>
          </li>
          <li class="nav-item space-btw">
            <router-link to="/about"><a class="nav-link" title="Dashboard"><img src="./assets/money.svg" class="home-icon">About<img src="./assets/money.svg" class="hide-home-icon shortmenu animate"></a></router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-md-auto d-md-flex">
          <li class="nav-item">
            <router-link to="/profile"><a class="nav-link"><img src="./assets/profile.svg" class="home-icon-nav">Profile</a></router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()" style="cursor: pointer"><img src="./assets/logout.svg" class="home-icon-nav">Log out</a>
          </li>
        </ul>
      </div>
    </nav>

  <router-view/>

</div>
</template>

<script>
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


export default {
  name: 'AppVue',
  data(){
    return{
      nombre: ""
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('user');
      this.$router.push({path: '/login'})
    },
  },
  computed: {
    isLogin: function () {
      return "" + this.$router.currentRoute.value.fullPath == '/login'
    },
  },
}

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
a { text-decoration: none; }


.home-icon{
  height:20px;
  padding-right:2rem;
  margin-bottom: 4px;
}

.hide-home-icon{
  height:20px;
  padding-right: 0.75rem;
  margin-bottom: 4px;
}

.home-icon-nav{
  height:20px;
  padding-right:0.5rem
}


@media(max-width:1000px){
 .home-icon{
  height:20px;
  left: 0;
  margin-bottom: 4px;
  left: 0px
}

.space-btw{
  display:flex;
  justify-content:space-around;
  text-align: center;
  
}
}
</style>
