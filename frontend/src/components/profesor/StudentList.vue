<template>

  <!-- LISTA DE ALUMNOS -->
  <div class="col-md-12">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">ASIGNADOR DE RUTINAS: </h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="table-field">#</th>
              <th scope="col" class="table-field">DNI</th>
              <th scope="col" class="table-field">NOMBRE</th>
              <th scope="col" class="table-field">APELLIDO</th>
              <th scope="col" class="table-field">VENCIMIENTO</th>
              <th scope="col" class="table-field">AGREGAR RUTINA</th>
            </tr>
          </thead>
          <tbody>
            <!-- LISTA DE USUARIOS-->
            <SingleStudent v-bind:key="item" v-for="(item,index) in users" :index="index" :user="item" @add="entrarModoRutina"></SingleStudent>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <hr id="create-rutine-mode">

  <!-- ALUMNO A ASIGNAR RUTINA-->
  <div v-if="modoRutina" >
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body wrap-cerrar">
            <h3 class="card-title">ASIGNAR RUTINA A: {{alumno}}</h3>
            <span @click="cerrarModoRutina()" class="trash-icon"><img src="../../assets/cancel.svg" class="cancel-icon"> CERRAR</span>
          </div>
        </div>
      </div>
    </div>

  <!-- RUTINA DIARIA-->
    <div class="row justify-content-center">
      <ProfesorDayRutine v-bind:key="item" v-for="(item,index) in dias" :index="index" :dia="item" @agregarEjercicio="agregarARutina"></ProfesorDayRutine>
    </div>
  
  <!-- BOTON ENVIAR RUTINA-->
    <div class="row justify-content-center">
      <div class="wrap-input">
        <button class="login-btn" @click="enviarRutina" id="btn-subir">SUBIR RUTINA</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import SingleStudent from './SingleStudent.vue'
import ProfesorDayRutine from './ProfesorDayRutine.vue'
import Swal from 'sweetalert2'

export default {
    name: 'StudentList',
    data(){
      return{
        users: [],
        modoRutina: false,
        alumno: '',
        dias: ['LUNES','MARTES','MIERCOLES','JUEVES','VIERNES'],
        rutina: [],
        user: undefined
      }
    },
    components:{
      SingleStudent,
      ProfesorDayRutine
    },
    created(){
      this.getUsuarios()
    },
    methods: {
      async getUsuarios(){
        await axios.get(process.env.VUE_APP_API_URL + '/getAlumnos')
        .then(resp => {
          this.users = resp.data
        })
        .catch(err => console.log(err))
      },
      entrarModoRutina(user){
        this.modoRutina = true
        this.user = user
        this.alumno = user.NOMBRE + ' ' + user.APELLIDO + " (" + user.DNI + ")"
        window.scrollTo(0 , document.body.scrollHeight);
      },
      cerrarModoRutina(){
         Swal.fire({
                title: `Está seguro que desea cerrar el modo rutina?`,
                text: "Se perderá todo el progreso.",
                icon: "warning",
                showCloseButton: true,
                confirmButtonColor: "#FF0000",
                confirmButtonText: `CERRAR`,
                preConfirm: async () => {
                  this.modoRutina = false
                  document.body.scrollTop = document.documentElement.scrollTop = 0;
                },
            })
      },
      agregarARutina(ejercicio){
        this.rutina.push(ejercicio)
      },
      async enviarRutina(){
        if(this.rutina.length == 0){
          return Swal.fire('Error','Rutina incompleta','error')
        }
        await Swal.fire({
                title: `Está seguro que desea subir la rutina?`,
                text: "El proceso no se podrá revertir.",
                icon: "question",
                showCloseButton: true,
                confirmButtonColor: "#827FFE",
                confirmButtonText: `ENVIAR`,
                preConfirm: async () => {
                  await axios.post(process.env.VUE_APP_API_URL + '/createRutina/' + this.user.ID_USER, {rutina: JSON.stringify(this.rutina)})
                  .then(resp => {
                    return Swal.fire(resp.data.status, resp.data.message, resp.data.status.toLowerCase())
                  })
                  .catch(err => console.log(err))
                },
            })
      }
    },
    computed:{
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

.table-field{
  min-width: 120px
}

.wrap-cerrar{
  display:flex;
  flex-direction: row;
  align-items:center;
  justify-content:center;
}

.trash-icon{
  position: absolute;
  right: 0;
  margin-right: 100px;
}

.cancel-icon{
    height: 25px;
    margin-bottom: 3px
}

.wrap-input{
  display:flex;
  gap: 1rem;
  width: 50%;

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
    height: 4rem;
    background-color: #827FFE;
    border-radius: 10px;
    transition: all .4s;
    border: none;
    position:relative;
}

.login-btn:hover{
    background-color: #3c138f
}



@media(max-width:1200px){
  .form-control{
    width:80%
  }
}

</style>