<template>
  <tr>
    <th scope="row">{{index + 1}}</th>
    <td>{{ejercicio.DESCRIPCION}}</td>
    <td>{{ejercicio.SERIES}}</td>
    <td>{{ejercicio.REPETICIONES}}</td>
  </tr>
</template>

<script>

export default {
  name: 'SingleExercise',
  props:{
    ejercicio: undefined,
    index: Number
  },
}

</script>

<style>
</style>