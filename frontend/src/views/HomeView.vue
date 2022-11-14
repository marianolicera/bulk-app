<template>
  <div id="wrapper" class="container-fluid">
    <UserInfo></UserInfo>
    <div v-if="rol == 'ALUMNO' && rutinas.length > 0">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Profesor Asignado: {{profesor}}</h3>
              <h4 class="card-subtitle mb-2 text-muted">Duracion: {{duracion}} Semanas</h4>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-center" >
          <DayRutine v-bind:key="item" v-for="item in rutinas" :rutina="item"></DayRutine>
        </div>
      </div>


      <div v-if="rol == 'ADMINISTRADOR'">
        <UserList></UserList>
      </div>

      <div v-if="rol =='PROFESOR'">
        <StudentList></StudentList>
      </div>
  </div>
</template>

<script>
import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import UserInfo from '../components/UserInfo.vue'
import DayRutine from '../components/alumno/DayRutine.vue'
import UserList from '../components/admin/UserList.vue'
import StudentList from '../components/profesor/StudentList.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    UserInfo,
    DayRutine,
    UserList,
    StudentList
  },
  data(){
    return{
      rutinas: [],
      profesor: '',
      duracion: 0 
    };
  },
  async created(){
    if(this.rol == "ALUMNO"){ //TODO: CREAR UN COMPONENTE PARA ESTO
      await axios.get(process.env.VUE_APP_API_URL + "/getRutinas")
      .then(resp => {
        if(resp.data[0].length > 0){
          let data = resp.data[0]
          this.rutinas = resp.data
          this.profesor = data[0].PROFESOR_NOMBRE + " " + data[0].PROFESOR_APELLIDO
          this.duracion = data[0].DURACION
        }
      })
      .catch(err => console.log(err))
    }
  },
  computed: {
    rol: function () {
      const id = JSON.parse(localStorage.getItem('user')).ROL
      return id == 0 ? 'ADMINISTRADOR' : id == 1 ? 'ALUMNO' : 'PROFESOR'
    }
  }
}
</script>

<style>
.container-fluid{
  min-height:1080px;
  background-color: #e0e0de;
  background-size: 100% auto;
  background-position: center top;
  background-attachment: fixed;
}
</style>