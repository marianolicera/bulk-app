<template>
   <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title" style="float-left">CAMBIAR CONTRASEÑA</h6>
              <div class="wrap-input">
                <input class="form-control" type="text" placeholder="Antigua Contraseña" maxlength="8" v-model="oldPassword">
                <input class="form-control" type="text" placeholder="Nueva Contraseña" maxlength="12" v-model="newPassword">
                <button class="login-btn" @click="changePass()">CAMBIAR</button>
              </div>

            </div>
          </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'ChangePassword',
    data(){
        return{
           oldPassword: '',
           newPassword: '',
        }
    },
    methods:{
      async changePass(){


        if(!this.oldPassword || !this.newPassword){
            return Swal.fire('Error', 'Datos incompletos','error')
        }

        await axios.put(process.env.VUE_APP_API_URL + '/changePassword', {oldPass: this.oldPassword, newPass: this.newPassword})
        .then(resp => {
            const status = resp.data.status
            const message = resp.data.message
            return Swal.fire(status.toUpperCase(),message,status)
        })
        .catch(err => console.log(err))

      }
    }
}

</script>

<style scoped>

.wrap-input{
  display:flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column
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


@media(max-width:1200px){
  .form-control{
    width:80%
  }
  .login-btn{
    width:80%
  }
}

</style>