<template>
  <div id="wrapper" class="container-fluid">
    <Membership v-if="rol == 'ALUMNO'"></Membership>
    <ChangePassword></ChangePassword>
  </div>
</template>

<script>
import ChangePassword from '../components/ChangePassword.vue'
import Membership from '../components/alumno/Membership.vue'


export default {
  name: 'ProfileView',
  components: {
    ChangePassword,
    Membership
  },
  computed:{
    rol: function () {
      const id = JSON.parse(localStorage.getItem('user')).ROL
      return id == 0 ? 'ADMINISTRADOR' : id == 1 ? 'ALUMNO' : 'PROFESOR'
    }
  }
}
</script>


<style scoped>
</style>