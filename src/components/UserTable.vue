<template>
  <table class="table">
    <tr>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Usuario</th>
      <th>Contraseña</th>
    </tr>
    <tr v-for="user in users" :key="user.id">
      <td>{{ user.firstName }}</td>
      <td>{{ user.lastName }}</td>
      <td>{{ user.username }}</td>
      <td>{{ user.password }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "@/types";

@Component
export default class UserTable extends Vue {
  @Prop(Array) readonly users!: User[];
}
</script>

<style lang="sass" scoped>
.table
  border-collapse: collapse
  width: 100%
  td, th
    border: 1px solid lightgray
    padding: 5px
  th
    padding: 12px
    text-align: left
    background-color: forestgreen
    color: white
  tr
    &:nth-child(even)
      background-color: lightgray
  tr
    &:hover
      background-color: darkgray
</style>
