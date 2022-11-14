<template>
  <tr>
    <td>{{ejercicio.ejercicio}}</td>
    <td>{{ejercicio.series}}</td>
    <td>{{ejercicio.repeticiones}}</td>
    <td>-</td>
  </tr>

</template>

<script>

export default {
  name: 'SingleRutineExercise',
  props:{
    ejercicio: [],
  },
}

</script>

<style>
</style>