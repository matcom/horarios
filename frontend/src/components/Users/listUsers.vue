<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">

      <div class="col" v-for="user in this.users" v-bind:key="user.id">
        <div class="card h-100">
          <img src="public/imagen.png" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Username: {{ user.username }}</h5>
            <p class="card-text">Email: {{ user.email }} </p>
            <p class="card-text">Roles: {{ user.roles }} </p>
            <p class="card-text">CreateAt: {{ user.createdAt }} </p>
            <p class="card-text">UpdateAt: {{ user.updatedAt }} </p>
            <p class="card-text">Status: {{ user.status }} </p>
          </div>
          <div class="card-footer">
            <RouterLink class="w-100 btn btn-lg btn-primary"
                         :to="{ path: `/user/update/${user.id}`}">Update
            </RouterLink>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>


<style scoped lang="css">

</style>

<script lang="ts">

import {defineComponent} from "vue";
import axios from "axios";
import {UserDto} from '../../dtos/user.dto'
import {EnumStatus} from "@/enums/EnumStatus";

export default defineComponent({
  name: "listUsers",
  props: {
    page: Number
  },
  data() {
    return {
      routeUpdate: `/user/update/`,
      users: [{
        id: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: [0],
        status: EnumStatus.Pending,
        email: "alg@gamil.com",
        username: "aaa"
      }, {
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: [0],
        status: EnumStatus.Pending,
        email: "alg@gamil.com",
        username: "aaa"
      }, {
        id: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: [0],
        status: EnumStatus.Pending,
        email: "alg@gamil.com",
        username: "aaa"
      }, {
        id: "4",
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: [0],
        status: EnumStatus.Pending,
        email: "alg@gamil.com",
        username: "aaa"
      }, {
        id: "5",
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: [0],
        status: EnumStatus.Pending,
        email: "alg@gamil.com",
        username: "aaa"
      }, {
        id: "6",
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: [0],
        status: EnumStatus.Pending,
        email: "alg@gamil.com",
        username: "aaa"
      }] as UserDto[]
    }
  },
  methods: {
    async getUsers(): Promise<void> {
      const response = await axios.post('')
      if (response.status == 200) {
        this.users = response.data
      }
    }
  }
})
</script>

