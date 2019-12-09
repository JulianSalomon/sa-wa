<template>
  <div class="home">
    <HelloWorld msg="Laboratory 5 - Software Arquitecture" />
    <UserForm @created-user="getAllUsers" />
    <UserTable v-if="users.length" :users="users" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import UserForm from "@/components/UserForm.vue"; // @ is an alias to /src
import UserTable from "@/components/UserTable.vue";
import HttpService from "@/services/HttpService";
import { User, XHRequest } from "@/types";

@Component({
  components: {
    HelloWorld,
    UserForm,
    UserTable
  }
})
export default class Home extends Vue {
  private users: User[] = [];

  mounted() {
    this.getAllUsers();
  }

  getAllUsers() {
    const usersQuery = {
      query: `{
          allUsers {
            id
            firstName
            lastName
            password
            username
          } 
        }`
    };
    const req: XHRequest = {
      method: "POST",
      body: JSON.stringify(usersQuery),
      callback: (xhr: XMLHttpRequest) => {
        // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          this.users = xhr.response.data.allUsers;
        }
      }
    };
    HttpService.requestToAPI(req);
  }
}
</script>

<style lang="sass" scoped>
.home
  margin: 15px
  :not(:last-child)
    margin-bottom: 20px
</style>
