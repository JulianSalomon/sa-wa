<template>
  <form>
    <div>
      <label for="name">Nombre:</label>
      <input type="text" id="name" v-model="user.firstName" />
    </div>
    <div>
      <label for="lastname">Apellido:</label>
      <input type="text" id="lastname" v-model="user.lastName" />
    </div>
    <div>
      <label for="username">Nombre de usuario:</label>
      <input type="text" id="username" v-model="user.username" />
    </div>
    <div>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="user.password" />
    </div>
    <button type="button" @click="createUserRest(user)">
      Crear con REST
    </button>
    <button type="button" @click="createUserGraphQl(user)">
      Crear con GraphQL
    </button>
    <div>
      <p v-if="createdUser.message">{{ createdUserToString() }}</p>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import HttpService from "@/services/HttpService";
import { User, XHRequest } from "@/types";

@Component
export default class UserForm extends Vue {
  private user: User = this.defaultUser();
  private createdUser: { message: String; user: User } = {
    message: "",
    user: this.defaultUser()
  };

  createdUserToString() {
    const userToPrint = this.createdUser.user;
    return `${this.createdUser.message} 
    Nombre: ${userToPrint.firstName}
    Apellido: ${userToPrint.lastName}
    Nombre de usuario: ${userToPrint.username}
    Contraseña: ${userToPrint.password}
    `;
  }

  createUserRest(user: User) {
    const req: XHRequest = {
      method: "POST",
      body: JSON.stringify(user),
      callback: (xhr: XMLHttpRequest) => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
          this.user = this.defaultUser();
          this.createdUser = {
            message: "Usuario creado satisfactoriamente desde Microservicio: ",
            user: xhr.response
          };
          this.$emit("created-user");
        }
      }
    };
    HttpService.requestToMS(req);
  }

  createUserGraphQl(user: User) {
    const mutation = `mutation CreateUser($user: UserInput!) {
      createUser(user: $user) {
        id
        firstName
        lastName
        password
        username
      }
    }`;
    const variables = { user };
    const req: XHRequest = {
      method: "POST",
      body: JSON.stringify({
        query: mutation,
        variables
      }),
      callback: (xhr: XMLHttpRequest) => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          this.createdUser = {
            message: "Usuario creado satisfactoriamente desde API Gateway: ",
            user: xhr.response.data.createUser
          };
          this.user = this.defaultUser();
          this.$emit("created-user");
        }
      }
    };
    HttpService.requestToAPI(req);
  }

  private defaultUser(): User {
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: ""
    };
  }
}
</script>

<style lang="sass" scoped>
label
  width: 150px
  display: inline-block
  text-align: left

input
  width: 50%
  padding: 12px 20px
  margin: 5px 0px 5px 16px
  display: inline-block
  border: 1px solid lightgray
  border-radius: 4px
  box-sizing: border-box

button
  width: 30%
  background-color: forestgreen
  font-size: 16px
  color: white
  padding: 14px 20px
  margin: 8px 15px
  border: none
  cursor: pointer
  &:hover
    background-color: limegreen

form
  border-radius: 5px
  background-color: #f2f2f2
  padding: 10px
</style>
