<template>
  <tr>
    <th scope="row">{{index + 1}}</th>
    <td>{{user.DNI}}</td>
    <td>{{user.NOMBRE}}</td>
    <td>{{user.APELLIDO}}</td>
    <td>{{user.ID_ROL == 0 ? 'ADMINISTRADOR' : user.ID_ROL == 1 ? "ALUMNO" : "PROFESOR"}}</td>
    <td :class="{textvencido: vencido}">{{vencimiento}}</td>
    <td @click="deleteUser(event)" style="cursor: pointer"><i class="fa fa-trash" aria-hidden="true"></i></td>
  </tr>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'SingleUser',
  props:{
    user: undefined,
    index: Number
  },
  emits: ["refresh"],
  methods: {
    deleteUser(){
      Swal.fire({
                title: `Está seguro que desea eliminar al usuario: ${this.user.NOMBRE} ${this.user.APELLIDO}`,
                text: "Esta acción no podrá deshacerse",
                icon: "warning",
                showCloseButton: true,
                confirmButtonColor: "#FF0000",
                confirmButtonText: `ELIMINAR`,
                preConfirm: async () => {
                    Swal.showLoading()
                    axios.delete(process.env.VUE_APP_API_URL + "/deleteUser/" + this.user.ID_USER)
                    .then(() => {
                      Swal.fire('Exito!','Usuario Eliminado', 'success').then(()=> this.$emit("refresh"))
                    })
                    .catch(() => console.log)
                },
            })
    }
  },
  computed:{
    vencido: function (){
      return new Date(this.user.VENCIMIENTO) < new Date()
    },
    vencimiento: function (){
      return this.user.VENCIMIENTO.split('T')[0]
    }
  }
}

</script>

<style>
.textvencido{
  color:red
}
</style>