<template>
  <tr>
    <th>{{index + 1}}</th>
    <td>{{user.DNI}}</td>
    <td>{{user.NOMBRE}}</td>
    <td>{{user.APELLIDO}}</td>
    <td :class="{textvencido: vencido}">{{vencimiento}}</td>
    <td @click="addRutina(event)" style="cursor: pointer"><img src="../../assets/plus.svg" class="home-icon-nav"></td>
  </tr>
</template>

<script>

export default {
  name: 'SingleStudent',
  props:{
    user: undefined,
    index: Number,
  },
  emits: ["add"],
  methods: {
    addRutina(){
      this.$emit("add", this.user)
    }
  },
  computed: {
    vencido: function (){
      return new Date(this.user.VENCIMIENTO) < new Date()
    },
    vencimiento: function (){
      return this.user.VENCIMIENTO.split('T')[0]
    }
  }
}

</script>

<style scoped>
.home-icon-nav{
 transition: 0.2s;
}


.home-icon-nav:hover{
 transform: scale(1.3)
}
</style>