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
      const user = JSON.parse(localStorage.getItem('user'))
      this.nombre = user.NOMBRE
      this.apellido = user.APELLIDO
      this.dni = user.DNI.toLocaleString().replace(/,/g, '.')
      this.vencimiento = user.VENCIMIENTO.split('T')[0]
      this.rol = user.ROL == 0 ? 'ADMINISTRADOR' : user.ROL == 1 ? 'ALUMNO' : 'PROFESOR'
  }
}

</script>

<style scoped>

.card-subtitle{
  padding-bottom:7.5px
}

</style>