<template>
   <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h6 class="card-subtitle">{{rol}}</h6>
              <h3 class="card-title">{{nombre}} {{apellido}} ({{dni}})</h3>
              <h5 class="card-text mb-2 text-muted" v-if="rol == 'ALUMNO'">Vencimiento cuota: {{vencimiento}}</h5>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UserInfo',
    data(){
        return{
            nombre: "",
            apellido: "",
            dni: 0,
            vencimiento: Date,
            rol: ""
        }
    },
    async created(){
        const id = JSON.parse(localStorage.getItem('user')).ID_USER
        await axios.get(process.env.VUE_APP_API_URL + "/getUserByID/" + id)
        .then(resp => {
            let data = resp.data
            this.nombre = data.NOMBRE
            this.apellido = data.APELLIDO
            this.dni = data.DNI.toLocaleString().replace(/,/g, '.')
            this.vencimiento = data.VENCIMIENTO.split('T')[0]
            this.rol = data.ID_ROL == 0 ? 'ADMINISTRADOR' : data.ID_ROL == 1 ? 'ALUMNO' : 'PROFESOR'
        })
        .catch(err => console.log(err))
        }
}

</script>

<style scoped>

.card-subtitle{
  padding-bottom:7.5px
}

</style>