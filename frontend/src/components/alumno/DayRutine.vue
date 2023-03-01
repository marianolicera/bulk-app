<template>
  <div class="col-md-12 col-xl-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{dia}}</h5>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">EJERCICIO</th>
                    <th scope="col">SERIES</th>
                    <th scope="col">REPETICIONES</th>
                  </tr>
                </thead>
                <tbody>
                  <SingleExercise v-bind:key="item" v-for="(item,index) in rutina" :ejercicio="item" :index="index"></SingleExercise>
                </tbody>
              </table>
            </div>
          </div>
        </div>
</template>

<script>
import SingleExercise from './SingleExercise.vue'

export default {
    name: 'UserInfo',
    components:{
      SingleExercise
    },
    props: {
      rutina: undefined,
    },
    computed:{
      dia: function () {
          return this.rutina ? (this.rutina[0].DIA == 1 ? 'LUNES' : this.rutina[0].DIA == 2 ? 'MARTES' : this.rutina[0].DIA == 3 ? 'MIERCOLES' : this.rutina[0].DIA == 4 ? 'JUEVES' : 'VIERNES') : ''
      },
      ejercicios: function () {
        return JSON.parse(JSON.stringify(this.rutina))
      },
      index: function(item) {
        return this.rutina.indexOf(item)
      }
    },
}

</script>

<style>
</style>