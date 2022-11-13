<template>
   <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">ESTADO DE CUOTA</h6>
              <h6 class="card-subtitle mb-2 text-muted">VENCIMIENTO: {{fecha}} <span :class="{textvencido: estado == 'VENCIDA'}">({{estado}})</span></h6>
              <div class="wrap-input">
                <button class="login-btn" @click="payMembership()">PAGAR</button>
              </div>

            </div>
          </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
// import Swal from 'sweetalert2'

export default {
    name: 'ChangePassword',
    data(){
        return{
           fecha: new Date()
        }
    },
    created(){
      const user = JSON.parse(localStorage.getItem('user'))
      this.fecha = user.VENCIMIENTO.split('T')[0]
    },
    methods:{
      async payMembership(){
        axios.put(process.env.VUE_APP_API_URL + '/membership', null)
        .then(resp => {
            let user = JSON.parse(localStorage.getItem("user"));
            user.VENCIMIENTO = resp.data[0].VENCIMIENTO; 
            localStorage.setItem("user", JSON.stringify(user));
            this.fecha = resp.data[0].VENCIMIENTO
        })
        .catch(err=> console.log(err))
      }
    },
    computed:{
      estado: function (){
       return new Date(this.fecha) < new Date() ? 'VENCIDA' : 'EN ORDEN'
      },
    }
}

</script>

<style scoped>

.card{
  display:flex;
  flex-direction:row;
}

.card-body{
  display:flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 40%;
}

.wrap-input{
  display:flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 40%;

}
.wrap-text{
  display:flex;
  flex-direction: column;
  width: 100%;
}

.form-control{
  display:flex;
  width: 30%;
  text-align:center;
}

.login-btn{
    font-family: Ubuntu-Bold;
    font-size: 1.5rem;
    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: 15%;
    height: 2.5rem;
    background-color: #827FFE;
    border-radius: 10px;
    transition: all .4s;
    outline: none!important;
    border: none;
}

.login-btn:hover{
    background-color: #3c138f
}


.textvencido{color:red}

@media(max-width:1200px){
  .form-control{
    width:80%
  }
  .login-btn{
    width:80%
  }
}

</style>