<template>
  <div class="container">
    <div class="container">
      <div class="form-outline">
        <input type="number" id="form12" class="form-control"/>
        <label class="form-label" for="form12">Cantidad de usuarios por paginas</label>
      </div>
    </div>

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

    <div class="container">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" @click="this.prev()">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">{{ this.page }}</a></li>
          <li class="page-item"><a class="page-link" @click="this.next()">Next</a></li>
        </ul>
      </nav>

    </div>
  </div>
</template>

<script lang="ts">

import listUsers from '../components/Users/listUsers.vue'
import {defineComponent} from "vue";
import {UserDto} from "@/dtos/user.dto";
import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:3001/",
});
export default defineComponent( {
  name: "Users",
  data() {
    return {
      page: 0,
      limit: 6,
      totalPage: 1,
      filter: {},
      users: [] as UserDto[]
    }
  },
  methods: {
    next() {
      console.log(this.totalPage,'totalpage')
      if (this.page + 1 <= this.totalPage)
        this.page += 1
        this.getUsers()
    },
    prev() {
      if (this.page - 1 >= 0)
        this.page -= 1
        this.getUsers()
    },
    async getUsers(): Promise<void> {
      console.log(this.page)
      const response = await apiClient.post('user', {
        pageParams: {
          pageNum: this.page,
          pageLimit: this.limit
        }, filter: this.filter
      })
      if (response.status == 200) {
        console.log(response.data)
        this.users = response.data.items
        this.totalPage = response.data.totalPages
      }
    }
  }
})
</script>

<style scoped>

</style>