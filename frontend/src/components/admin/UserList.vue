<template>
  <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">USUARIOS</h5>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">DNI</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">APELLIDO</th>
                    <th scope="col">ROL</th>
                    <th scope="col">-</th>
                  </tr>
                </thead>
                <tbody>

                  <!-- LISTA DE USUARIOS-->
                  <SingleUser v-bind:key="item" v-for="(item,index) in users" :index="index" :user="item" @refresh="getUsuarios()"></SingleUser>

                  <!-- SECCION AGREGAR USUARIO-->
                  <td class="col input-col" style="padding-top: 2rem"><strong>AGREGAR USUARIO</strong></td>
                  <td class="col input-col">
                    <input class="form-control" type="text" name="username" placeholder="DNI" maxlength="8" minlength="8" v-model="dni">
                  </td>
                  <td class="col input-col">
                    <input class="form-control" type="text" name="username" placeholder="Nombre" maxlength="8" minlength="8" v-model="nombre">
                  </td>
                  <td class="col input-col">
                    <input class="form-control" type="text" name="username" placeholder="Apellido" maxlength="8" minlength="8" v-model="apellido">
                  </td>
                  <td class="col input-col">
                    <select class="form-control" name="servicios" v-model="rol" >
                        <option value="" selected disabled hidden>SELECCIONAR</option>
                        <option v-bind:key="item" v-for="item in roles">{{item}}</option>
                    </select>
                  </td>
                  <td class="col input-col add-user" @click="addUser()"><strong>AGREGAR</strong></td>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
</template>

<script>
import axios from 'axios'
import SingleUser from './SingleUser.vue'
import Swal from 'sweetalert2'

export default {
    name: 'UserInfo',
    data(){
      return{
        users: [],
        roles: ['ADMINISTRADOR', 'ALUMNO', 'PROFESOR'],
        dni: undefined,
        nombre: '',
        apellido: '',
        rol:''
      }
    },
    components:{
      SingleUser
    },
    created(){
      this.getUsuarios()
    },
    methods: {
      async getUsuarios(){
        await axios.get(process.env.VUE_APP_API_URL + "/getAllUsers")
        .then(resp => {
            if(resp.data)this.users = resp.data
        })
        .catch(err => console.log(err))
      },
      addUser(){
        if(!this.dni || !this.nombre || !this.apellido || !this.rol || this.rol == 'SELECCIONAR'){
          return Swal.fire('Datos Incompletos', 'No se puede agregar el usuario', 'error')
        }

        if(this.dni.length < 8){
          return Swal.fire('Datos Incompletos', 'El DNI debe contener 8 digitos', 'error')
        }

        axios.post(process.env.VUE_APP_API_URL + '/createUser', {dni:this.dni, nombre: this.nombre, apellido: this.apellido, rol: this.rol})
        .then(() => {Swal.fire('Exito!','Usuario Agregado', 'success').then(()=> this.getUsuarios())})
        .catch(() => console.log)
      }
    },
    computed:{
      index: function(item) {
        return this.rutina.indexOf(item)
      }
    },
}

</script>

<style scoped>

.form-control{
  width: 60%;
  text-align: center;
  display:inline;
}

.input-col{
  padding-top:1.5rem
}

.add-user{
  text-decoration: underline;
  padding-top: 2rem;
  cursor: pointer
}

.add-user:hover{
  color: #5e5e5e;
  transition: 0.1s
}

@media(max-width:1200px){
  .form-control{
    width:80%
  }
}

</style>