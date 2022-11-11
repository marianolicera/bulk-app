<template>
<div class="container-login">
    <div class="wrap-login">
    <div class="form-login">
        <span class="title-login" style="font-size: 2rem">LOGIN</span>
        <span class="title-login title-bulk">BULK APP</span>
        <div class="wrap-input">
            <input class="input" type="text" name="username" placeholder="Nombre de usuario" maxlength="8" minlength="8" v-model="username">
            <span class="error-message" v-if="usernameError" v-on:key-press="limpiarError()">{{usernameError}}</span>
        </div>
        <div class="wrap-input">
            <input class="input" type="password" name="pass" placeholder="Contraseña" v-model="password">
            <span class="error-message" v-if="passwordError">{{passwordError}}</span>
        </div>

        <div class="container-btn">
            <button class="login-btn" @click="login">
            Ingresar
            </button>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'LoginView',
  data(){
    return{
        username: "",
        password: "",
        usernameError: "",
        passwordError: "",
    }
  },
  methods:{
    async login(){
        this.limpiarError()
        if(this.minLength){
            this.usernameError="El Nombre de Usuario debe tener 8 digitos"
            return    
        }

        if(!this.username){
            this.usernameError="Campo Incompleto"
            return
        }

        if(!this.password){
            this.passwordError="Campo Incompleto"
            return
        }

        await axios.post(process.env.VUE_APP_API_URL + "/login", {username: this.username, password: this.password})
        .then(async resp => {
            let data = resp.data
            if(data.status && data.status === "error"){
                Swal.fire('Error',data.message,'error')
            }else{
                const user = JSON.stringify({ID_USER: data.ID_USER, NOMBRE: data.NOMBRE, APELLIDO: data.APELLIDO, DNI: data.DNI, ROL: data.ID_ROL})
                await localStorage.setItem('user', user)
                this.$router.push({path: '/'})
            }
        }).catch( err => {
            console.log(err)
        })
    },
    limpiarError(){
        this.usernameError=""
        this.passwordError=""
    },
  },
  computed: {
    minLength: function () {
        return this.username.length < 8
    }
  }
}
</script>

<style scoped>

@font-face {
  font-family: Ubuntu-Bold;
  src: url(../../public/fonts/Ubuntu-B.ttf);
}

.container-login{
    width: 100%;
    min-height: 100vh;
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.wrap-login{
    width:35rem;
    background: #fff;
    border-radius:0.3rem;
    position:relative;
    padding-bottom: 3rem;
    padding-top:1.5rem;
}

.form-login{
    width:100%;
    justify-content: space-between;
    display:flex;
    flex-direction: column;
    gap:0.7rem
}

.title-login{
    font-family: Ubuntu-Bold;
    font-size: 4rem;
    color: #403866;
    line-height: 1.2;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    display: block;
}

.title-bulk{
    padding-bottom: 1.7rem;
}

.wrap-input{
    width: 100%;
    background-color: #e6e6e6;
    border: 1px solid transparent;
    border-radius: 10px;
    margin-bottom: 0.6rem;
    display:flex;
    flex-direction:column;

}

.input{
    font-family: Ubuntu-Bold;
    color: #403866;
    line-height: 1.2;
    font-size: 1.5rem;
    text-align:center;
    display: block;
    width: 100%;
    background: 0 0;
    height: 62px;
    padding: 0 20px 0 38px;
    border: none;
    outline:none
}

.container-btn{
    margin-top:0.5rem
}

.login-btn{
    font-family: Ubuntu-Bold;
    font-size: 2rem;
    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 62px;
    background-color: #827FFE;
    border-radius: 10px;
    transition: all .4s;
    outline: none!important;
    border: none;
}

.login-btn:hover{
    background-color: #3c138f
}
.error-message{
    color: red;
    font-family: Ubuntu-Bold;
}

</style>