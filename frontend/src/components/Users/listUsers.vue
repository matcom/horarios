<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">

      <div class="col" v-for="user in this.paginateUsers" v-bind:key="user.id">
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

const apiClient = axios.create({
  baseURL: "http://localhost:3001/",
});
export default defineComponent({
  name: "listUsers",
  props: {
    page: Number,
    limit: Number,
    filter: {}
  },
  data() {
    return {
      users: [] as UserDto[]
    }
  },
  computed: {
    paginateUsers() {
      this.getUsers()
      return this.users
    }
  },
  methods: {
    async getUsers(): Promise<void> {
      console.log(this.page)
      const response = await apiClient.post('user', {
        pageParams: {
          pageNum: this.page,
          pageLimit: this.limit
        }, filter: this.filter
      })
      if (response.status == 200) {
        this.users = response.data.items
        this.$emit('totalPage', response.data.totalPages)
      }
    }
  }
})
</script>

